import { useCollection } from './useCollection';
import { useFirestore } from './useFirestore';

export const useGoal = (userId) => {
    const { updateDocument } = useFirestore("goals");
    const { documents, error } = useCollection(
		"goals",
		["uid", "==", userId],
		["createdAt", "desc"]
	);

    const active = documents.filter(document => document.active);
    const inactive = documents.filter(document => !document.active);

    const update = async (id, goal) => updateDocument(id, goal);

    return { active: active.pop(), inactive, error, update };
}
