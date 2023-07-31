import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for the custom jest-dom matchers

import Loading from "../../src/components/Loading";

describe("Loading component", () => {
  test("renders the loading spinner", () => {
    const { getByTestId } = render(<Loading />);
    const spinner = getByTestId("loading-spinner");

    expect(spinner).toBeInTheDocument();
  });
});
