import React from "react";
import { render } from "@testing-library/react";
import Cast from "../../src/components/Cast";
import "@testing-library/jest-dom/extend-expect";

describe("Cast Component", () => {
  it("renders correctly when profile_path is provided", () => {
    const name = "John Doe";
    const character = "Main Character";
    const profile_path = "/example.jpg";

    const { getByText, getByAltText } = render(
      <Cast name={name} character={character} profile_path={profile_path} />
    );

    const nameElement = getByText(name);
    const characterElement = getByText(character);
    const imageElement = getByAltText(name);

    expect(nameElement).toBeInTheDocument();
    expect(characterElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${profile_path}`
    );
  });

  it("renders correctly when profile_path is not provided", () => {
    const name = "John Doe";
    const character = "Main Character";

    const { getByText, queryByAltText } = render(
      <Cast name={name} character={character} />
    );

    const nameElement = getByText(name);
    const characterElement = getByText(character);
    const imageElement = queryByAltText(name);

    expect(nameElement).toBeInTheDocument();
    expect(characterElement).toBeInTheDocument();
    expect(imageElement).not.toBeInTheDocument();
  });
});
