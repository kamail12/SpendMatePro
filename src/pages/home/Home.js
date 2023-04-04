import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import GoalForm from "./GoalForm";
import TransactionGoalsForm from "../../components/TransactionGoalsForm";

//try use
export default function Home() {
	const { user } = useAuthContext();
	const { documents, error } = useCollection(
		"transactions",
		["uid", "==", user.uid],
		["createdAt", "desc"]
	);

	// // Goals
	const { documents: goalsDocuments } = useCollection(
		"goals",
		["uid", "==", user.uid],
		["createdAt", "desc"]
	);

	const income = documents
		.filter(document => document.type === "income")
		.map(document => parseInt(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	const expense = documents
		.filter(document => document.type === "expense" || !document.type)
		.map(document => parseInt(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	// filter goalsDocuments for active set to true
	const goals = goalsDocuments.filter(goalsDocument => goalsDocument.active);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error}</p>}
				{documents && (
					<TransactionList
						balance={income - expense}
						transactions={documents}
						goals={goals}
					/>
				)}
			</div>

			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} balance={income - expense} />
				<TransactionGoalsForm uid={user.uid} goals={goals} />
			</div>
		</div>
	);
}


