import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//Pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
	const { authIsReady, user } = useAuthContext();


	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							{!user && <Redirect to="/login" />}
							{user && <Home />}
						</Route>
						<Route path="/login">
							{user && <Redirect to="/" />}
							{!user && <Login />}
						</Route>
						<Route path="/signup">
							{user && <Redirect to="/" />}
							{!user && <Signup />}
						</Route>
					</Switch>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
