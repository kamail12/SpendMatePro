import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import styles from "./Login.module.css";

export default function Login() {
	const { user } = useAuthContext();
	const history = useHistory();
	if (user) history.replace("/home");

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
				<h2 className={` ${styles.heading} underline`}>
					Zaloguj się do Portfela
				</h2>

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
				{!isPending && (
					<button className={`${styles.submit} underline-animation`}>
						Zaloguj się
					</button>
				)}
				{isPending && (
					<button disabled className={`${styles.submit}`}>
						Ładowanie...
					</button>
				)}
				{error && <p className={styles.error}>{error}</p>}
			</form>
			<div>
				Nie masz konta?{" "}
				<Link
					to={"/signup"}
					className={`${styles.signup} underline-animation`}
				>
					Zarejestruj się!
				</Link>
			</div>
		</div>
	);
}
