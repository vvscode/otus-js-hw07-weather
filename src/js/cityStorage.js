export const HISTORY_STORAGE_KEY = "history";
export const HISTORY_LIMIT_DEFAULT = 10;
export const HISTORY_LIMIT_MIN = 3;

/**
 * Хранилище истории просмотренных городов
 */
export default class CityStorage {
  /**
   *
   * @param {number} historyLimit - Максимальное количество записей в хранилище
   */
  constructor(historyLimit = HISTORY_LIMIT_DEFAULT) {
    if (historyLimit < HISTORY_LIMIT_MIN) {
      this.historyLimit = HISTORY_LIMIT_DEFAULT;
    } else {
      this.historyLimit = historyLimit;
    }
    this.storageCityNames = [];
  }

  /**
   * Отрисовка элементов с городами, выгруженных из локального хранилища
   * @callback drawCityCallback
   * @param {string} - название города
   * @returns {void}
   */

  /**
   * Считывание истории городов из локального хранилища
   * @param {drawCityCallback} callback
   */
  restoreHistory(callback) {
    this.storageCityNames =
      JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) ?? [];
    if (callback) {
      this.storageCityNames.forEach(callback);
    }
    return this.storageCityNames;
  }

  /**
   * Сохранение города в локальном хранилище
   * @param {string} cityName - название города
   */
  saveHistory(cityName) {
    if (this.storageCityNames.includes(cityName)) {
      const index = this.storageCityNames.indexOf(cityName);
      this.storageCityNames.splice(index, 1);
      this.storageCityNames.push(cityName);
    } else {
      this.storageCityNames.push(cityName);
      if (this.storageCityNames.length > this.historyLimit) {
        this.storageCityNames = this.storageCityNames.slice(1);
      }
    }
    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(this.storageCityNames)
    );
  }
}
