import { fetchCoords } from "./geolocation";
import { fetchMapImageByCoords } from "./mapsStaticApi";
import {
  fetchCurrentWeatherByCoords,
  fetchCurrentWeatherByCityName,
  getTemperature,
} from "./weatherApi";

/**
 * Запуск приложения
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
export default async function runApp(el) {
  const coords = await fetchCoords();

  const mapSrc = await fetchMapImageByCoords(...coords);

  fillElements(el, mapSrc);

  const weather = await fetchCurrentWeatherByCoords(...coords);
  if (!weather) {
    console.log("Данные о погоде не получены");
    return;
  }

  console.log("Температура: " + getTemperature());
}

/**
 *
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
function fillElements(el, mapSrc) {
  el.innerHTML = `
    <input
      class="search-input"
      type="search"
      inputmode="latin"
      required
      placeholder="Moscow"
    />
    <button class="search-btn">Show</button>
    <label class="history-label">HISTORY</label>
    <img class="weather-location" src="${mapSrc}" />
    <textarea
      class="weather-info"
      placeholder="Weather info"
      readonly
    ></textarea>
    <ul class="history-list">
      <li><a href="#">Moscow</a></li>
      <li><a href="#">Minsk</a></li>
      <li><a href="#">London</a></li>
    </ul>
  `;
}
