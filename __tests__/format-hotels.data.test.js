import hotelsData from "../src/data/hotels.json";
import formatHotelsData from "../src/lib/format-hotels-data";

beforeEach(() => {
  global.structuredClone = jest.fn((obj) => JSON.parse(JSON.stringify(obj)));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("format hotels lib", () => {
  test("hotel item formatting produces object of type Hotel", () => {
    const hotels = formatHotelsData(hotelsData);
    expect(hotels).toMatchSnapshot();
  });

  test("formatting wrong result type as hotelData produces empty array", () => {
    const hotels = formatHotelsData({results: 10});
    expect(hotels).toEqual([]);
  });

  test("formatting a hotel with broken image link gives default image", () => {
    const cloned = global.structuredClone(hotelsData);
    cloned.results[0].property.previewImage.url = '!';
    const hotels = formatHotelsData(cloned);
    expect(hotels[0].image.src).toEqual("/blank.svg");
  });

  test("formatting a hotel with missing properties defaults gracefully", () => {
    const hotels = formatHotelsData({
      results: [
        {
          "property": {
            "previewImage": {
              "url": "https://unsplash.it/145/125/?random"
            },
            "rating": {
              "ratingType": "self"
            }
          },
          "offer": {
            "promotion": {
            },
            "displayPrice": {
              "currency": "AUD"
            },
            "savings": {
              "currency": "AUD"
            },
            "cancellationOption": {
              "cancellationType": "NOT_REFUNDABLE"
            }
          }
        }
      ]
    });
    expect(hotels).toMatchSnapshot();
  });
});