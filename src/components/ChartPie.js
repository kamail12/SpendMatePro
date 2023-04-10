import { Chart, Tooltip, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//styles
import styles from "./ChartPie.module.css";

export default function ChartPie({ currentGoal, amount }) {
	Chart.register(Tooltip, ArcElement);

	return (
		<div className={styles.pie}>
			<Doughnut
				data={{
					datasets: [
						{
							// Jako jedna z danych pobierasz goalAmount a drugie to currentGoal
							data: [currentGoal, parseFloat(amount)],
							backgroundColor: [
								"rgba(255, 99, 132, 0.2)",
								"transparent",
							],
							borderColor: [
								"rgba(255, 99, 132, 1)",
								"transparent",
							],
							borderWidth: 1,
						},
					],
					labels: ["Current", "Goal"],
				}}
			/>
		</div>
	);
}
