import { fetchJson, isAbsoluteURL } from "./fetchUrl";
import { weather } from "./weatherApi.json";

describe("fetchJson", () => {
  it("call fetch function at ones", async () => {
    const mockFetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(weather));

    const originalFetch = window.fetch;
    window.fetch = mockFetch;

    expect(mockFetch).toHaveBeenCalledTimes(0);
    const result = await fetchJson("src/js/weatherApi.test.json");
    // expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);

    window.fetch = originalFetch;
  });

  //   it("ывыав", async () => {
  //     const mockFetch = jest
  //       .fn()
  //       .mockImplementation(() => Promise.reject("fail"));
  //     fetch = mockFetch;

  //     const result = await fetchJson("src/js/weatherApi2.test.json");
  //     expect(result).toBeUndefined();
  //   });

  it("isAbsoluteURL function returns true for absolute URL", () => {
    expect(isAbsoluteURL("src/js/weatherApi.test.json")).toBeFalsy();
  });

  it("isAbsoluteURL function returns false for absolute URL", () => {
    expect(isAbsoluteURL("http://weatherApi.com")).toBeTruthy();
  });
});
