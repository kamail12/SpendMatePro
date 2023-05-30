import { Link, useHistory } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../img/logo.svg";

//Styles
import styles from "./Navbar.module.css";

export default function Navbar() {
	const history = useHistory();
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className={styles.navbar}>
			<img onClick={() => history.replace('/')} src={logo} alt="logo" className={styles.logo} />
			<ul>

				{!user && (
					<>
						<li className={'underline-animation'}>
							<Link to="/login">Login</Link>
						</li>
						<li className={styles.register}>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}

				{user && (
					<>
						<li>Witaj, {user.displayName} </li>
						<li>
							<button className={styles.register} onClick={logout}>
								Wyloguj
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
