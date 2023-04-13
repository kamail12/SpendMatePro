import { useTransactionTypeIcon } from '../../../hooks/useTransactionTypeIcon';
import { useFormattedDate } from '../../../hooks/useFormattedDate';
import { TRANSACTION_TYPE } from '../../../hooks/useTransactions';

import styles from './Transactions.module.css';

export const Transactions = ({ limit = 10, loading, error, transactions = [] }) => {
    return <div className={styles.container}>
        <h2 className={`${styles.list}`}>
            <span className={'underline'}>Last Transactions</span>
            <span className={`${styles.more} underline-animation`}>Show more</span>
        </h2>

        <div className={styles.items}>
            { error && <p>{ error }</p> }
            { loading && <TransactionItem.Ghost count={limit} /> }
            { !loading && transactions.slice(0, limit).map(({ amount, name, type, createdAt }, index) => {
                return <TransactionItem key={index} title={name} amount={parseFloat(amount)} date={createdAt} type={type} />;
            })}
        </div>
    </div>;
}

const TransactionItem = ({ title, date, amount, type = TRANSACTION_TYPE.EXPENSE }) => {
    const formattedDate = useFormattedDate(date);
    const icon = useTransactionTypeIcon(type);

    return <div className={`${styles.item} underline-animation`}>
        <div className={styles.heading}>
            { icon }
            <section>
                <h2>{ title }</h2>
                <span>{ formattedDate }</span>
            </section>
        </div>

        <div className={styles.details}>
            <span className={styles.currency}>$</span>
            { amount }
        </div>
    </div>;
}

TransactionItem.Ghost = ({ count = 5 }) => {
    const repeats = Array.from(Array(count).keys());
    return repeats.map((key) => <TransactionItem key={key} type={null} />);
}