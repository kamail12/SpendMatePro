import { useFirestore } from "../hooks/useFirestore";
import GoalForm from "../pages/home/GoalForm";
import TransferMoneyToGoal from "../pages/home/TransferMoneyToGoal";

export default function TransactionGoalsForm({ uid, goals }) {
	const { addDocument } = useFirestore("goals");
	const hasGoals = goals.length !== 0;

	const handleAddGoal = async ({ goalTitle, goalAmount }) => {
		await addDocument({
			uid: uid,
			active: true,
			amount: goalAmount,
			title: goalTitle,
		});
	};

	const handleTransferMoneyToGoal = ({ transferMoney }) => {
		console.log(`Przelano właśnie ${transferMoney}$ na cel`);
	};

	if (!hasGoals) return <GoalForm onAdd={handleAddGoal} />;
	return <TransferMoneyToGoal onTransfer={handleTransferMoneyToGoal} />;
}
