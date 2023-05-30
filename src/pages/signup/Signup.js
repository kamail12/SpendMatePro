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
		<h2 className={` ${styles.heading} underline`}>Stwórz swoje konto</h2>
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
					placeholder="Hasło"
				/>

				<input
					type="text"
					onChange={e => setDisplayName(e.target.value)}
					value={displayName}
					placeholder="Nazwa profilu"
				/>
				<input
					type="number"
					min="0"
					onChange={e => setIncome(e.target.value)}
					value={income}
					placeholder="Aktualny Stan Konta"
				/>
			{!isPending && <button className={`${styles.submit} underline-animation`}>Zarejestruj się!</button>}
			{isPending && <button disabled className={`${styles.submit}`}>Ładowanie...</button>}
			{error && <p className={styles.error}>{error}</p>}
		</form>
		<div>Posiadasz aktywne konto? <Link to={'/login'} className={`${styles.signup} underline-animation`}>Zaloguj się tutaj!</Link></div>
	</div>
	);
}
