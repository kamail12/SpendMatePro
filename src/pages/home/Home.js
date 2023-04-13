import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useGoal } from "../../hooks/useGoal";
import { useTransactions, TRANSACTION_TYPE } from "../../hooks/useTransactions";

// components
import { Transactions } from "../../components/Transactions";
import { Modal } from "../../components/Modal";
import Navbar from '../../components/Navbar';
import { Item } from "../../components/Item";
import { Details } from "./components/Details";

import { ExpenseModal } from "./modals/ExpenseModal";
import { IncomeModal } from "./modals/IncomeModal";
import { GoalModal } from "./modals/GoalModal";
import { TransferModal } from "./modals/TransferModal";

// styles
import styles from "./Home.module.css";

export default function Home() {
	const history = useHistory();
	const { user } = useAuthContext();
	const [modal, setModal] = useState();

	// Retrieve calculated transactions
	const {
		update: updateGoal,
		create: createGoal,
		active
	} = useGoal(user.uid);

	const {
		create: createTransaction,
		remove: removeTransaction,
		error: transactionError,
		isLoading: transactionsLoading,
		transactions,
		incomes,
		expenses,
		transfers,
		goals,
		sum,
	} = useTransactions(user.uid);

	// Calculated sum of amounts
	const incomeSum = sum(incomes, i => parseFloat(i.amount));
	const expenseSum = sum(expenses, i => parseFloat(i.amount));
	const transferSum = sum(transfers, i => parseFloat(i.amount));
	const goalSum = sum(goals, i => parseFloat(i.amount));
	const balance = incomeSum - expenseSum - transferSum - goalSum;

	const closeGoal = async () => {
		const transaction = {
			uid: user.uid,
			name: active.title,
			amount: sum(goals, (i) => parseFloat(i.amount)),
			type: TRANSACTION_TYPE.TRANSFER,
		};

		await Promise.all(
			goals.map(transaction => removeTransaction(transaction.id)),
			updateGoal(active.id, { active: false, transactions: goals }),
			createTransaction(transaction)
		);
	};

	const handleOpenExpenseModal = (e) => {
		e.stopPropagation();
		window.scrollTo({ top: 0 });

		setModal({
			isDissmisible: true,
			element: <ExpenseModal balance={balance} onClose={() => setModal(null)} onSubmit={async ({ title, amount }) => {
				const id = await createTransaction({
					uid: user.uid,
					name: title,
					amount: amount,
					type: TRANSACTION_TYPE.EXPENSE,
				});

				// We have an id so we can close modal (success case)
				if (id) return setModal(null);
			}} />
		});
	}

	const handleOpenIncomeModal = (e) => {
		e.stopPropagation();
		window.scrollTo({ top: 0 });

		setModal({
			isDissmisible: true,
			element: <IncomeModal onClose={() => setModal(null)} onSubmit={async ({ title, amount }) => {
				const id = await createTransaction({
					uid: user.uid,
					name: title,
					amount: amount,
					type: TRANSACTION_TYPE.INCOME,
				});

				// We have an id so we can close modal (success case)
				if (id) return setModal(null);
			}} />
		});
	}

	const handleOpenTransferModal = (e) => {
		e.stopPropagation();
		window.scrollTo({ top: 0 });

		setModal({
			isDissmisible: true,
			element: <TransferModal balance={balance} onClose={() => setModal(null)} onSubmit={async ({ amount }) => {
				const transaction = { uid: user.uid, name: active.title, amount, type: TRANSACTION_TYPE.GOAL };
				const id = await createTransaction(transaction);
				if (!id) return;

				goals.push({ id, ...transaction });
				if (goalSum + amount >= active.amount) await closeGoal();

				return setModal(null);
			}} />
		});
	}

	const handleOpenGoalModal = (e) => {
		e.stopPropagation();
		window.scrollTo({ top: 0 });

		setModal({
			isDissmisible: true,
			element: <GoalModal onClose={() => setModal(null)} onSubmit={async ({ title, amount }) => {
				await createGoal({ uid: user.uid, title, amount });
				return setModal(null);
			}} />
		});
	}

	return (
		<>
		<Navbar />
		<div className={styles.container}>
			<main>
				<Details
					balance={balance}
					goal={active}
					current={goalSum}
					onGoalClick={active ? handleOpenTransferModal : handleOpenGoalModal}
					onAddExpenseClick={handleOpenExpenseModal}
					onAddIncomeClick={handleOpenIncomeModal}
					onBalanceClick={() => {}}
				/>
				<Transactions
					title="Last Transactions"
					limit={5}
					loading={transactionsLoading}
					error={transactionError}
					transactions={transactions}
					onShowMoreClick={() => history.push('/transactions')}
				/>
			</main>

			<aside className={styles.sidebar}>
				<Item.Button title={'New Expense'} description={'Add new expense to the list'} onClick={handleOpenExpenseModal} />
				<Item.Button title={'New Income'} description={'Add new income to the list'} onClick={handleOpenIncomeModal}/>
				{ active && <Item.Button title={'Transfer to Goal'} description={'Transfer money to goal'} onClick={handleOpenTransferModal}/> }
				{ !active && <Item.Button title={'Create Goal'} description={'Create new goal'} onClick={handleOpenGoalModal}/> }

				<Item title={'Upcoming Payments'}>
					<span>Some upcoming payments...</span>
				</Item>

				<Item title={'Remainders'}>
					<span>Some remainders...</span>
				</Item>

			</aside>
		</div>
		{ modal && <Modal onOutsideClick={() => modal.isDissmisible && setModal(null)}>{ modal.element }</Modal> }
		</>
	);
}
