import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import TvDetails from "../../src/components/TvDetails";
import "@testing-library/jest-dom/extend-expect";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-query");
jest.mock("axios");

describe("TvDetails Component", () => {
  it("renders TV details and cast information correctly", async () => {
    const tvDetailsData = {
      name: "TV Title",
      first_air_date: "2023-07-31",
      vote_average: 8.7,
      overview: "This is the TV show overview.",
      created_by: [{ name: "Creator 1" }, { name: "Creator 2" }],
      genres: [{ name: "Drama" }, { name: "Mystery" }],
      poster_path: "/tv_poster.jpg",
    };

    const creditsData = {
      cast: [
        {
          name: "Actor 1",
          character: "Character 1",
          profile_path: "/actor1.jpg",
        },
        {
          name: "Actor 2",
          character: "Character 2",
          profile_path: "/actor2.jpg",
        },
      ],
    };

    useRouter.mockReturnValue({ query: { id: 1 } });

    useQuery.mockReturnValueOnce({
      isLoading: false,
      data: tvDetailsData,
    });

    useQuery.mockReturnValueOnce({
      isLoading: false,
      data: creditsData,
    });

    render(<TvDetails />);

    // Wait for the TV details and cast information to be rendered
    await waitFor(() => {
      const tvTitleElement = screen.getByText("TV Title");
      const createdByElement = screen.getByText(
        "Created By: Creator 1, Creator 2"
      );
      const genreElement = screen.getByText("Genre: Drama, Mystery");
      const castElement1 = screen.getByText("Actor 1");
      const castElement2 = screen.getByText("Actor 2");

      expect(tvTitleElement).toBeInTheDocument();
      expect(createdByElement).toBeInTheDocument();
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

    render(<TvDetails />);

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  it("displays error state when data fetching has errors", () => {
    useRouter.mockReturnValue({ query: { id: 1 } });

    useQuery.mockImplementation((key, fetchData) => {
      if (key[0] === "tv" && key[1] === 1) {
        return {
          isLoading: false,
          isError: true,
          error: { message: "Error fetching TV data" },
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

    render(<TvDetails />);

    const errorElement1 = screen.getByText("Error: Error fetching TV data");
    const errorElement2 = screen.getByText(
      "Error: Error fetching credits data"
    );
    expect(errorElement1).toBeInTheDocument();
    expect(errorElement2).toBeInTheDocument();
  });
});
