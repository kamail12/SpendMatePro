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

	const handleSearch = e => {
		const value = e.target.value.toLowerCase();
		setFiltered(
			transactions.filter(t => t.name.toLowerCase().includes(value))
		);
	};

	//Uzycie hooka i stworzenie funkcji usuwającej na stronie Transactons
	const { remove: removeTransaction } = useTransactions(user.uid);

	const onTransactionDeleteFunction = id => {
		removeTransaction(id);
	};

	return (
		<>
			<Navbar />
			<div className={styles.container}>
				<main>
					<TransactionsList
						title="Transakcje"
						limit={transactions.length || 10}
						loading={isLoading}
						error={error}
						transactions={filtered ?? transactions}
						onTransactionDelete={onTransactionDeleteFunction}
					/>
				</main>
				<aside>
					<Item title={"Szukaj"}>
						<input
							className={styles.input}
							type="text"
							placeholder="Wpisz czego szukasz..."
							onChange={handleSearch}
						/>
					</Item>
				</aside>
			</div>
		</>
	);
};

export default Transactions;
