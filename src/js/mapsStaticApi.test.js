import { mapImg, baseUrl, fetchMapImageByCoords } from "./mapsStaticApi";

describe("mapsStaticApi", () => {
  it("returns url from external API if longitude and latitude were set", () => {
    const url = fetchMapImageByCoords(20, 30);
    expect(url.startsWith(baseUrl)).toBeTruthy();
  });

  it("returns url with API key if longitude and latitude were set", () => {
    const url = fetchMapImageByCoords(10, 20);
    expect(url.includes("key")).toBeTruthy();
  });

  it("returns default url if longitude and latitude were not set", () => {
    expect(fetchMapImageByCoords()).toBe(mapImg);
  });
});
