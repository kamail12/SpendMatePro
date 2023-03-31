import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

//try use collcet

export default function TransactionList({ transactions, balance }) {
	const { deleteDocument } = useFirestore("transactions");
	const color = transaction => {
		return transaction.type === "income" ? styles.income : styles.expense;
	};
	// const negativeBalance = !balance ? 'alert' : 'istnieje';

	const isNegative = balance < 0 && styles.alert;
	// const isNeg = balance < 0 ? undefined : styles.alert
	const balanceClasses = [styles.saldo, isNegative].join(" ");

	return (
		<>
			<p className={balanceClasses}>Actuall Saldo = ${balance}</p>

			<ul className={styles.transactions}>
				{transactions.map(transaction => (
					<li key={transaction.id} className={color(transaction)}>
						<p className={styles.name}>{transaction.name}</p>
						<p className={styles.amount}>${transaction.amount}</p>
						<button onClick={() => deleteDocument(transaction.id)}>
							x
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
