import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TopBar from "../../src/components/TopBar"; // Replace "./TopBar" with the correct path to your TopBar component
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TopBar Component", () => {
  it("redirects to the selected URL when the Filter button is clicked", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });

    const { getByText, getByRole } = render(<TopBar />);
    const filterButton = getByText("Filter");

    const selectInput = getByRole("combobox");

    fireEvent.change(selectInput, { target: { value: "/tv250" } });
    fireEvent.click(filterButton);

    expect(mockPush).toHaveBeenCalledWith("/tv250");
  });

  it("redirects to the search URL when the Search button is clicked", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });

    const { getByText, getByPlaceholderText } = render(<TopBar />);
    const searchButton = getByText("Search");
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "example" } });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/search/example");
  });

  it("updates the selected value when the select input value is changed", () => {
    const { getByRole } = render(<TopBar />);
    const selectInput = getByRole("combobox");

    fireEvent.change(selectInput, { target: { value: "/tv250" } });

    expect(selectInput.value).toBe("/tv250");
  });
});
