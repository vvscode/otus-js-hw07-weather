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
  return await fetchJson(url);
}

/**
 * Запрашивает объект с данными о текущей погоде по названию города
 * @param {string} cityName - город
 */
export async function fetchCurrentWeatherByCityName(cityName) {
  const url = `${baseUrl}?units=metric&q=${cityName}&appid=${apiKey}`;
  return await fetchJson(url);
}

export function getTemperature() {
  if (weather) return weather.main.temp;
}

/**
 * Запрашивает объект с данными по выбранной ссылке
 * @param {string} url - Ссылка для GET-запроса
 * @returns - Объект данных формата json
 */
async function fetchJson(url) {
  try {
    const result = await fetch(url);
    if (result.ok) {
      weather = await result.json();
    }
  } catch (e) {
    console.log(e);
  }
  return weather;
}
