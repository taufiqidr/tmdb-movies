import React from "react";
import { render } from "@testing-library/react";
import { screen, getByText } from "@testing-library/dom";
import MovieCard from "../../src/components/MovieCard"; //
import "@testing-library/jest-dom/extend-expect";

describe("MovieCard Component", () => {
  it("renders correctly when poster_path is provided", () => {
    const id = 1;
    const title = "Sample Movie";
    const release_date = "2023-07-31";
    const poster_path = "/sample.jpg";

    render(
      <MovieCard
        id={id}
        title={title}
        release_date={release_date}
        poster_path={poster_path}
      />
    );

    const titleElement = screen.getByText(title);
    const releaseDateElement = screen.getByText("2023");
    const imageElement = screen.getByAltText(title);
    const linkElement = screen.getByRole("link");

    expect(titleElement).toBeInTheDocument();
    expect(releaseDateElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/movie/${id}`);
  });

  it("renders correctly when poster_path is not provided", () => {
    const id = 2;
    const title = "No Poster Movie";
    const release_date = "2023-08-01";

    render(<MovieCard id={id} title={title} release_date={release_date} />);

    const titleElement = screen.getByText(title);
    const releaseDateElement = screen.getByText("2023");
    const imageElement = screen.queryByAltText(title); // Use queryByAltText as image may not be present
    const linkElement = screen.getByRole("link");

    expect(titleElement).toBeInTheDocument();
    expect(releaseDateElement).toBeInTheDocument();
    expect(imageElement).not.toBeInTheDocument(); // Image should not be present
    expect(linkElement).toHaveAttribute("href", `/movie/${id}`);
  });
});
