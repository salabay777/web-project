import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

import "./UserArticles.css";
import ArticlesList from "../Components/ArticlesList";

const UserArticles = ({loggedIn}) => {
	const [approvedArticles, setApprovedArticles] = useState([]);
	const [pendingArticles, setPendingArticles] = useState([]);
	const [rejectedArticles, setRejectedArticles] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/user-articles/${loggedIn.username}`)
			.then(response => {
				setApprovedArticles(
					response.data.articles
						.filter(article => article.status === "approved")
						.map(
							article => ({
								...article,
								date: moment(article.date).format("dddd, MMMM Do YYYY")
							})
						)
				);
				setPendingArticles(
					response.data.articles
						.filter(article => article.status === "pending")
						.map(
							article => ({
								...article,
								date: moment(article.date).format("dddd, MMMM Do YYYY")
							})
						)
				);
				setRejectedArticles(
					response.data.articles
						.filter(article => article.status === "rejected")
						.map(
							article => ({
								...article,
								date: moment(article.date).format("dddd, MMMM Do YYYY")
							})
						)
				);
			})
			.catch(error => {
				console.log(error.response.data);
			});
	}, []);

	return (
		<div
			className={`${
				approvedArticles.length === 0 && 
				pendingArticles.length === 0 && 
				rejectedArticles.length === 0 &&
				"d-flex flex-column justify-content-center align-items-center msg"
			}`}
		>
			{approvedArticles.length === 0 && pendingArticles.length === 0 && rejectedArticles.length === 0 &&
				<>
					<h3 className="text-light">There Are No Articles to Show...</h3>
					 <Link to="/write-article" className="btn btn-outline-light">Write Article</Link>
				</>
			}
			<div className="container-fluid pt-5 mt-5">
				{approvedArticles.length > 0 &&
					<>
						<h3 className="text-success text-center">Approved Articles</h3>
						<ArticlesList articles={approvedArticles} />
					</>
				}
				{pendingArticles. length > 0 &&
					<>
						<h3 className="text-warning text-center mt-4">Articles Under Review</h3>
						<ArticlesList articles={pendingArticles} />
					</>
				}
				{rejectedArticles.length > 0 &&
					<>
						<h3 className="text-danger text-center mt-4">Rejected Articles</h3>
						<ArticlesList articles={rejectedArticles} />
					</>
				}
			</div>
		</div>
	);
};

UserArticles.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default UserArticles;