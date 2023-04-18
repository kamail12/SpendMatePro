import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSignup } from "../../hooks/useSignup";

//Styles
import styles from "./Signup.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Signup() {
	const { user } = useAuthContext();
	const history = useHistory();
	if (user) history.replace('/home');

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [income, setIncome] = useState(0);
	const { signup, isPending, error } = useSignup();

	const handleSubmit = e => {
		e.preventDefault();

		signup(email, password, displayName, income);
	};

	return (
		<div className={styles.wrapper}>
		<form onSubmit={handleSubmit} className={styles["signup-form"]}>
		<h2 className={` ${styles.heading} underline`}>Create your awesome account</h2>
				<input
					type="email"
					onChange={e => setEmail(e.target.value)}
					value={email}
					placeholder="Email"
				/>
				<input
					type="password"
					onChange={e => setPassword(e.target.value)}
					value={password}
					placeholder="Password"
				/>

				<input
					type="text"
					onChange={e => setDisplayName(e.target.value)}
					value={displayName}
					placeholder="Display name"
				/>
				<input
					type="number"
					min="0"
					onChange={e => setIncome(e.target.value)}
					value={income}
					placeholder="Your income"
				/>
			{!isPending && <button className={`${styles.submit} underline-animation`}>Register</button>}
			{isPending && <button disabled className={`${styles.submit}`}>Loading...</button>}
			{error && <p className={styles.error}>{error}</p>}
		</form>
		<div>Already have an account? <Link to={'/login'} className={`${styles.signup} underline-animation`}>Login here!</Link></div>
	</div>
	);
}
