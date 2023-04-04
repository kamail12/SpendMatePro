//style
import styles from "./Goal.module.css";

export default function Goal({ goals }) {
	return (
		<>
			{goals.map((goal, index) => (
				<div key={index}>
					<p>{goal.amount}</p>
					<p>{goal.title}</p>
				</div>
			))}
		</>
	);
}
