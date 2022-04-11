import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";

describe("App", () => {
	it("renders navbar", () => {
		render(<App />);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});
});

