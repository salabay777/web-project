import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import logo from "../img/logo-light-removebg-preview.png";
import "./WriteArticle.css";
import FormSelect from "../Components/FormSelect";

const WriteArticle = ({loggedIn}) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		text: "",
		moderator: ""
	});
	const [error, setError] = useState(null);

	const handleChange = e => {
		setError(null);
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setError(null);
		axios.post("http://localhost:8089/api/v1/article", formData, {
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
			<div className="mx-auto p-lg-5 p-4 shadow-lg rounded article-card text-center">
				<img
					src={logo}
					width="163"
					height="52"
					className="d-inline-block mb-5"
					alt="Logo"
				/>
				<h5 className="mb-4">Write Article</h5>
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
					<FormSelect
						loggedIn={loggedIn}
						formData={formData}
						handleChange={handleChange}
						setFormData={setFormData}
						setError={setError}
					/>
					<button type="submit" className="btn btn-outline-info w-100 mb-3">Send</button>
				</form>
				<p>Don&quot;t Want to Write Now? - <Link to="/" className="link-light text-decoration-none">Back to Articles</Link></p>
				{error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
					{error}
					<button type="button" className="btn-close" onClick={() => setError(null)}/>
				</div>}
			</div>
		</div>
	);
};

WriteArticle.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default WriteArticle;