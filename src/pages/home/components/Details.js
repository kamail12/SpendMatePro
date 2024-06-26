import { Circle } from './Circle';
import { GoalChart } from './GoalChart';

import styles from "./Details.module.css";
import splash from '../../../img/splash.svg';

export const Details = ({ balance = 0, goal, current, onGoalClick, onBalanceClick, onAddIncomeClick, onAddExpenseClick }) => {

    return <div className={styles.wrapper} style={{ backgroundImage: `url(${splash})`}}>
        <Circle>
            <Circle.GoalCircle onClick={onGoalClick}>
                { goal && <GoalChart goal={goal} current={current} /> }
                { !goal && <>Ustaw Cel</> }
            </Circle.GoalCircle>
            <div onClick={onBalanceClick} className={styles.balance}>
                <h2>{balance} zł</h2>
                <span>Dostępne</span>
            </div>

            <Circle.ExpenseCircle onClick={onAddExpenseClick}>
                <span className={'underline-animation'}>Wydatek</span>
            </Circle.ExpenseCircle>

            <Circle.IncomeCircle onClick={onAddIncomeClick}>
                <span className={'underline-animation'}>Przychód</span>
            </Circle.IncomeCircle>
        </Circle>
    </div>;
};
