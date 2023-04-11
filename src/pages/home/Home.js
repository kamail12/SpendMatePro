import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useTransactions } from "../../hooks/useTransactions";

// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

import TransactionGoalsForm from "../../components/TransactionGoalsForm";
import { useGoal } from "../../hooks/useGoal";

export default function Home() {
	const { user } = useAuthContext();
	const { updateDocument: updateGoal } = useFirestore("goals");

	// Retrieve calculated transactions
	const { active: activeGoal } = useGoal(user.uid);
	const { transactions, incomes, expenses, transfers, goals, sum, error, create: createTransaction, remove: removeTransaction } = useTransactions(user.uid);

	// Calculated sum of amounts
	const income = sum(incomes, item => parseFloat(item.amount));
	const expense = sum(expenses, item => parseFloat(item.amount));
	const transfer = sum(transfers, item => parseFloat(item.amount));
	const goal = sum(goals, item => parseFloat(item.amount));

	// Final account balance
	const balance = income - expense - transfer - goal;

	//goal trans
	const handleGoalTrasfer = async money => {
		// 1. sprawdzenie czy money <= balance
		if ((balance < money) || !activeGoal) return;

		const transaction = {
			uid: user.uid,
			name: activeGoal.title,
			amount: money,
			type: "goal",
		};

		// 2. dodajesz do transactions dokument o typie 'goal' (addDocument o typie 'goal')
		const id = await createTransaction(transaction);
		goals.push({ id, ...transaction });

		// 3. jesli goal amount (goals[0].amount) zsumowany z obecnym money jest wyzszy od goal amount
		//to wywolujesz metode await closeGoal()
		if (goal + money >= activeGoal.amount) await closeGoal();
	};

	const closeGoal = async () => {
		// Update documentu obecnego goala (goals[0]) i zmiana statusu active na false

		const transaction = {
			uid: user.uid,
			name: `Goal Completed: ${activeGoal.title}`,
			amount: sum(goals, (item) => parseFloat(item.amount)),
			type: "transfer",
		};

		await Promise.all(
			goals.map(transaction => removeTransaction(transaction.id)),
			updateGoal(activeGoal.id, { active: false, transactions: goals }),
			createTransaction(transaction)
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error}</p>}
				{transactions && (
					<TransactionList
						balance={balance}
						transactions={transactions}
						goal={activeGoal}
						currentGoal={goal}
					/>
				)}
			</div>

			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} balance={balance} />
				<TransactionGoalsForm
					uid={user.uid}
					goal={activeGoal}
					onTransfer={handleGoalTrasfer}
				/>
			</div>
		</div>
	);
}
