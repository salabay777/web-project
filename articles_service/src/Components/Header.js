import React from "react";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../img/logo-light-removebg-preview.png";

const Header = ({loggedIn, handleLogin}) => {
	const navigate = useNavigate();

	const handleClick = e => {
		e.preventDefault();
		localStorage.removeItem("user");
		handleLogin();
		navigate("/login");
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
				<div className="container">
					<Link to="/" className="navbar-brand">
						<img
							src={logo}
							width="163"
							height="52"
							className="d-inline-block align-top"
							alt="Logo"
						/>
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
						data-bs-target="#navbar" aria-controls="navbar"
						aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>
					<div className="collapse navbar-collapse mt-lg-0 mt-2 d-lg-flex justify-content-between" id="navbar">
						<form className="d-flex">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn btn-outline-secondary" type="submit">Search</button>
						</form>
						<ul className="navbar-nav ml-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							{!loggedIn &&
                                <li className="nav-item">
                                	<Link className="nav-link" to="/login">Log in</Link>
                                </li>
							}
							<li className="nav-item">
								<Link className="nav-link" to="/account">Account</Link>
							</li>
							{loggedIn &&
                                <li className="nav-item">
                                	<Link className="nav-link" onClick={handleClick} to="#">Logout</Link>
                                </li>
							}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

Header.propTypes = {
	loggedIn: PropTypes.object,
	handleLogin: PropTypes.func
};

export default Header;