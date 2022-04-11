import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import ApprovedArticle from "../Components/ApprovedArticle";

describe("ApprovedArticle component", () => {
	it("renders ApprovedArticle", () => {
		render (<Router><ApprovedArticle /></Router>);
		expect(screen.getByRole("link")).toBeInTheDocument();
	});
});