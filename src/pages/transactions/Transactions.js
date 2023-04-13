import { useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useTransactions } from "../../hooks/useTransactions";

import Navbar from "../../components/Navbar";
import { Item } from "../../components/Item";
import { Transactions as TransactionsList } from "../../components/Transactions";

import styles from "./Transactions.module.css";

const Transactions = () => {
    const { user } = useAuthContext();

    const { isLoading, error, transactions } = useTransactions(user.uid);
    const [filtered, setFiltered] = useState();

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setFiltered(transactions.filter((t) => t.name.toLowerCase().includes(value)));
    }

    return <>
        <Navbar />
        <div className={styles.container}>
            <main>
                <TransactionsList
                    title="Transactions"
                    limit={transactions.length || 10}
                    loading={isLoading}
                    error={error}
                    transactions={filtered ?? transactions}
                />
            </main>
            <aside>
                <Item title={'Search'}>
                    <input className={styles.input} type="text" placeholder="Type something..." onChange={handleSearch} />
                </Item>

				<Item title={'Filter'}>
                    <span>Some filter functionality...</span>
                </Item>
            </aside>
        </div>
    </>;
}

export default Transactions;