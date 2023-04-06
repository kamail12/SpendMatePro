// style
import styles from "./Goal.module.css";

export default function Goal({ goals }) {
	const containerClassName =
		goals && goals.length > 0 ? styles.goalContainer : "";

	return (
		<div className={containerClassName}>
			{goals.map((goal, index) => (
				<div key={index}>
					<p>Kwota do uzbierania - {goal.amount}</p>
					<p className="target">Cel zbiórki - {goal.title}</p>
				</div>
			))}
		</div>
	);
}
