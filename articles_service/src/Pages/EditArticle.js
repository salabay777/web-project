import React, {useEffect, useState} from "react";
import logo from "../img/logo-light-removebg-preview.png";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import "./EditArticle.css";

const EditArticle = ({loggedIn}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		text: "",
		moderator: ""
	});
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/article/${id}`)
			.then(response => {
				setError(null);
				setFormData({
					title: response.data.article.title,
					text: response.data.article.text,
					moderator: response.data.article.moderator.username
				});
			})
			.catch(error => {
				setError(error.response.data);
			});
	}, []);

	const handleChange = e => {
		setError(null);
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setError(null);
		axios.put(`http://localhost:8089/api/v1/article/${id}`, formData, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(() => {
				navigate("/");
			})
			.catch(error => {
				setError(error.response.data);
			});
	};

	const handleDelete = e => {
		e.preventDefault();

		axios.delete(`http://localhost:8089/api/v1/article/${id}`, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(() => {
				navigate("/");
			})
			.catch(error => {
				setError(error.response.data);
			});
	};

	return (
		<div className="pt-5 d-flex flex-column justify-content-center align-items-center article-root">
			<div className="mx-auto p-lg-5 p-4 shadow-lg rounded edit-article-card text-center">
				<img
					src={logo}
					width="163"
					height="52"
					className="d-inline-block mb-5"
					alt="Logo"
				/>
				<h5 className="mb-4">Edit Article</h5>
				<form onSubmit={handleSubmit}>
					<div className="mb-3 form-floating">
						<input
							id="title"
							type="text"
							className="form-control form-input"
							name="title"
							placeholder="Title"
							required
							minLength="3"
							value={formData.title}
							onChange={handleChange}
						/>
						<label htmlFor="title">Title</label>
					</div>
					<div className="form-floating mb-3">
						<textarea
							className="form-control form-input"
							placeholder="Type text of your article here"
							id="text"
							style={{height: "100px"}}
							name="text"
							required
							minLength="6"
							value={formData.text}
							onChange={handleChange}
						/>
						<label htmlFor="text">Main Text</label>
					</div>
					<div className="d-flex justify-content-between">
						<button type="submit" className="btn btn-outline-info mb-3 edit-btn">Edit</button>
						<button type="submit" onClick={handleDelete} className="btn btn-outline-danger mb-3 edit-btn">Delete</button>
					</div>
				</form>
				<p>Don&quot;t Want to Edit Now? - <Link to={`/articles/${id}`} className="link-light text-decoration-none">Back to Article</Link></p>
				{error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
					{error}
					<button type="button" className="btn-close" onClick={() => setError(null)}/>
				</div>}
			</div>
		</div>
	);
};

EditArticle.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default EditArticle;