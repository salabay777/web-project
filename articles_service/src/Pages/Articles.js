import React, {useState, useEffect} from "react";
import axios from "axios";
import moment from "moment";

import "./Articles.css";
import {Link, useSearchParams} from "react-router-dom";
import ApprovedArticle from "../Components/ApprovedArticle";

const Articles = () => {
	const [searchParams, ] = useSearchParams();
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		if (searchParams.get("searchTerm")) {
			axios.get(`http://localhost:8089/api/v1/search?searchTerm=${searchParams.get("searchTerm")}`)
				.then(response => {
					setArticles(response.data.articles
						.filter(article => article.status === "approved")
						.map(a => ({
							...a,
							date: moment(a.date).format("dddd, MMMM Do YYYY")
						}))
					);
				})
				.catch(error => {
					console.log(error);
				});
		}
		else {
			axios.get("http://localhost:8089/api/v1/articles")
				.then(response => {
					setArticles(response.data.articles.map(article => ({
						...article,
						date: moment(article.date).format("dddd, MMMM Do YYYY")
					})));
				})
				.catch(error => {
					console.log(error.response.data);
				});
		}
	}, [searchParams.get("searchTerm")]);


	return (
		<>
			<div className="pt-5 mt-5">
				<p className="text-center text-light">Want to Write/Review an Article?</p>
				<div className="d-flex flex-row justify-content-center mb-5">
					<p className="btn-group">
						<Link to="/write-article" className="btn btn-light">Write Article</Link>
						<Link to="/review-articles" className="btn btn-secondary">Review Article</Link>
					</p>
				</div>
				{articles.length === 0 &&
					<h3 className="text-center text-light">There Are No Articles to Show...</h3>
				}
				{articles.length !== 0 &&
					<>
						<h3 className="text-center text-light mb-4">Recently Added Articles</h3>
						<div className="container-fluid">
							<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center">
								{articles.map(article => {
									return(
										<ApprovedArticle key={article.id} {...article} />
									);
								})}
							</div>
						</div>
					</>
				}
			</div>
		</>
	);
};

export default Articles;