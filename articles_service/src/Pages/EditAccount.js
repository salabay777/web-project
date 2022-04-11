import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../img/logo-light-removebg-preview.png";
import axios from "axios";

const EditAccount = ({loggedIn, setLogin, setLogout}) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		role: ""
	});
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/user/${loggedIn.username}`, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(response => {
				setFormData(response.data.user);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const handleChange = e => {
		setError(null);
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = e => {
		e.preventDefault();

		setError(null);
		const data = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			email: formData.email,
			username: formData.username,
			role: formData.role
		};
		axios.put(`http://localhost:8089/api/v1/user/${loggedIn.username}`, data, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(() => {
				localStorage.setItem("user", JSON.stringify({username: formData.username, password: loggedIn.password}));
				setLogin();
				navigate(`/users/${formData.username}`);
			})
			.catch(error => {
				setError(error.response.data);
			});
	};

	const handleDelete = e => {
		e.preventDefault();

		axios.delete(`http://localhost:8089/api/v1/user/${loggedIn.username}`, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(() => {
				localStorage.removeItem("user");
				setLogout();
				navigate("/login");
			})
			.catch(error => {
				setError(error.response.data);
			});
	};

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
				<h5 className="mb-4">Edit Account</h5>
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
					<div className="d-flex justify-content-between">
						<button type="submit" className="btn btn-outline-info mb-3 edit-btn" data-testid="edit">Edit</button>
						<button type="submit" onClick={handleDelete} className="btn btn-outline-danger mb-3 edit-btn" data-testid="delete">Delete</button>
					</div>
				</form>
				<p>Don&#39;t Want to Edit Account? - <Link to={`/users/${loggedIn.username}`} className="link-light text-decoration-none">Back</Link></p>
				{error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
					{error}
					<button type="button" className="btn-close" onClick={() => setError(null)}/>
				</div>}
			</div>
		</div>
	);
};

EditAccount.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	}),
	setLogin: PropTypes.func,
	setLogout: PropTypes.func
};

export default EditAccount;