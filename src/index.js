import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.querySelector("#root")).render(
	<AuthContextProvider>
		<App />
	</AuthContextProvider>
);
