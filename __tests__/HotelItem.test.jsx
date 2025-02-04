import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import HotelItem from "../src/app/components/hotel-item/HotelItem";
import hotelsData from "../src/data/hotels.json";
import formatHotelsData from "../src/lib/format-hotels-data";

jest.mock("../src/app/components/loader/PlaneLoader.js", () => jest.fn().mockImplementation(() => {}));

beforeEach(() => {
  global.structuredClone = jest.fn((obj) => JSON.parse(JSON.stringify(obj)));
  global.hotels = global.structuredClone(formatHotelsData(hotelsData));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("HotelItem", () => {
  const messages = require(`../messages/en.json`);

  it("renders a hotel item with savings unchanged", async () => {
    const hotel = global.hotels[0];
    hotel.rating = null;

    const { container } = render(
      <NextIntlClientProvider messages={messages} locale="en">
        <HotelItem hotel={hotel} />
      </NextIntlClientProvider>
    );
  
    expect(container).toMatchSnapshot();
  });

  it("renders a hotel item without savings unchanged", async () => {
    const hotel = global.hotels[2];
    hotel.rating = null;

    const { container } = render(
      <NextIntlClientProvider messages={messages} locale="en">
        <HotelItem hotel={hotel} />
      </NextIntlClientProvider>
    );
  
    expect(container).toMatchSnapshot();
  });
});