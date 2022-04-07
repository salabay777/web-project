import React, {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

const FormSelect = ({loggedIn, formData, handleChange, setError, setFormData}) => {
	const [moderators, setModerators] = useState();

	useEffect(() => {
		axios.get("http://localhost:8089/api/v1/moderators", {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: loggedIn.username,
				password: loggedIn.password
			}
		})
			.then(response => {
				setModerators(response.data.moderators.filter(m => m.username !== loggedIn.username));
				setFormData({...formData, moderator: response.data.moderators.filter(m => m.username !== loggedIn.username)[0].username});
				setError(null);
			})
			.catch(error => {
				setError(error.response.data);
			});
	}, []);

	return (
		<div className="form-floating mb-5">
			<select
				className="form-select form-input"
				id="floatingSelect"
				name="moderator"
				value={formData.moderator}
				onChange={handleChange}
			>
				{moderators && moderators.map(moderator => {
					return (
						<option
							key={moderator.username}
							value={moderator.username}
						>{moderator.username}</option>
					);
				})}
			</select>
			<label htmlFor="floatingSelect">Choose moderator</label>
		</div>
	);
};

FormSelect.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	}),
	formData: PropTypes.shape({
		title: PropTypes.string,
		text: PropTypes.string,
		moderator: PropTypes.string
	}),
	handleChange: PropTypes.func,
	setFormData: PropTypes.func,
	setError: PropTypes.func
};

export default FormSelect;