import { fetchJson } from "./fetchUrl";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "3df013696c7d14e7d1aeff2b540ad15b";

let _weather;
let _url;

/**
 * Запрашивает объект с данными о текущей погоде по координатам места
 * @param {number} latitude - широта места в градусах
 * @param {number} longitude - долгота места в градусах
 */
export async function fetchCurrentWeatherByCoords(latitude, longitude) {
  _url = `${baseUrl}?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  _weather = await fetchJson(_url);
  return _weather;
}

/**
 * Запрашивает объект с данными о текущей погоде по названию города
 * @param {string} cityName - город
 */
export async function fetchCurrentWeatherByCityName(cityName) {
  _url = `${baseUrl}?units=metric&q=${cityName}&appid=${apiKey}`;
  _weather = await fetchJson(_url);
  return _weather;
}

/**
 * Извлекает значение температуры из объекта запрошенной погоды
 * @param {object} weather - Объект запрошенной погоды
 * @returns {number} - Значение в градусах Цельсия
 */
export function getTemperature(weather = _weather) {
  if (weather) return weather.main.temp;
}

/**
 * Возвращает координаты места из объекта запрошенной погоды
 * @param {object} weather - Объект запрошенной погоды
 * @returns {Array.<number>} - Массив [широта, долгота] в градусах
 */
export function getCoordinates(weather = _weather) {
  if (weather) return [weather.coord.lon, weather.coord.lat];
}
