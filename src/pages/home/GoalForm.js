import { useState } from "react";

//styles
import styles from "./Home.module.css";

export default function GoalForm({ onAdd }) {
	const [goalTitle, setGoalTitle] = useState("");
	const [goalAmount, setGoalAmount] = useState(0);

	const handleSubmit = e => {
		e.preventDefault();

		onAdd({ goalAmount, goalTitle });
	};

	return (
		<>
			<h3 className={styles.goalTitle}>Add Your Goal 🎯</h3>
			<form onSubmit={e => handleSubmit(e)}>
				<label>
					<span>Your Goal Name:</span>
					<input
						type="text"
						onChange={e => setGoalTitle(e.target.value)}
						value={goalTitle}
						required
						placeholder="Wakacje"
					/>
				</label>
				<label>
					<span>Amount to achieve:</span>
					<input
						type="number"
						min="0"
						onChange={e => setGoalAmount(e.target.value)}
						value={goalAmount}
						required
					/>
				</label>
				<button className="btn">Transfer Money</button>
			</form>
		</>
	);
}
