import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import WriteArticle from "../Pages/WriteArticle";

jest.mock("axios");

const data = {data: {moderators: [{username: "wrld999"}]}};
const data2 = {data: "New article was successfully created!"}

describe("WriteArticle page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders WriteArticle", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><WriteArticle
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		expect(screen.getByRole("form")).toBeInTheDocument();
	});

	it("creates new article", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><WriteArticle
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		await axios.post.mockImplementationOnce(() => Promise.resolve(data2));

		const submitButton = screen.getByRole("button");
		fireEvent.click(submitButton);
	});
});
