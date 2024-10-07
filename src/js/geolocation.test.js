import { fetchCoords, hasCoords, resetCoords } from "./geolocation";

describe("geolocation", () => {
  let expectedCoords;
  let expectedLocation;

  beforeEach(() => {
    expectedCoords = [50.1, 33.2];
    expectedLocation = {
      coords: {
        latitude: expectedCoords[0],
        longitude: expectedCoords[1],
      },
    };
    const mockGeolocation = {
      getCurrentPosition: jest
        .fn()
        .mockImplementationOnce((success) => success(expectedLocation)),
    };
    navigator.geolocation = mockGeolocation;
  });

  afterEach(() => {
    resetCoords();
  });

  it("returns array of 2 numbers (latitude and longitude)", async () => {
    const actualNav = await fetchCoords();
    expect(actualNav.length).toBe(2);
    expect(actualNav).toEqual(expectedCoords);
  });

  it("doesn't have coordinates values before fetch", async () => {
    expect(hasCoords()).toBeFalsy();
  });

  it("has saved coordinates after fetch", async () => {
    await fetchCoords();
    expect(hasCoords()).toBeTruthy();
  });
});
