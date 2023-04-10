// style
import ChartPie from "./ChartPie";
import styles from "./Goal.module.css";

export default function Goal({ goal, currentGoal }) {
	return (
		<div className={styles.goalContainer}>
			<ChartPie currentGoal={currentGoal} amount={goal.amount} />
			<div className={styles.name}>
				<p>Kwota do uzbierania - {goal.amount}</p>
				<p className="target">Cel zbiórki - {goal.title}</p>
			</div>
		</div>
	);
}
