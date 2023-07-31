import React from "react";
import { render, screen } from "@testing-library/react";
import { useQuery } from "react-query";
import TvsList from "../../src/components/TvList";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-query");

describe("TvsList Component", () => {
  it("renders TV cards when data is fetched and displayed correctly", async () => {
    // Dummy TV data
    const tvsData = [
      {
        id: 1,
        name: "TV Show 1",
        first_air_date: "2023-07-31",
        poster_path: "/poster1.jpg",
      },
      {
        id: 2,
        name: "TV Show 2",
        first_air_date: "2023-08-01",
        poster_path: "/poster2.jpg",
      },
    ];

    // Mock the "tvs" query
    useQuery.mockReturnValue({
      isLoading: false,
      data: tvsData,
    });

    render(<TvsList title="TV Shows" endpoint="/tv/popular" />);

    // Check if TV cards are rendered with the correct names
    const tvShow1Element = screen.getByText("TV Show 1");
    const tvShow2Element = screen.getByText("TV Show 2");

    expect(tvShow1Element).toBeInTheDocument();
    expect(tvShow2Element).toBeInTheDocument();
  });

  it("displays loading state when data is being fetched", () => {
    // Mock the "tvs" query with loading state
    useQuery.mockReturnValue({
      isLoading: true,
    });

    render(<TvsList title="TV Shows" endpoint="/tv/popular" />);

    const loadingElement = screen.getByTestId("loading-spinner");
    expect(loadingElement).toBeInTheDocument();
  });

  it("displays error state when data fetching has errors", () => {
    // Mock the "tvs" query with error state
    useQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Error fetching TV data" },
    });

    render(<TvsList title="TV Shows" endpoint="/tv/popular" />);

    const errorElement = screen.getByText("Error: Error fetching TV data");
    expect(errorElement).toBeInTheDocument();
  });
});
