import { TRANSACTION_TYPE } from '../../../hooks/useTransactions';

import styles from './Transactions.module.css';

export const Transactions = ({ transactions = [] }) => {
	// const [filter, setFilter] = useState();
    // const [filteredItems, setFilteredItems] = useState(transactions);

    return <div className={styles.container}>
        <h2 className={`${styles.list}`}><span className={'underline'}>Last Transactions</span> <span className={`${styles.more} underline-animation`}>Show more</span></h2>
        <div className={styles.items}>
            <TransactionItem title={'Example Transaction'} amount={100} date={Date.now()} type={TRANSACTION_TYPE.EXPENSE} />
            <TransactionItem title={'Example Transaction'} amount={100} date={Date.now()} type={TRANSACTION_TYPE.INCOME} />
            <TransactionItem title={'Example Transaction'} amount={100} date={Date.now()} type={TRANSACTION_TYPE.EXPENSE} />
            <TransactionItem title={'Example Transaction'} amount={100} date={Date.now()} type={TRANSACTION_TYPE.GOAL} />
            <TransactionItem title={'Example Transaction'} amount={100} date={Date.now()} />
        </div>
    </div>;
}

const useTransactionTypeIcon = (type = TRANSACTION_TYPE.EXPENSE) => {
    const style = (color) => ({ fontSize: 'var(--font-size-3x)', color: `var(--${color})` });

    switch(type) {
        case TRANSACTION_TYPE.INCOME:
            return <span style={style('success-color')}>→</span>;
        case TRANSACTION_TYPE.GOAL:
            return <span style={style('primary-color')}>→</span>;
        case TRANSACTION_TYPE.TRANSFER:
            return <span style={style('primary-color')}>→</span>;
        default:
            return <span style={style('accent-color')}>←</span>;
    }
}

const TransactionItem = ({ title, date, amount, type = TRANSACTION_TYPE.EXPENSE }) => {
    const icon = useTransactionTypeIcon(type);
    const formattedDate = (new Date(date)).toLocaleDateString('pl-PL', { hour: '2-digit', minute: '2-digit' });

    return <div className={`${styles.item} underline-animation`}>
        <div className={styles.heading}>
            { icon }
            <div>
                <h2>{ title }</h2>
                <span>{ formattedDate }</span>
            </div>
        </div>

        <div className={styles.details}><span className={styles.currency}>$</span>{ amount }</div>
    </div>;
}