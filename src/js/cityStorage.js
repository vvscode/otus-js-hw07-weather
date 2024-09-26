import { HISTORY_LIMIT } from "./runApp";

const HISTORY_STORAGE_KEY = "history";

let storageCityNames;

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
export function restoreHistoryFromStorage(callback) {
  storageCityNames =
    JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) ?? [];
  storageCityNames.forEach(callback);
}

/**
 * Сохранение города в локальном хранилище
 * @param {string} cityName - название города
 */
export function saveHistoryToStorage(cityName) {
  if (storageCityNames.includes(cityName)) {
    const index = storageCityNames.indexOf(cityName);
    storageCityNames.splice(index, 1);
    storageCityNames.push(cityName);
  } else {
    storageCityNames.push(cityName);
    if (storageCityNames.length > HISTORY_LIMIT) {
      storageCityNames = storageCityNames.slice(1);
    }
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(storageCityNames));
  }
}
