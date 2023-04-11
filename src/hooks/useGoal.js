import { useCollection } from './useCollection';

export const useGoal = (userId) => {
    const { documents, error } = useCollection(
		"goals",
		["uid", "==", userId],
		["createdAt", "desc"]
	);

    const active = documents.filter(document => document.active);
    const inactive = documents.filter(document => !document.active);

    return { active: active.pop(), inactive, error };
}
