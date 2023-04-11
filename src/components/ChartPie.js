import { Chart, Tooltip, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//styles
import styles from "./ChartPie.module.css";

export default function ChartPie({ currentGoal, amount }) {
	Chart.register(Tooltip, ArcElement);

	//variable

	const currentPercentageMath = Math.floor((currentGoal / amount) * 100);

	return (
		<div className={styles.pie}>
			<Doughnut
				data={{
					datasets: [
						{
							data: [currentGoal, amount - currentGoal],
							backgroundColor: ["lime", "transparent"],
							borderColor: ["white", "white"],
							borderWidth: 2,
						},
						{
							data: [amount - currentGoal],
							backgroundColor: ["transparent"],
							borderColor: ["transparent"],
							borderWidth: 2,
						},
					],
					labels: ["Current", "Goal"],
				}}
			/>

			<div className={styles.percentage}>
				<p>{`${currentPercentageMath}%`}</p>
			</div>
		</div>
	);
}
