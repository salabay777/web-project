import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import axios from 'axios';
import FormSelect from "../Components/FormSelect";
import {act} from "react-dom/test-utils";

jest.mock("axios");

const data = {data: {moderators: [{username: "wrld999"}]}};
const error = {response: {data: "There are no moderators available."}}

describe("FormSelect component", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders FormSelect and fetches moderators", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.resolve(data));
			render (<FormSelect
				loggedIn={{username: "salabay777", password: "123456"}}
				formData={{moderator: ""}}
				handleChange={jest.fn}
				setError={jest.fn}
				setFormData={jest.fn}
			/>);
		});

		const select = screen.getByRole("combobox");

		expect(select).toBeInTheDocument();
		expect(select.querySelectorAll("option")).toHaveLength(1);
		expect(select.querySelector("option")).toHaveTextContent(data.data.moderators[0].username);
		await expect(axios.get).toHaveBeenCalledWith("http://localhost:8089/api/v1/moderators",  {
			"auth": {"password": "123456", "username": "salabay777"},
			"headers": {"Content-Type": "application/json"}
		});
		await expect(axios.get).toHaveBeenCalledTimes(1);
	});

	it("returns error if there are no moderators", async () => {
		await act(async () => {
			await axios.get.mockImplementationOnce(() => Promise.reject(error));
			render (<FormSelect
				loggedIn={{username: "salabay777", password: "123456"}}
				formData={{moderator: ""}}
				handleChange={jest.fn}
				setError={jest.fn}
				setFormData={jest.fn}
			/>);
		});

		const select = screen.getByRole("combobox");

		expect(select.querySelectorAll("option")).toHaveLength(0);
	});
});
