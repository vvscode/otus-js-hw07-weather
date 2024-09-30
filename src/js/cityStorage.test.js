import CityStorage, {
  HISTORY_LIMIT_DEFAULT,
  HISTORY_LIMIT_MIN,
  HISTORY_STORAGE_KEY,
} from "./cityStorage";

describe("CityStorage", () => {
  const historyLimit = 5;
  let cityStorage;
  let data;

  beforeEach(() => {
    cityStorage = new CityStorage(historyLimit);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  });

  it("has default historyLimit value", () => {
    expect(new CityStorage().historyLimit).toBe(HISTORY_LIMIT_DEFAULT);
  });

  it("get historyLimit value from constructor", () => {
    expect(cityStorage.historyLimit).toBe(historyLimit);
    expect(new CityStorage(20).historyLimit).toBe(20);
    expect(new CityStorage(30).historyLimit).toBe(30);
  });

  it(`ignores historyLimit constructor parameter less than ${HISTORY_LIMIT_MIN}`, () => {
    expect(new CityStorage(1).historyLimit).toBe(HISTORY_LIMIT_DEFAULT);
    expect(new CityStorage(0).historyLimit).toBe(HISTORY_LIMIT_DEFAULT);
  });

  it("at first has empty data at localStorage", () => {
    data = cityStorage.restoreHistory();
    expect(data).toEqual([]);
  });

  it("add only city name to localStorage", () => {
    cityStorage.saveHistory("Moscow");
    data = cityStorage.restoreHistory();
    expect(data).toEqual(["Moscow"]);
  });

  it("add several city names to localStorage", () => {
    cityStorage.saveHistory("Moscow");
    cityStorage.saveHistory("Khabarovsk");
    cityStorage.saveHistory("Vladivostok");
    data = cityStorage.restoreHistory();
    expect(data).toEqual(["Moscow", "Khabarovsk", "Vladivostok"]);
  });

  it("run callback once if first city added", () => {
    const callback = jest.fn((name) => {});
    cityStorage.saveHistory("Vologda");
    expect(callback).toHaveBeenCalledTimes(0);

    cityStorage.restoreHistory(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("run callback twice if 2 cities added", () => {
    const callback = jest.fn((name) => {});
    cityStorage.saveHistory("Saint-Petersburg");
    cityStorage.saveHistory("Kaliningrad");
    expect(callback).toHaveBeenCalledTimes(0);

    cityStorage.restoreHistory(callback);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("moved existing city to tail of history list", () => {
    cityStorage.saveHistory("1");
    cityStorage.saveHistory("2");
    cityStorage.saveHistory("3");
    cityStorage.saveHistory("4");
    data = cityStorage.restoreHistory();
    expect(data).toEqual(["1", "2", "3", "4"]);

    cityStorage.saveHistory("2");
    data = cityStorage.restoreHistory();
    expect(data).toEqual(["1", "3", "4", "2"]);

    cityStorage.saveHistory("2");
    data = cityStorage.restoreHistory();
    expect(data).toEqual(["1", "3", "4", "2"]);
  });

  it(`contains maximum ${historyLimit} cities`, () => {
    let i;
    for (i = 0; i < historyLimit; i++) {
      cityStorage.saveHistory(i.toString());
    }
    data = cityStorage.restoreHistory();
    expect(data.length).toBe(historyLimit);

    const nexCity = (i + 1).toString();
    cityStorage.saveHistory(nexCity);
    data = cityStorage.restoreHistory();
    expect(data.length).toBe(historyLimit);
    expect(data[data.length - 1]).toBe(nexCity);
  });
});
