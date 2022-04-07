import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment";
import ArticlesList from "../Components/ArticlesList";

const ReviewArticles = ({loggedIn}) => {
	const navigate = useNavigate();
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:8089/api/v1/review-articles/${loggedIn.username}`, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(response => {
				setArticles(response.data.articles
					.filter(article => article.status === "pending")
					.map(a => ({...a, date: moment(a.date).format("dddd, MMMM Do YYYY")}))
				);
			})
			.catch(error => {
				if (error.response.status === 406) {
					navigate("/");
				}
				console.log(error.response.data);
			});
	}, []);


	return (
		<div
			className={`${
				articles.length === 0 &&
				"d-flex flex-column justify-content-center align-items-center msg"
			}`}
		>
			{articles.length === 0 &&
				<>
					<h3 className="text-light">There Are No Articles to Show...</h3>
					<Link to="/" className="btn btn-outline-light">Back to All Articles</Link>
				</>
			}
			<div className="container-fluid pt-5 mt-5">
				{articles.length > 0 &&
					<>
						<h3 className="text-light text-center mb-4">Articles Assigned to You</h3>
						<ArticlesList articles={articles} />
					</>
				}
			</div>
		</div>
	);
};

ReviewArticles.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default ReviewArticles;