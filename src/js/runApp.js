import { fetchCoords } from "./geolocation";
import { fetchMapImageByCoords } from "./mapsStaticApi";
import {
  fetchCurrentWeatherByCoords,
  fetchCurrentWeatherByCityName,
  getTemperature,
  getCoordinates,
} from "./weatherApi";

const CLASS_SEARCH_INPUT = "search-input";
const CLASS_SEARCH_BUTTON = "search-btn";
const CLASS_WEATHER_LOCATION = "weather-location";
const CLASS_WEATHER_INFO = "weather-info";
const CLASS_HISTORY_LIST = "history-list";

let searchInput, searchButton, weatherLocation, weatherInfo, historyList;

/**
 * Запуск приложения
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
export default async function runApp(el) {
  fillMarkUp(el);
  addListeners(el);

  const coords = await fetchCoords();
  const weather = await fetchCurrentWeatherByCoords(...coords);
  await showCurrentWeather(weather);
}

/**
 * Надувание разметки главной страницы
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
function fillMarkUp(el) {
  el.innerHTML = `
    <input
      class="${CLASS_SEARCH_INPUT}"
      type="search"
      inputmode="latin"
      required
      placeholder="Moscow"
    />
    <button class="${CLASS_SEARCH_BUTTON}">Show</button>
    <label class="history-label">HISTORY</label>
    <img class="weather-location" src="map.png" alt="current location" />
    <textarea
      class="${CLASS_WEATHER_INFO}"
      placeholder="Weather info"
      readonly
    ></textarea>
    <ul class="${CLASS_HISTORY_LIST}">
      <li><a href="#">Moscow</a></li>
      <li><a href="#">Minsk</a></li>
      <li><a href="#">London</a></li>
    </ul>
  `;
}

/**
 * Подписка элементов на события
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
function addListeners(el) {
  searchInput = el.querySelector("." + CLASS_SEARCH_INPUT);
  searchButton = el.querySelector("." + CLASS_SEARCH_BUTTON);
  weatherLocation = el.querySelector("." + CLASS_WEATHER_LOCATION);
  weatherInfo = el.querySelector("." + CLASS_WEATHER_INFO);
  historyList = el.querySelector("." + CLASS_HISTORY_LIST);

  searchButton.addEventListener("click", async (ev) => {
    const city = searchInput.value.trim().replace(/-+/, " ");
    if (!city) {
      alert("Необходимо ввести город на английском языке");
      return;
    }

    if (searchInput.value != city) searchInput.value = city;
    const weather = await fetchCurrentWeatherByCityName(city);
    await showCurrentWeather(weather);
    // ev.target.hidden = true;
  });
}

/**
 * Отображает на странице данные из принятого объекта погода
 * @param {object} weather - Принятый объект погода
 */
async function showCurrentWeather(weather) {
  if (!weather) {
    weatherInfo.value = "Данные не получены\nСервер не отвечает";
    return;
  }
  // console.log(weather);
  weatherInfo.value = "Температура: " + getTemperature();

  const mapSrc = await fetchMapImageByCoords(...getCoordinates(weather));
  weatherLocation.src = mapSrc;
}
