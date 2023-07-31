import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "react-query";
import SearchResult from "../../src/components/SearchResult";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-query");

describe("SearchResult Component", () => {
  it("renders movie cards when data is fetched and displayed correctly", async () => {
    // Dummy movie data
    const moviesData = [
      {
        id: 1,
        title: "Movie 1",
        release_date: "2023-07-31",
        poster_path: "/poster1.jpg",
      },
      {
        id: 2,
        title: "Movie 2",
        release_date: "2023-08-01",
        poster_path: "/poster2.jpg",
      },
    ];

    // Mock the "movies" query
    useQuery.mockReturnValue({
      isLoading: false,
      data: moviesData,
    });

    render(<SearchResult title="Search Results" keyword="Action" />);

    // Check if movie cards are rendered with the correct titles
    const movie1Element = screen.getByText("Movie 1");
    const movie2Element = screen.getByText("Movie 2");

    expect(movie1Element).toBeInTheDocument();
    expect(movie2Element).toBeInTheDocument();
  });

  it("displays loading state when data is being fetched", () => {
    // Mock the "movies" query with loading state
    useQuery.mockReturnValue({
      isLoading: true,
    });

    render(<SearchResult title="Search Results" keyword="Action" />);

    const loadingElement = screen.getByTestId("loading-spinner");
    expect(loadingElement).toBeInTheDocument();
  });

  it("displays error state when data fetching has errors", () => {
    // Mock the "movies" query with error state
    useQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Error fetching movie data" },
    });

    render(<SearchResult title="Search Results" keyword="Action" />);

    const errorElement = screen.getByText("Error: Error fetching movie data");
    expect(errorElement).toBeInTheDocument();
  });

  it("displays a message when there are no search results", () => {
    // Mock the "movies" query with empty data
    useQuery.mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<SearchResult title="Search Results" keyword="Action" />);

    const noResultElement = screen.getByText("No Result for Action");
    expect(noResultElement).toBeInTheDocument();
  });
});
