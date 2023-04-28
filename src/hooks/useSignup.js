import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";
import { useRef } from "react";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();
	const { addDocument } = useFirestore("transactions");

	const isMounted = useRef(true);

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
			if (isMounted.current) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (isMounted.current) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	return { error, isPending, signup };
};
