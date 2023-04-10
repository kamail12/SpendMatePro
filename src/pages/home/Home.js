import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

import TransactionGoalsForm from "../../components/TransactionGoalsForm";

//try use
export default function Home() {
	const { addDocument: addTransaction, deleteDocument: deleteTransaction } =
		useFirestore("transactions");
	const { updateDocument: updateGoal } = useFirestore("goals");

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
		.map(document => parseFloat(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	const expense = documents
		.filter(
			document =>
				document.type === "expense" || document.type === "transfer"
		)
		.map(document => parseFloat(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	const currentGoal = documents
		.filter(document => document.type === "goal")
		.map(document => parseFloat(document.amount))
		.reduce((prev, curr) => prev + curr, 0);

	const transfers = documents.filter(document => document.type === "goal");

	// filter goalsDocuments for active set to true
	const goals = goalsDocuments.filter(goalsDocument => goalsDocument.active);
	const balance = income - expense - currentGoal;

	//goal trans
	const handleGoalTrasfer = async money => {
		// 1. sprawdzenie czy money <= balance
		if (goals.length === 0) return;
		if (balance < money) return;

		const transaction = {
			uid: user.uid,
			name: goals[0].title,
			amount: money,
			type: "goal",
		};

		// 2. dodajesz do transactions dokument o typie 'goal' (addDocument o typie 'goal')
		const id = await addTransaction(transaction);
		transfers.push({ id, ...transaction });

		// 3. jesli goal amount (goals[0].amount) zsumowany z obecnym money jest wyzszy od goal amount
		//to wywolujesz metode await closeGoal()
		if (currentGoal + money >= goals[0].amount) {
			await closeGoal();
		}
	};

	const closeGoal = async () => {
		// Update documentu obecnego goala (goals[0]) i zmiana statusu active na false
		// W momencie closeGoal przenosimy wszystkie transakcje z kolekcji transactions o typie 'goal' do kolekcji archives

		// transfers.forEach(transaction => deleteTransaction(transaction.id));
		const deduction = transfers
			.map(({ amount }) => amount)
			.reduce((prev, curr) => prev + curr, 0);

		await Promise.all(
			...transfers.map(transaction => deleteTransaction(transaction.id)),
			updateGoal(goals[0].id, {
				active: false,
				transactions: transfers,
			}),
			addTransaction({
				uid: user.uid,
				name: goals[0].title,
				amount: deduction,
				type: "transfer",
			})
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error}</p>}
				{documents && (
					<TransactionList
						balance={balance}
						transactions={documents}
						goal={goals[0]}
						currentGoal={currentGoal}
					/>
				)}
			</div>

			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} balance={balance} />
				<TransactionGoalsForm
					uid={user.uid}
					goal={goals[0]}
					onTransfer={handleGoalTrasfer}
				/>
			</div>
		</div>
	);
}
