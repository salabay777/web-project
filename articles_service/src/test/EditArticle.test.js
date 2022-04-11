import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import EditArticle from "../Pages/EditArticle";

jest.mock("axios");

const data = {data: {article: {
	article_id: 1,
	title: "Title",
	text: "Text text text",
	user_id: 1,
	moderator_id: 2,
	date: "2022-01-01",
	status_id: 1
}}};
const changed_data = {data: {article: {
			article_id: 1,
			title: "Title2",
			text: "Text text text2",
			user_id: 1,
			moderator_id: 2,
			date: "2022-01-01",
			status_id: 1
}}};
const deleted_data = {data: "Article was deleted."}

describe("EditArticle page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders EditArticle and shows filled inputs", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><EditArticle
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		expect(screen.getAllByRole("textbox")[0]).toHaveValue(data.data.article.title);
		expect(screen.getAllByRole("textbox")[1]).toHaveValue(data.data.article.text);

		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/article/undefined");
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it("updates article", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><EditArticle
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		await axios.put.mockImplementationOnce(() => Promise.resolve(changed_data));

		const editButton = screen.getByTestId("edit");
		fireEvent.click(editButton);

		expect(screen.getAllByRole("textbox")[0]).toHaveValue(data.data.article.title);
		expect(screen.getAllByRole("textbox")[1]).toHaveValue(data.data.article.text);
	});

	it("deletes user", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><EditArticle
				loggedIn={{username: "salabay777", password: "123456"}}
			/></Router>);
		});

		await axios.delete.mockImplementationOnce(() => Promise.resolve(deleted_data));

		const deleteButton = screen.getByTestId("delete");
		fireEvent.click(deleteButton);

		await expect(axios.delete).toHaveBeenCalledWith("http://localhost:8089/api/v1/article/undefined", {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: "salabay777",
				password: "123456"
			}
		});
		await expect(axios.delete).toHaveBeenCalledTimes(1);
	});
});
