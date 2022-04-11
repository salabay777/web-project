import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import Article from "../Pages/Article";

jest.mock("axios");

const data = {data: {article: {
	article_id: 1,
	title: "Title 1",
	text: "Text text text",
	user: {
		username: "johndoe",
		first_name: "John",
		last_name: "Doe",
		email: "johndoe@gmail.com"
	},
	moderator: {
		username: "salabay777",
		first_name: "Bohdan",
		last_name: "Salabay",
		email: "salabay2003@gmail.com"
	},
	date: "2022-01-01",
	status: "pending"
}}}
const approved_data = {data: {article: {
	article_id: 1,
	title: "Title 1",
	text: "Text text text",
	user: {
		username: "johndoe",
		first_name: "John",
		last_name: "Doe",
		email: "johndoe@gmail.com"
	},
	moderator: {
		username: "salabay777",
		first_name: "Bohdan",
		last_name: "Salabay",
		email: "salabay2003@gmail.com"
	},
	date: "2022-01-01",
	status: "approved"
}}}

describe("Article page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders article with correct data", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><Article
				loggedIn={{username: "johndoe", password: "123456"}}
			/></Router>);
		});

		expect(screen.getByRole("heading")).toHaveTextContent(data.data.article.title);
		expect(screen.getAllByRole("link")[1]).toHaveTextContent(data.data.article.user.username);

		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/article/undefined");
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it("reviews article", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><Article
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		await axios.put.mockImplementationOnce(() => Promise.resolve(approved_data));

		const approveButton = screen.getByTestId("approve");
		fireEvent.click(approveButton);

		await expect(axios.put).toHaveBeenCalledWith("http://localhost:8089/api/v1/article/undefined", {status: "approved"}, {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: "salabay777",
				password: "123456"
			}
		});
		await expect(axios.put).toHaveBeenCalledTimes(1);
	});
});
