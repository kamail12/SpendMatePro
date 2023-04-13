import { Circle } from './Circle';
import { GoalChart } from './GoalChart';

import styles from "./Details.module.css";
import splash from '../../../img/splash.svg';

export const Details = ({ balance = 0, goal, current, onGoalClick, onBalanceClick, onAddIncomeClick, onAddExpenseClick }) => {

    const handleAddExpenseClick = (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0 });

        return onAddExpenseClick(e);
    }

    const handleAddIncomeClick = (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0 });

        return onAddIncomeClick(e);
    }

    const handleGoalClick = (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0 });

        return onGoalClick(e);
    }

    const handleBalanceClick = (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0 });

        return onBalanceClick(e);
    }

    return <div className={styles.wrapper} style={{ backgroundImage: `url(${splash})`}}>
        <Circle>
            <Circle.GoalCircle onClick={handleGoalClick}>
                { goal && <GoalChart goal={goal} current={current} /> }
                { !goal && <>No goal</> }
            </Circle.GoalCircle>
            <div onClick={handleBalanceClick} className={styles.balance}>
                <h2>${balance}</h2>
                <span>Available</span>
            </div>

            <Circle.ExpenseCircle onClick={handleAddExpenseClick}>
                <span className={'underline-animation'}>Expense</span>
            </Circle.ExpenseCircle>

            <Circle.IncomeCircle onClick={handleAddIncomeClick}>
                <span className={'underline-animation'}>Income</span>
            </Circle.IncomeCircle>
        </Circle>
    </div>;
};
