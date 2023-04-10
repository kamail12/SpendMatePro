import styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";
import Goal from "../../components/Goal";

//try use collcet

export default function TransactionList({
	transactions,
	balance,
	goal,
	currentGoal,
}) {
	const { deleteDocument } = useFirestore("transactions");
	const color = transaction => {
		return transaction.type === "income" ? styles.income : styles.expense;
	};

	const isNegative = balance < 0 && styles.alert;
	const isDeletable = transaction => transaction.type !== "transfer";
	const balanceClasses = [styles.saldo, isNegative].join(" ");

	return (
		<>
			<p className={balanceClasses}>Actuall Saldo = ${balance}</p>

			{goal && <Goal goal={goal} currentGoal={currentGoal} />}

			<ul className={styles.transactions}>
				{transactions.map(transaction => (
					<li key={transaction.id} className={color(transaction)}>
						<p className={styles.name}>{transaction.name}</p>
						<p className={styles.amount}>${transaction.amount}</p>
						{isDeletable(transaction) && (
							<button
								onClick={() => deleteDocument(transaction.id)}
							>
								x
							</button>
						)}
					</li>
				))}
			</ul>
		</>
	);
}
