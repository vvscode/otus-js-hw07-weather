import mapImg from "../map.png";
import { fetchCoords } from "./geolocation";
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
  fillElements(el);

  const coords = await fetchCoords();
  if (!coords) {
    console.log("Не получены координаты");
    return;
  }

  const weather = await fetchCurrentWeatherByCoords(...coords);
  if (!weather) {
    console.log("Данные о погоде не получены");
    return;
  }

  console.log("Температура: " + getTemperature());
  // console.log(weather);
}

/**
 *
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
function fillElements(el) {
  el.innerHTML = `
  <span>
    <div class="panel-search">
      <input
        class="input-search"
        type="search"
        inputmode="latin"
        required
        placeholder="Moscow"
      />
      <button class="btn-search">Show</button>
    </div>
    <div>
      <span>
        <img class="city-map" src="${mapImg}" />
      </span>
      <span>
        <textarea class="weather-info">Weather info</textarea>
      </span>
    </div>
  </span>
  <span class="sidebar">
    <label class="history-label">HISTORY</label>
    <ul class="search-history">
      <li>Moscow</li>
      <li>Minsk</li>
      <li>London</li>
    </ul>
  </span>
  `;
}
