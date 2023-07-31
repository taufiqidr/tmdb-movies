import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "react-query";
import MoviesList from "../../src/components/MoviesList";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-query");

describe("MoviesList Component", () => {
  it("renders loading when data is loading", () => {
    useQuery.mockReturnValue({
      isLoading: true,
    });

    render(<MoviesList title="Popular Movies" endpoint="/popular" />);

    const loadingElement = screen.getByTestId("loading-spinner");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders error when an error occurs", () => {
    const errorMessage = "Failed to fetch data.";
    useQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });

    render(<MoviesList title="Popular Movies" endpoint="/popular" />);

    const errorElement = screen.getByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders movie cards when data is fetched and displayed correctly", async () => {
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
    useQuery.mockReturnValue({
      isLoading: false,
      data: moviesData,
    });

    render(<MoviesList title="Popular Movies" endpoint="/movie/popular" />);

    const movie1Element = screen.getByText("Movie 1");
    const movie2Element = screen.getByText("Movie 2");

    expect(movie1Element).toBeInTheDocument();
    expect(movie2Element).toBeInTheDocument();
  });

  it("renders 'No movies found.' message when no movies are fetched", () => {
    useQuery.mockReturnValue({
      isLoading: false,
      data: { results: [] },
    });

    render(<MoviesList title="Popular Movies" endpoint="/popular" />);

    const noMoviesFoundElement = screen.getByText("No movies found.");
    expect(noMoviesFoundElement).toBeInTheDocument();
  });
});
