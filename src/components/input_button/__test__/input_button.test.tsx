import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { render, screen, cleanup, within } from "@testing-library/react";
import InputButton from "../input_button";

beforeEach(() => cleanup());

test("button includes correct text", () => {
  render(
    <BrowserRouter>
      <InputButton text='TEST' />
    </BrowserRouter>
  );
  const e = screen.getByTestId("input-button");
  expect(e).toBeInTheDocument();
});

test("button should be disabled", () => {
  render(
    <BrowserRouter>
      <InputButton text='TEST' disabled={true} />
    </BrowserRouter>
  );
  const e = screen.getByTestId("input-button");
  const button = within(e).getByRole("button");
  expect(button).toBeDisabled();
});

test("button should has primary class", () => {
  render(
    <BrowserRouter>
      <InputButton text='TEST' primary={true} />
    </BrowserRouter>
  );
  const e = screen.getByTestId("input-button");
  const button = within(e).getByRole("button");
  expect(button).toHaveClass("primary");
});

test("button should be linked", () => {
  render(
    <BrowserRouter>
      <InputButton text='TEST' href='/somewhere' />
    </BrowserRouter>
  );
  const e = screen.getByTestId("input-button");
  expect(e).toHaveAttribute("href", "/somewhere");
});

test("Should match by last snapshoot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <InputButton text='TEST' />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
