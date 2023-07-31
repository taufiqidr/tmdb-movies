import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import Details from "../../src/components/Details";
import "@testing-library/jest-dom/extend-expect";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-query");
jest.mock("axios");

describe("Details Component", () => {
  it("renders movie details and cast information correctly", async () => {
    const movieDetailsData = {
      id: 1,
      title: "Movie 1",
      release_date: "2023-07-31",
      poster_path: "/poster1.jpg",
      vote_average: 8.5,
      runtime: 150,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
      ],
      overview: "This is a movie overview.",
    };

    const creditsData = {
      cast: [
        {
          name: "Actor 1",
          character: "Character 1",
          profile_path: "/profile1.jpg",
        },
        {
          name: "Actor 2",
          character: "Character 2",
          profile_path: "/profile2.jpg",
        },
      ],
      crew: [{ job: "Director", name: "Director 1" }],
    };

    useRouter.mockReturnValue({ query: { id: 1 } });

    useQuery.mockImplementation((key, fetchData) => {
      if (key[0] === "movie") {
        return {
          isLoading: false,
          data: movieDetailsData,
        };
      } else if (key[0] === "credits") {
        return {
          isLoading: false,
          data: creditsData,
        };
      }
    });

    render(<Details />);

    // Wait for the movie details and cast information to be rendered
    await waitFor(() => {
      const movieTitleElement = screen.getByText("Movie 1");
      const directorElement = screen.getByText("Director: Director 1");
      const genreElement = screen.getByText("Genre: Action, Adventure");
      const castElement1 = screen.getByText("Actor 1");
      const castElement2 = screen.getByText("Actor 2");

      expect(movieTitleElement).toBeInTheDocument();
      expect(directorElement).toBeInTheDocument();
      expect(genreElement).toBeInTheDocument();
      expect(castElement1).toBeInTheDocument();
      expect(castElement2).toBeInTheDocument();
    });
  });

  it("displays loading state when data is being fetched", () => {
    useRouter.mockReturnValue({ query: { id: 1 } });

    useQuery.mockReturnValue({
      isLoading: true,
    });

    render(<Details />);

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  it("displays error state when data fetching has errors", () => {
    useRouter.mockReturnValue({ query: { id: 1 } });

    useQuery.mockImplementation((key, fetchData) => {
      if (key[0] === "movie" && key[1] === 1) {
        return {
          isLoading: false,
          isError: true,
          error: { message: "Error fetching movie data" },
        };
      }

      if (key[0] === "credits" && key[1] === 1) {
        return {
          isLoading: false,
          isError: true,
          error: { message: "Error fetching credits data" },
        };
      }
    });

    render(<Details />);

    const errorElement1 = screen.getByText("Error: Error fetching movie data");
    const errorElement2 = screen.getByText(
      "Error: Error fetching credits data"
    );
    expect(errorElement1).toBeInTheDocument();
    expect(errorElement2).toBeInTheDocument();
  });
});
