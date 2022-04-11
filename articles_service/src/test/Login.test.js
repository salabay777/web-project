import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Login from "../Pages/Login";
import {act} from "react-dom/test-utils";
import axios from "axios";

jest.mock("axios");

const data = {data: "Successful login!"};

describe("Login page", () => {
	it("renders Login with form", () => {
		render(<Router><Login handleLogin={jest.fn} /></Router>);
		expect(screen.getByRole("form")).toBeInTheDocument();
	});

	it("logs user in", async () => {
		await act(async () => {
			await axios.post.mockImplementationOnce(() => Promise.resolve(data));
			render (<Router><Login
				handleLogin={jest.fn}
			/></Router>);
		});

		const submitBtn = screen.getByRole("form").querySelector("button");
		fireEvent.click(submitBtn);

		await expect(axios.post).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/login", {"password": "", "username": ""});
		await expect(axios.post).toHaveBeenCalledTimes(1);
	});
});
