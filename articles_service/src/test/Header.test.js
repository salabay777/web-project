import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "../Components/Header";

describe("Header component", () => {
	it("renders Header", () => {
		render (<Router><Header /></Router>);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("renders logo and home link", () => {
		render (<Router><Header /></Router>);
		expect(screen.getByAltText("Logo")).toBeInTheDocument();
		expect(screen.getByText("Home")).toBeInTheDocument();
	});

	it("renders log in link if user is not authenticated", () => {
		render (<Router><Header /></Router>);
		expect(screen.getByText("Log in")).toBeInTheDocument();
		const logout = screen.queryByText("Logout");
		expect(logout).not.toBeInTheDocument();
	});

	it("renders My Articles, Account and Logout links if user is authenticated", () => {
		render (<Router><Header loggedIn={{"username": "salabay777", "password": "123456"}} /></Router>);
		expect(screen.getByText("My Articles")).toBeInTheDocument();
		expect(screen.getByText("Account")).toBeInTheDocument();
		expect(screen.getByText("Logout")).toBeInTheDocument();
	});

	it("clicking logout removes user from localStorage", () => {
		render (<Router><Header loggedIn={{"username": "salabay777", "password": "123456"}} handleLogin={jest.fn} /></Router>);

		const logoutLink = screen.getByText("Logout");
		fireEvent.click(logoutLink);
	});
});