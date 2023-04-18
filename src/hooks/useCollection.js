import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
	const [documents, setDocuments] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		let ref = projectFirestore.collection(collection);

		if (query) {
			ref = ref.where(...query);
		}
		if (orderBy) {
			ref = ref.orderBy(...orderBy);
		}

		const unsubscribe = ref.onSnapshot(
			snapshot => {
				let results = [];
				snapshot.docs.forEach(doc => {
					results.push({ ...doc.data(), id: doc.id });
				});

				// update state
				setDocuments(results);
				setIsLoading(false);
			},
			error => {
				console.log(error);
				setError("could not fetch the data");
				setIsLoading(false);
			}
		);

		// unsubscribe on unmount
		return () => unsubscribe();
	}, [collection, query, orderBy, setError, setDocuments]);

	return { documents, error, isLoading };
};
