import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoal } from "../../hooks/useGoal";
import { useTransactions, TRANSACTION_TYPE } from "../../hooks/useTransactions";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionGoalsForm from "../../components/TransactionGoalsForm";

// styles
import styles from "./Home.module.css";

export default function Home() {
	const { user } = useAuthContext();

	// Retrieve calculated transactions
	const { update: updateGoal, active } = useGoal(user.uid);

	const {
		create: createTransaction,
		remove: removeTransaction,
		error: transactionError,
		transactions,
		incomes,
		expenses,
		transfers,
		goals,
		sum,
	} = useTransactions(user.uid);

	// Calculated sum of amounts
	const incomeSum = sum(incomes, i => parseFloat(i.amount));
	const expenseSum = sum(expenses, i => parseFloat(i.amount));
	const transferSum = sum(transfers, i => parseFloat(i.amount));
	const goalSum = sum(goals, i => parseFloat(i.amount));
	const balance = incomeSum - expenseSum - transferSum - goalSum;

	//goal trans
	const handleGoalTrasfer = async money => {
		// 1. sprawdzenie czy money <= balance
		if ((balance < money) || !active) return;

		const transaction = {
			uid: user.uid,
			name: active.title,
			amount: money,
			type: TRANSACTION_TYPE.GOAL,
		};

		// 2. dodajesz do transactions dokument o typie 'goal' (addDocument o typie 'goal')
		const id = await createTransaction(transaction);
		goals.push({ id, ...transaction });

		// 3. jesli goal amount (goals[0].amount) zsumowany z obecnym money jest wyzszy od goal amount
		//to wywolujesz metode await closeGoal()
		if (goalSum + money >= active.amount) await closeGoal();
	};

	const closeGoal = async () => {
		// Update documentu obecnego goala (goals[0]) i zmiana statusu active na false

		const transaction = {
			uid: user.uid,
			name: `Goal Completed: ${active.title}`,
			amount: sum(goals, (i) => parseFloat(i.amount)),
			type: TRANSACTION_TYPE.TRANSFER,
		};

		await Promise.all(
			goals.map(transaction => removeTransaction(transaction.id)),
			updateGoal(active.id, { active: false, transactions: goals }),
			createTransaction(transaction)
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{transactionError && <p>{transactionError}</p>}
				{transactions && (
					<TransactionList
						balance={balance}
						transactions={transactions}
						goal={active}
						currentGoal={goalSum}
					/>
				)}
			</div>

			<div className={styles.sidebar}>
				<TransactionForm uid={user.uid} balance={balance} />
				<TransactionGoalsForm
					uid={user.uid}
					goal={active}
					onTransfer={handleGoalTrasfer}
				/>
			</div>
		</div>
	);
}
