import { useState } from "react";
import { Link } from 'react-router-dom';

import { useLogin } from "../../hooks/useLogin";

// styles
import styles from "./Login.module.css";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isPending } = useLogin();

	const handleSubmit = e => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<div className={styles.wrapper}>
		<form onSubmit={handleSubmit} className={styles["login-form"]}>
			<h2 className={` ${styles.heading} underline`}>Login to use your wallet</h2>

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
			{!isPending && <button className={`${styles.submit} underline-animation`}>Login</button>}
			{isPending && <button disabled className={`${styles.submit}`}>Loading...</button>}
			{error && <p className={styles.error}>{error}</p>}
		</form>
		<div>Dont have an account? <Link to={'/signup'} className={`${styles.signup} underline-animation`}>Sign Up!</Link></div>
		</div>
	);
}
