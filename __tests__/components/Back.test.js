import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Back from "../../src/components/Back";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
describe("Back Component", () => {
  it("calls router.back() when the button is clicked", () => {
    const mockBack = jest.fn();
    useRouter.mockReturnValue({
      back: mockBack,
    });

    const { getByRole } = render(<Back />);
    const backButton = getByRole("button");

    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalled();
  });
});
