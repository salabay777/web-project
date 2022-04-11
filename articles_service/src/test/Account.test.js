import React from 'react';
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import Account from "../Pages/Account";

jest.mock("axios");

const data = {data: {username: "salabay777", first_name: "Bohdan", last_name: "Salabay", email: "salabay2003@gmail.com", role: "moderator"}};

describe("Account page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders Account and shows info", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><Account
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		expect(screen.getByTestId("account-card")).toBeInTheDocument();
		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/undefined");
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});
});
