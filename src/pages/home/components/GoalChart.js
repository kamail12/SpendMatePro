import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

import styles from './GoalChart.module.css';

export const GoalChart = ({ goal, current = 0 }) => {
	Chart.register(ArcElement);

    const amount = goal.amount;
	const currentPercentageMath = Math.floor((current / amount) * 100);

    return <>
        <Doughnut
            data={{
                datasets: [
                    {
                        data: [current, amount - current],
                        backgroundColor: ["var(--primary-color)", "transparent"],
                        borderColor: ["var(--light-color)", "var(--light-color)"],
                        borderWidth: 0,
                        weight: 0.25
                    },
                    {
                        data: [amount - current],
                        backgroundColor: ["transparent"],
                        borderColor: ["transparent"],
                        borderWidth: 0,
                    },
                ],
            }}
        />

        <div className={styles.details}>
            <h2>{ goal.title }</h2>
            <span>{`${currentPercentageMath}%`}</span>
        </div>
    </>
}