import { useTransactionTypeIcon } from "../hooks/useTransactionTypeIcon";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { TRANSACTION_TYPE } from "../hooks/useTransactions";

import styles from "./Transactions.module.css";

export const Transactions = ({
	title,
	limit = 10,
	loading,
	error,
	transactions = [],
	onShowMoreClick,
	onTransactionDelete,
}) => {
	return (
		<div className={styles.container}>
			<h2 className={`${styles.list}`}>
				<span className={"underline"}>{title}</span>
				{onShowMoreClick && (
					<span
						className={`${styles.more} underline-animation`}
						onClick={onShowMoreClick}
						onTransactionDelete={onTransactionDelete}
					>
						Pokaż więcej!
					</span>
				)}
			</h2>

			<div className={styles.items}>
				{error && <p>{error}</p>}
				{loading && <TransactionItem.Ghost count={limit} />}
				{!loading &&
					transactions
						.slice(0, limit)
						.map(({ amount, name, type, createdAt, id }, index) => {
							return (
								<TransactionItem
									key={index}
									title={name}
									amount={parseFloat(amount).toLocaleString(
										"pl-PL"
									)}
									date={createdAt}
									type={type}
									id={id}
									onTransactionDelete={onTransactionDelete}
								/>
							);
						})}
				{transactions.length === 0 && <TransactionItem.Empty />}
			</div>
		</div>
	);
};

const TransactionItem = ({
	title,
	date,
	amount,
	type = TRANSACTION_TYPE.EXPENSE,
	id,
	onTransactionDelete,
}) => {
	const formattedDate = useFormattedDate(date);
	const icon = useTransactionTypeIcon(type);

	const isDeletable = type !== TRANSACTION_TYPE.TRANSFER;

	return (
		<div className={`${styles.item} underline-animation`}>
			<div className={styles.heading}>
				{icon}
				<section>
					<h2>{title}</h2>
					<span>{formattedDate}</span>
				</section>
			</div>

			<div className={styles.details}>
				{amount}
				{amount && <span className={styles.currency}>Zł</span>}
				{isDeletable && (
					<button onClick={() => onTransactionDelete(id)}>x</button>
				)}
			</div>
		</div>
	);
};

TransactionItem.Ghost = ({ count = 5 }) => {
	const repeats = Array.from(Array(count).keys());
	return repeats.map(key => <TransactionItem key={key} type={null} />);
};

TransactionItem.Empty = () => {
	return <TransactionItem type={null} />;
};
