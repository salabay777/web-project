import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

import "./Article.css";

const Article = ({loggedIn}) => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [article, setArticle] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/article/${id}`)
			.then(response => {
				setError(null);
				setArticle({...response.data.article, date: moment(response.data.article.date).format("dddd, MMMM Do YYYY")});
			})
			.catch(error => {
				setError(error);
			});
	}, []);

	const handleReview = e => {
		e.preventDefault();

		axios.put(`http://localhost:8089/api/v1/article/${id}`, {status: e.target.name}, {
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
				console.log(error);
			});
	};


	return(
		<div className="d-flex flex-column justify-content-center align-items-center pt-5 mt-5">
			{error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
				{error}
				<button type="button" className="btn-close" onClick={() => setError(null)}/>
			</div>}
			{article && loggedIn && (article.user.username === loggedIn.username) && (
				<p className="mt-3 article-p">Want to edit article? - <Link to={`/edit-article/${id}`} className="text-decoration-none text-light">Edit</Link></p>
			)}
			{article && (
				<div className="card text-center shadow-lg rounded bg-light text-dark article-page-card">
					<Link to={`/users/${article.user.username}`} className="card-header text-decoration-none text-dark">
						{article.user.username}
					</Link>
					<div className="card-body">
						<h5 className="card-title">{article.title}</h5>
						<p className="card-text border-bottom pb-3">{article.text}</p>
						<p className="card-text mb-0">Author: </p>
						<p className="card-text mb-3 border-bottom pb-3">
							<span className="fst-italic">{article.user.email}</span>, <span className="fw-light">{`${article.user.first_name} ${article.user.last_name}`}</span>
						</p>
						<p className="card-text mb-0">Reviewer: </p>
						<p className="card-text mb-3 border-bottom pb-3">
							<span className="fst-italic">{article.moderator.email}</span>, <span className="fw-light">{`${article.moderator.first_name} ${article.moderator.last_name}`}</span>
						</p>
						<Link to="/" className="btn btn-info text-light fw-bold">Go to All Articles</Link>
					</div>
					<div className="card-footer text-muted">
						{article.date}
					</div>
					{article && loggedIn && (article.moderator.username === loggedIn.username) && (article.status === "pending") && (
						<div className="mt-0 btn-group">
							<button type="button" name="approved" onClick={handleReview} className="btn btn-success edit-btn">Approve</button>
							<button type="button" name="rejected" onClick={handleReview} className="btn btn-danger edit-btn">Reject</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

Article.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default Article;