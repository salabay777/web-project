import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import Articles from "../Pages/Articles";

jest.mock("axios");

const data = {data: {articles: [
	{
		id: 1,
		title: "Title",
		text: "Text text text",
		author_username: "salabay777",
		moderator_id: 4,
		date: "2022-01-01",
		status_id: 2
	},
	{

		id: 2,
		title: "Title 2",
		text: "Text text text 2",
		author_username: "johndoe",
		moderator_id: 1,
		date: "2022-01-02",
		status_id: 2
	},
	{
		id: 3,
		title: "Title 3",
		text: "Text text text 3",
		author_username: "johndoe",
		moderator_id: 1,
		date: "2022-01-03",
		status_id: 2
	}
]}};
const searched_data = {data: {articles: [
	{
		d: 1,
		title: "Title",
		text: "Text text text",
		author_username: "salabay777",
		moderator_id: 4,
		date: "2022-01-01",
		status_id: 2
	}
]}};

describe("Articles page", () => {
	let location;
	const mockLocation = new URL("http://localhost:8089/api/v1/search?searchTerm=first");

	afterEach(() => {
		jest.clearAllMocks();
		window.location = location;
	});

	it("renders articles", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><Articles/></Router>);
		});

		expect(screen.getAllByRole("link")).toHaveLength(5);
		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/articles");
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it("renders searched articles", async () => {
		location = window.location;
		mockLocation.replace = jest.fn();
		delete window.location;
		window.location = mockLocation;

		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(searched_data));
			render(<Router><Articles/></Router>);
		});

		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/search?searchTerm=first");
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});
});
