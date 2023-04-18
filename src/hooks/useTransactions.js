import { useCollection } from './useCollection';
import { useFirestore } from './useFirestore';
import { useFilter } from './useFilter';

export const TRANSACTION_TYPE = {
    INCOME: 'income',
    EXPENSE: 'expense',
    TRANSFER: 'transfer',
    GOAL: 'goal'
};

export const useTransactions = (userId) => {
    const { addDocument, deleteDocument } = useFirestore("transactions");

	const { documents, error, isLoading } = useCollection(
		"transactions",
		["uid", "==", userId],
		["createdAt", "desc"]
	);

    const incomes = useFilter(documents, document => document.type === TRANSACTION_TYPE.INCOME);
    const expenses = useFilter(documents, document => document.type === TRANSACTION_TYPE.EXPENSE);
    const transfers = useFilter(documents, document => document.type === TRANSACTION_TYPE.TRANSFER);
    const goals = useFilter(documents, document => document.type === TRANSACTION_TYPE.GOAL);
    
    const sum = (items = [], mapper = (item) => item, initial = 0) => {
        return items.map(mapper).reduce((prev, curr) => prev + curr, initial);
    };

    const remove = async (id) => deleteDocument(id);

    const create = async ({ uid, amount, name, type = TRANSACTION_TYPE.INCOME }) => {
        if (!uid || !amount || !name) return;
        return addDocument({ uid, amount, name, type });
    }

    return { transactions: documents, incomes, expenses, transfers, goals, sum, error, create, remove, isLoading };
}
