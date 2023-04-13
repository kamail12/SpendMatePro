import styles from './Circle.module.css';

export const Circle = ({ children }) => {
    return <div className={styles.circle}>
        { children }
    </div>
};

Circle.GoalCircle = ({ children, onClick }) => {
    return <div onClick={onClick} className={`${styles.circle} ${styles.goal}`}>
        { children }
    </div>
}

Circle.ExpenseCircle = ({ children, onClick }) => {
    return <div onClick={onClick} className={`${styles.circle} ${styles.expense}`}>
        { children }
    </div>
}

Circle.IncomeCircle = ({ children, onClick }) => {
    return <div onClick={onClick} className={`${styles.circle} ${styles.income}`}>
        { children }
    </div>
}