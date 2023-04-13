import { TRANSACTION_TYPE } from "./useTransactions";

export const useTransactionTypeIcon = (type = TRANSACTION_TYPE.EXPENSE) => {
    const style = (color) => ({ fontSize: 'var(--font-size-3x)', color: `var(--${color})` });

    switch(type) {
        case TRANSACTION_TYPE.INCOME:
            return <span style={style('success-color')}>→</span>;
        case TRANSACTION_TYPE.GOAL:
            return <span style={style('primary-color')}>☀️</span>;
        case TRANSACTION_TYPE.TRANSFER:
            return <span style={style('primary-color')}>🎉</span>;
        case TRANSACTION_TYPE.EXPENSE:
            return <span style={style('accent-color')}>←</span>;
        default:
            return <span style={style('shadow-color')}>...</span>;
    }
}