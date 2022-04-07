import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ArticlesList = ({articles}) => {
	return (
		<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center">
			{articles.map(article => {
				return (
					<Link className="card1 col d-flex flex-column w-100" key={article.id} to={`/articles/${article.id}`}>
						<h3 className="card-title pb-2 mb-2">{article.title}</h3>
						<p>{article.text}</p>
						<p className="small mb-0 mt-auto">{article.author_username}</p>
						<p className="small">{article.date}</p>

						<div className="go-corner">
							<div className="go-arrow">
								→
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

ArticlesList.propTypes = {
	articles: PropTypes.array
};

export default ArticlesList;