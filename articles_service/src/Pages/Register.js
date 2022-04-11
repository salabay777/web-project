import React, {useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../img/logo-light-removebg-preview.png";
import "./Register.css";
import axios from "axios";

const Register = ({loggedIn, handleLogin}) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		password: "",
		confirm_password: "",
		role: ""
	});
	const [error, setError] = useState(null);

	const handleChange = e => {
		setError(null);
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (formData.password !== formData.confirm_password) {
			setError("Passwords do not match!");
			return;
		}

		setError(null);
		const data = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			email: formData.email,
			username: formData.username,
			password: formData.password,
			role: formData.role
		};
		axios.post("http://localhost:8089/api/v1/user", data)
			.then(() => {
				localStorage.setItem("user", JSON.stringify({username: formData.username, password: formData.password}));
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
			<div className="pt-5 mt-5 d-flex flex-column justify-content-center align-items-center register-root">
				<div className="mx-auto mb-3 p-lg-5 p-4 shadow-lg rounded register-card text-center">
					<img
						src={logo}
						width="163"
						height="52"
						className="d-inline-block mb-4"
						alt="Logo"
					/>
					<h5 className="mb-4">Sign up</h5>
					<form onSubmit={handleSubmit} name="form">
						<div className="mb-3 form-floating">
							<input
								id="first_name"
								type="text"
								className="form-control form-input"
								name="first_name"
								placeholder="First Name"
								required
								minLength="3"
								value={formData.first_name}
								onChange={handleChange}
							/>
							<label htmlFor="first_name">First Name</label>
						</div>
						<div className="mb-3 form-floating">
							<input
								id="last_name"
								type="text"
								className="form-control form-input"
								name="last_name"
								placeholder="Last Name"
								required
								minLength="3"
								value={formData.last_name}
								onChange={handleChange}
							/>
							<label htmlFor="last_name">Last Name</label>
						</div>
						<div className="mb-3 form-floating">
							<input
								id="email"
								type="email"
								className="form-control form-input"
								name="email"
								placeholder="Email"
								required
								minLength="3"
								value={formData.email}
								onChange={handleChange}
							/>
							<label htmlFor="email">Email</label>
						</div>
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
						<div className="mb-3 form-floating">
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
						<div className="mb-3 form-floating">
							<input
								id="confirm_password"
								type="password"
								className="form-control form-input"
								name="confirm_password"
								placeholder="Confirm Password"
								required
								minLength="6"
								value={formData.confirm_password}
								onChange={handleChange}
							/>
							<label htmlFor="confirm_password">Confirm Password</label>
						</div>
						<p>Choose your role:</p>
						<div className="mb-4 d-flex justify-content-around">
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="role"
									id="user"
									required
									value="user"
									onChange={handleChange}
									checked={formData.role === "user"}
								/>
								<label className="form-check-label" htmlFor="user">
                                    User
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="role"
									id="moderator"
									required
									value="moderator"
									onChange={handleChange}
									checked={formData.role === "moderator"}
								/>
								<label className="form-check-label" htmlFor="moderator">
                                    Moderator
								</label>
							</div>
						</div>
						<button type="submit" className="btn btn-outline-info w-100 mb-3">Sign up</button>
					</form>
					<p>Have an Account? - <Link to="/login" className="link-light text-decoration-none">Sign in</Link></p>
					{error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
						{error}
						<button type="button" className="btn-close" onClick={() => setError(null)}/>
					</div>}
				</div>
			</div>
		);
	}
};

Register.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	}),
	handleLogin: PropTypes.func
};

export default Register;