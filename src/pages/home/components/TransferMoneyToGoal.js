import { useState } from "react";

//styles
import styles from "../Home.module.css";

export default function TransferMoneyToGoal({ onTransfer }) {
	const [transferMoney, setTransferMoney] = useState(0);

	const handleSubmit = e => {
		e.preventDefault();

		onTransfer(parseFloat(transferMoney));
		setTransferMoney(0);
	};

	return (
		<div>
			<>
				<h3 className={styles.goalTitle}>
					Transfer Money To Your Goal
				</h3>
				<form onSubmit={e => handleSubmit(e)}>
					<label>
						<span>Amount to transfer:</span>
						<input
							type="number"
							min="0"
							onChange={e => setTransferMoney(e.target.value)}
							value={transferMoney}
							required
						/>
					</label>
					<button className="btn">Transfer Money</button>
				</form>
			</>
		</div>
	);
}
