import { useCollection } from './useCollection';
import { useFirestore } from './useFirestore';

export const useGoal = (userId) => {
    const { updateDocument, addDocument } = useFirestore("goals");
    const { documents, error } = useCollection(
		"goals",
		["uid", "==", userId],
		["createdAt", "desc"]
	);

    const active = documents.filter(document => document.active);
    const inactive = documents.filter(document => !document.active);

    const update = async (id, goal) => updateDocument(id, goal);
    const create = async ({ uid, amount, title, active = true }) => addDocument({ uid, active, amount, title });

    return { active: active.pop(), inactive, error, update, create };
}
