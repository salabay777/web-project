import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ApprovedArticle = article => {
	return(
		<Link className="card2 card3 col d-flex flex-column w-100" to={`/articles/${article.id}`}>
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
};

ApprovedArticle.propTypes = {
	article: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		text: PropTypes.string,
		author_username: PropTypes.string,
		date: PropTypes.string
	})
};

export default ApprovedArticle;