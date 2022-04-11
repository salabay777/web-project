import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

import "./Login.css";
import logo from "../img/logo-light-removebg-preview.png";

const Login = ({loggedIn, handleLogin}) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: ""
	});
	const [error, setError] = useState(null);

	const handleChange = e => {
		setError(null);
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setError(null);
		axios.post("http://localhost:8089/api/v1/user/login", formData)
			.then(() => {
				localStorage.setItem("user", JSON.stringify(formData));
				handleLogin();
				navigate("/");
			})
			.catch(error => {
				setError(error.response.data);
			});
	};

	if (loggedIn) {
		return <Navigate to="/" />;
	}
	else {
		return (
			<div className="pt-5 d-flex flex-column justify-content-center align-items-center login-root">
				<div className="mx-auto p-lg-5 p-4 shadow-lg rounded login-card text-center">
					<img
						src={logo}
						width="163"
						height="52"
						className="d-inline-block mb-5"
						alt="Logo"
					/>
					<h5 className="mb-4">Sign in</h5>
					<form onSubmit={handleSubmit} name="form">
						<div className="mb-3 form-floating">
							<input
								id="username"
								type="text"
								className="form-control form-input"
								name="username"
								placeholder="Username"
								required
								minLength="3"
								value={formData.username}
								onChange={handleChange}
							/>
							<label htmlFor="username">Username</label>
						</div>
						<div className="mb-5 form-floating">
							<input
								id="password"
								type="password"
								className="form-control form-input"
								name="password"
								placeholder="Password"
								required
								minLength="6"
								value={formData.password}
								onChange={handleChange}
							/>
							<label htmlFor="password">Password</label>
						</div>
						<button type="submit" className="btn btn-outline-info w-100 mb-3">Sign in</button>
					</form>
					<p>Don&#39;t Have an Account? - <Link to="/register" className="link-light text-decoration-none">Sign up</Link></p>
					{error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
						{error}
						<button type="button" className="btn-close" onClick={() => setError(null)}/>
					</div>}
				</div>
			</div>
		);
	}
};

Login.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	}),
	handleLogin: PropTypes.func
};

export default Login;