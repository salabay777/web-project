import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

import avatar from "../img/user.png";
import "./Account.css";

const Account = ({loggedIn}) => {
	const {username} = useParams();
	const [user, setUser] = useState(loggedIn);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/user/${username}`)
			.then(response => {
				setUser(response.data.user);
			})
			.catch(error => {
				console.log(error);
			});
	}, [username]);

	return (
		<>
			<div className="pt-5 d-flex flex-column justify-content-center align-items-center login-root">
				<div className="card account-card shadow-lg rounded text-center">
					<img src={avatar} className="card-img-top" alt="Avatar"/>
					<div className="card-body">
						{user && (
							<>
								<h4 className="card-title mb-3">{user.username}</h4>
								<p className="card-text mb-1">{`${user.first_name} ${user.last_name}`}</p>
								<p className="card-text mb-1">{user.email}</p>
								<p className="card-text">Role: {user.role}</p>
							</>
						)}
						{loggedIn && user && loggedIn.username === user.username && (
							<Link to="/edit-account" className="btn btn-outline-info">Edit Account</Link>
						)}
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