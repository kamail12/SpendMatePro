import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

import styles from "./Details.module.css";
import splash from '../../../img/splash.svg';


const Circle = ({ children }) => {
    return <div className={styles.circle}>
        { children }
    </div>
};

const GoalCircle = ({ children, onClick }) => {
    return <div onClick={onClick} className={`${styles.circle} ${styles.goal}`}>
        { children }
    </div>
}

const AddExpenseCircle = ({ children, onClick }) => {
    return <div onClick={onClick} className={`${styles.circle} ${styles.expense}`}>
        { children }
    </div>
}

const AddIncomeCircle = ({ children, onClick }) => {
    return <div onClick={onClick} className={`${styles.circle} ${styles.income}`}>
        { children }
    </div>
}

const GoalChart = ({ goal, current = 0 }) => {
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

export const Details = ({ balance = 0, goal, current, onGoalClick, onBalanceClick, onAddIncomeClick, onAddExpenseClick }) => {
  return <div className={styles.wrapper} style={{ backgroundImage: `url(${splash})`}}>
    <Circle>
        <GoalCircle onClick={onGoalClick}>
            { goal && <GoalChart goal={goal} current={current} /> }
            { !goal && <>No goal</> }
        </GoalCircle>
        <div onClick={onBalanceClick} className={styles.balance}>
            <h2>${balance}</h2>
            <span>Available</span>
        </div>

        <AddExpenseCircle onClick={onAddExpenseClick}>
            <span className={'underline-animation'}>Expense</span>
        </AddExpenseCircle>

        <AddIncomeCircle onClick={onAddIncomeClick}>
            <span className={'underline-animation'}>Income</span>
        </AddIncomeCircle>
    </Circle>
  </div>;
};
