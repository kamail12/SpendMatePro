import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return {
				success: false,
				isPending: true,
				error: null,
				document: null,
			};
		case "ERROR":
			return {
				success: false,
				isPending: false,
				error: action.payload,
				document: null,
			};
		case "ADDED_DOCUMENT":
			return {
				success: true,
				isPending: false,
				error: null,
				document: action.payload,
			};
		case "DELETED_DOCUMENT":
			return {
				isPending: false,
				document: null,
				success: true,
				error: null,
			};
		case "UPDATED_DOCUMENT":
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			};
		default:
			return state;
	}
};

export const useFirestore = collection => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	// collection ref
	const ref = projectFirestore.collection(collection);

	// only dispatch if not cancelled
	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const updateDocument = async (id, doc) => {
		if (!id) return; // add dispatch error if id not found

		dispatch({ type: "IS_PENDING" });

		// try {} catch {} dodaj error handling
		const updatedAt = timestamp.fromDate(new Date());
		await ref.doc(id).update({ ...doc, updatedAt });

		dispatchIfNotCancelled({
			type: "UPDATED_DOCUMENT",
			payload: doc,
		});
	};

	// add a document
	const addDocument = async doc => {
		dispatch({ type: "IS_PENDING" });

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await ref.add({ ...doc, createdAt });

			dispatchIfNotCancelled({
				type: "ADDED_DOCUMENT",
				payload: addedDocument,
			});

			return addedDocument.id;
		} catch (err) {
			dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
		}
	};

	// delete a document
	const deleteDocument = async id => {
		dispatch({ type: "IS_PENDING" });

		try {
			const deletedDocument = await ref.doc(id).delete();
			dispatchIfNotCancelled({
				type: "DELETED_DOCUMENT",
				payload: deletedDocument,
			});
		} catch (err) {
			dispatchIfNotCancelled({
				type: "ERROR",
				payload: "Could not deleted document",
			});
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, deleteDocument, updateDocument, response };
};
