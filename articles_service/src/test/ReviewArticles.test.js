import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import ReviewArticles from "../Pages/ReviewArticles";
import UserArticles from "../Pages/UserArticles";

jest.mock("axios");

const data = {data: {articles: [
	{
		id: 1,
		title: "Title 1",
		text: "Text text text",
		author_username: "johndoe",
		moderator_username: "salabay777",
		date: "2022-01-01",
		status: "pending"
	},
	{
		id: 1,
		title: "Title 2",
		text: "Text text 2",
		author_username: "johndoe",
		moderator_username: "salabay777",
		date: "2022-01-02",
		status: "pending"
	},
	{
		id: 1,
		title: "Title 3",
		text: "Text text 3",
		author_username: "johndoe",
		moderator_username: "salabay777",
		date: "2022-01-03",
		status: "pending"
	}
]}}

describe("ReviewArticles page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders articles to review", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><ReviewArticles
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		expect(screen.getAllByRole("link")).toHaveLength(3);
		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/review-articles/salabay777", {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: "salabay777",
				password: "123456"
			}
		});
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});
});
