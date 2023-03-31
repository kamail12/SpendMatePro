import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid, balance }) {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const { addDocument, response } = useFirestore("transactions");

	const handleAdd = e => {
		e.preventDefault();

		if (amount <= 0) {
			alert("Wartość musi być większa od 0");
			return;
		}

		addDocument({
			uid,
			name,
			amount,
			type: "income",
		});
	};

	useEffect(() => {
		if (response.success) {
			setName("");
			setAmount("");
		}
	}, [response.success]);

	const handleSpend = e => {
		e.preventDefault();

		if (balance - amount < 0) {
			return;
		} else if (amount <= 0) {
			alert("Wartość musi być większa od 0");
			return;
		}

		addDocument({
			uid,
			name,
			amount,
			type: "expense",
		});
	};

	return (
		<>
			<h3>Add a Transaction 💰</h3>
			<form>
				<label>
					<span>Transaction name:</span>
					<input
						type="text"
						onChange={e => setName(e.target.value)}
						value={name}
						required
					/>
				</label>
				<label>
					<span>Amount 💲:</span>
					<input
						type="number"
						min="0"
						onChange={e => setAmount(e.target.value)}
						value={amount}
						required
					/>
				</label>
				<button onClick={handleAdd} disabled={!name || !amount}>
					Add Income 💰
				</button>
				<button onClick={handleSpend} disabled={!name || !amount}>
					Add Expense 💸
				</button>
			</form>
		</>
	);
}
