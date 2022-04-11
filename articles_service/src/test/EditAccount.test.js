import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import axios from "axios";
import EditAccount from "../Pages/EditAccount";

jest.mock("axios");

const data = {data: {user: {
	username: "salabay777",
	first_name: "Bohdan",
	last_name: "Salabay",
	email: "salabay2003@gmail.com",
	role: "moderator"
}}};

const changed_data = {data: {user: {
	username: "salabay776",
	first_name: "Bohdan",
	last_name: "Salabay",
	email: "salabay776@gmail.com",
	role: "moderator"
}}};

const deleted_data = {data: "User was deleted."};

describe("EditAccount page", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders EditAccount and shows filled inputs", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><EditAccount
				loggedIn={{username: "salabay777", password: "123456"}}
				setLogin={jest.fn}
				setLogout={jest.fn}
			/></Router>);
		});

		const inputs = screen.getByRole("form").querySelectorAll("input");
		expect(inputs).toHaveLength(6);
		expect(screen.getAllByRole("textbox")[0]).toHaveValue(data.data.first_name);
		expect(screen.getAllByRole("textbox")[1]).toHaveValue(data.data.last_name);
		expect(screen.getAllByRole("textbox")[2]).toHaveValue(data.data.username);
		expect(screen.getAllByRole("textbox")[3]).toHaveValue(data.data.email);

		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/salabay777", {
			"auth": {"password": "123456", "username": "salabay777"},
			"headers": {"Content-Type": "application/json"}
		});
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it("updates user", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><EditAccount
				loggedIn={{username: "salabay777", password: "123456"}}
				setLogin={jest.fn}
				setLogout={jest.fn}
			/></Router>);
		});

		await axios.put.mockImplementationOnce(() => Promise.resolve(changed_data));

		const editButton = screen.getByTestId("edit");
		fireEvent.click(editButton);

		const inputs = screen.getByRole("form").querySelectorAll("input");
		expect(inputs).toHaveLength(6);
		expect(screen.getAllByRole("textbox")[0]).toHaveValue(changed_data.data.first_name);
		expect(screen.getAllByRole("textbox")[1]).toHaveValue(changed_data.data.last_name);
		expect(screen.getAllByRole("textbox")[2]).toHaveValue(changed_data.data.username);
		expect(screen.getAllByRole("textbox")[3]).toHaveValue(changed_data.data.email);
	});

	it("deletes user", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render(<Router><EditAccount
				loggedIn={{username: "salabay777", password: "123456"}}
				setLogin={jest.fn}
				setLogout={jest.fn}
			/></Router>);
		});

		await axios.delete.mockImplementationOnce(() => Promise.resolve(deleted_data));

		const deleteButton = screen.getByTestId("delete");
		fireEvent.click(deleteButton);

		await expect(axios.delete).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/salabay777", {
			headers: { "Content-Type": "application/json" },
			auth: {
				username: "salabay777",
				password: "123456"
			}
		});
		await expect(axios.delete).toHaveBeenCalledTimes(1);
	});
});
