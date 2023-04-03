import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import GoalForm from "./GoalForm";

// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

//try use
export default function Home() {
	const { user } = useAuthContext();
	const { documents, error } = useCollection(
		"transactions",
		["uid", "==", user.uid],
		["createdAt", "desc"]
	);

	const income = (documents || [])
		.filter(document => document.type === "income")
		.map(document => parseInt(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	const expense = (documents || [])
		.filter(document => document.type === "expense" || !document.type)
		.map(document => parseInt(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error}</p>}
				{documents && (
					<TransactionList
						balance={income - expense}
						transactions={documents}
					/>
				)}
			</div>

			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} balance={income - expense} />
				<GoalForm />
			</div>
		</div>
	);
}
