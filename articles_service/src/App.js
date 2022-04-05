import "./App.css";
import {useState} from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

import Header from "./Components/Header";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Articles from "./Pages/Articles";
import Account from "./Pages/Account";
import EditAccount from "./Pages/EditAccount";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
	const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("user")));

	const setLogin = () => {
		setLoggedIn(JSON.parse(localStorage.getItem("user")));
	};

	const setLogout = () => {
		setLoggedIn(null);
	};

	return (
		<Router>
			<Header loggedIn={loggedIn} handleLogin={setLogout} />
			<Routes>
				<Route exact path ='/' element={<Articles />} />
				<Route exact path='/login' element={<Login loggedIn={loggedIn} handleLogin={setLogin} />} />
				<Route exact path='/register' element={<Register loggedIn={loggedIn} handleLogin={setLogin} />} />
				<Route exact path='/account' element={<PrivateRoute />}>
					<Route exact path='/account' element={<Account loggedIn={loggedIn} />}/>
				</Route>
				<Route exact path='/edit-account' element={<PrivateRoute />}>
					<Route exact path='/edit-account' element={<EditAccount loggedIn={loggedIn} setLogin={setLogin} setLogout={setLogout} />}/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
