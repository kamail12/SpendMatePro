import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const { addDocument } = useFirestore("transactions");

	const signup = async (email, password, displayName, income) => {
		setError(null);
		setIsPending(true);

		try {
			//Signup
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			//Add display name to user
			await res.user.updateProfile({ displayName });

			//conect display name and income || ADD
			await addDocument({
				uid: res.user.uid,
				type: "income",
				name: "Monthly income",
				amount: income,
			});

			//dispatch login action
			dispatch({ type: "LOGIN", payload: res.user });

			//Update State
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return setIsCancelled(true);
	}, []);

	return { error, isPending, signup };
};
