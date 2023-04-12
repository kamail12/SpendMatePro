import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../img/logo.svg";

//Styles
import styles from "./Navbar.module.css";

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className={styles.navbar}>
			<img src={logo} alt="logo" className={styles.logo} />
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
						<li>Hello, {user.displayName} </li>
						<li>
							<button className="btn" onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
