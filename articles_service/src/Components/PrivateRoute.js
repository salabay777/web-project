import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({loggedIn}) => {
	return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
	loggedIn: PropTypes.shape({
		username: PropTypes.string,
		password: PropTypes.string
	})
};

export default PrivateRoute;