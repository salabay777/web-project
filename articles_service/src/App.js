import "./App.css";
import React, {useState} from "react";
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
import WriteArticle from "./Pages/WriteArticle";
import Article from "./Pages/Article";
import PrivateRoute from "./Components/PrivateRoute";
import EditArticle from "./Pages/EditArticle";
import UserArticles from "./Pages/UserArticles";
import ReviewArticles from "./Pages/ReviewArticles";

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
				<Route exact path='/' element={<Articles />} />
				<Route exact path='/search' element={<Articles />} />
				<Route exact path='/login' element={<Login loggedIn={loggedIn} handleLogin={setLogin} />} />
				<Route exact path='/register' element={<Register loggedIn={loggedIn} handleLogin={setLogin} />} />
				<Route exact path='/users/:username' element={<Account loggedIn={loggedIn} />} />
				<Route exact path='/edit-account' element={<PrivateRoute loggedIn={loggedIn} />}>
					<Route exact path='/edit-account' element={<EditAccount loggedIn={loggedIn} setLogin={setLogin} setLogout={setLogout} />}/>
				</Route>
				<Route exact path='/write-article' element={<PrivateRoute loggedIn={loggedIn} />}>
					<Route exact path='/write-article' element={<WriteArticle loggedIn={loggedIn} />}/>
				</Route>
				<Route exact path='/review-articles' element={<PrivateRoute loggedIn={loggedIn} />}>
					<Route exact path='/review-articles' element={<ReviewArticles loggedIn={loggedIn} />}/>
				</Route>
				<Route exact path='/user-articles' element={<PrivateRoute loggedIn={loggedIn} />}>
					<Route exact path='/user-articles' element={<UserArticles loggedIn={loggedIn} />} />
				</Route>
				<Route exact path='/articles/:id' element={<Article loggedIn={loggedIn} />} />
				<Route exact path='/edit-article/:id' element={<PrivateRoute loggedIn={loggedIn} />}>
					<Route exact path='/edit-article/:id' element={<EditArticle loggedIn={loggedIn} />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
