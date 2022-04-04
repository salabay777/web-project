import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Link} from "react-router-dom";

import avatar from "../img/user.png";
import "./Account.css";

const Account = ({loggedIn}) => {
	const [user, setUser] = useState(loggedIn);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/user/${loggedIn.username}`, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(response => {
				setUser(response.data.user);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<div className="pt-5 d-flex flex-column justify-content-center align-items-center login-root">
				<div className="card shadow-lg rounded text-center">
					<img src={avatar} className="card-img-top" alt="Avatar" />
					<div className="card-body">
						<h4 className="card-title mb-3">{user.username}</h4>
						<p className="card-text mb-1">{`${user.first_name} ${user.last_name}`}</p>
						<p className="card-text mb-1">{user.email}</p>
						<p className="card-text">Role: {user.role}</p>
						<Link to="/edit-account" className="btn btn-outline-info">Edit Account</Link>
					</div>
				</div>
			</div>
		</>
	);
};

Account.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default Account;