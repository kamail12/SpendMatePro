import { useFirestore } from "../../../hooks/useFirestore";
import TransferMoneyToGoal from "./TransferMoneyToGoal";
import GoalForm from "./GoalForm";

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
