import { useFirestore } from "../hooks/useFirestore";
import GoalForm from "../pages/home/GoalForm";

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

	if (!hasGoals) return <GoalForm onAdd={handleAddGoal} />;
	return null;
}
