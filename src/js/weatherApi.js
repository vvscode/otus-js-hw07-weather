import { fetchJson } from "./fetchUrl";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "3df013696c7d14e7d1aeff2b540ad15b";

let weather;

/**
 * Запрашивает объект с данными о текущей погоде по координатам места
 * @param {number} latitude - широта места
 * @param {number} longitude - долгота места
 */
export async function fetchCurrentWeatherByCoords(latitude, longitude) {
  const url = `${baseUrl}?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  weather = await fetchJson(url);
  return weather;
}

/**
 * Запрашивает объект с данными о текущей погоде по названию города
 * @param {string} cityName - город
 */
export async function fetchCurrentWeatherByCityName(cityName) {
  const url = `${baseUrl}?units=metric&q=${cityName}&appid=${apiKey}`;
  weather = await fetchJson(url);
  return weather;
}

export function getTemperature() {
  if (weather) return weather.main.temp;
}
