import { useFirestore } from "../hooks/useFirestore";
import GoalForm from "../pages/home/GoalForm";
import TransferMoneyToGoal from "../pages/home/TransferMoneyToGoal";

export default function TransactionGoalsForm({ uid, goal, onTransfer }) {
	const { addDocument } = useFirestore("goals");

	const handleAddGoal = async ({ goalTitle, goalAmount }) => {
		await addDocument({
			uid: uid,
			active: true,
			amount: goalAmount,
			title: goalTitle,
		});
	};

	if (!goal) return <GoalForm onAdd={handleAddGoal} />;
	return <TransferMoneyToGoal onTransfer={onTransfer} />;
}
