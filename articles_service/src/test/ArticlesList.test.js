import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import ArticlesList from "../Components/ArticlesList";

describe("ArticlesList component", () => {
	it("renders ArticlesList", () => {
		render (<Router><ArticlesList
			articles={[
				{
					id: 1,
					title: "Title1",
					text: "Text text text",
					author_username: "salabay777",
					date: "2022-01-01"
				},
				{
					id: 2,
					title: "Title2",
					text: "Text text text",
					author_username: "johndoe",
					date: "2022-01-02"
				},
				{
					id: 3,
					title: "Title3",
					text: "Text text text",
					author_username: "johndoe",
					date: "2022-01-03"
				}
			]}
		/></Router>);
		expect(screen.getAllByRole("link")).toHaveLength(3);
	});
});