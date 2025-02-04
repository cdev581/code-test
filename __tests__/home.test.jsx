import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Home from "../src/app/page";
import hotelsData from "../src/data/hotels.json";

jest.mock("../src/app/components/loader/PlaneLoader.js", () => jest.fn().mockImplementation(() => {}));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(hotelsData),
    })
  )
});

afterEach(() => {
  jest.restoreAllMocks() // Clean up after each test
});

describe("Home", () => {
  const messages = require(`../messages/en.json`);
 
  it("renders homepage unchanged", async () => {
    const { container } = render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Home />
      </NextIntlClientProvider>
    );
  
    await waitFor(() => 
      expect(container).toMatchSnapshot()
    );
  });

  it("renders a heading", async () => {
    const { container } = render(
      <NextIntlClientProvider messages={messages} locale="en">
        <Home />
      </NextIntlClientProvider>
    );
 
    const heading = screen.getByRole("heading", { level: 1 });
 
    await waitFor(() => 
      expect(heading).toBeInTheDocument()
    )
  });
});