import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Layout from "../../src/components/Layout";
// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("Layout Component", () => {
  it("renders the TopBar component", () => {
    const { getByRole } = render(<Layout />);
    const topBar = getByRole("navigation");

    expect(topBar).toBeInTheDocument();
  });
});
