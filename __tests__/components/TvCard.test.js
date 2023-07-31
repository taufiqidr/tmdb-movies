import React from "react";
import { render, screen } from "@testing-library/react";
import TvCard from "../../src/components/TvCard";
import "@testing-library/jest-dom/extend-expect";

describe("TvCard Component", () => {
  it("renders correctly when poster_path is provided", () => {
    const id = 1;
    const name = "Sample TV Show";
    const first_air_date = "2023-07-31";
    const poster_path = "/sample.jpg";

    render(
      <TvCard
        id={id}
        name={name}
        first_air_date={first_air_date}
        poster_path={poster_path}
      />
    );

    const nameElement = screen.getByText(name);
    const firstAirDateElement = screen.getByText("2023");
    const imageElement = screen.getByAltText(name);
    const linkElement = screen.getByRole("link");

    expect(nameElement).toBeInTheDocument();
    expect(firstAirDateElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/tv/${id}`);
  });

  it("renders correctly when poster_path is not provided", () => {
    const id = 2;
    const name = "No Poster TV Show";
    const first_air_date = "2023-08-01";

    render(<TvCard id={id} name={name} first_air_date={first_air_date} />);

    const nameElement = screen.getByText(name);
    const firstAirDateElement = screen.getByText("2023");
    const imageElement = screen.queryByAltText(name); // Use queryByAltText as image may not be present
    const linkElement = screen.getByRole("link");

    expect(nameElement).toBeInTheDocument();
    expect(firstAirDateElement).toBeInTheDocument();
    expect(imageElement).not.toBeInTheDocument(); // Image should not be present
    expect(linkElement).toHaveAttribute("href", `/tv/${id}`);
  });
});
