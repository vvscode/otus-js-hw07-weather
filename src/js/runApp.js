import CityStorage from "./cityStorage";
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
const CLASS_HISTORY_CITY = "history-city";

export const HISTORY_LIMIT = 10;

let root;
let searchInput, searchButton, weatherLocation, weatherInfo, cityList;

let cityStorage;

/**
 * Запуск приложения
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
export default async function runApp(el) {
  root = el;

  fillMarkUp(el);
  addListeners(el);

  cityStorage = new CityStorage(HISTORY_LIMIT);
  cityStorage.restoreHistory(addCityToHistory);

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
    <img class="weather-location" src="./images/map.png" alt="current location" />
    <textarea
      class="${CLASS_WEATHER_INFO}"
      placeholder="Weather info"
      readonly
    ></textarea>
    <ul class="${CLASS_HISTORY_LIST}"></ul>
  `;
}
//<li><a class="history-city" href="javastript:fetchCurrentWeatherByCityName('London')">London</a></li>

/**
 * Подписка элементов на события
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
function addListeners(el) {
  searchInput = el.querySelector("." + CLASS_SEARCH_INPUT);
  searchButton = el.querySelector("." + CLASS_SEARCH_BUTTON);
  weatherLocation = el.querySelector("." + CLASS_WEATHER_LOCATION);
  weatherInfo = el.querySelector("." + CLASS_WEATHER_INFO);
  cityList = el.querySelector("." + CLASS_HISTORY_LIST);

  searchButton.addEventListener("click", (ev) => {
    const cityName = searchInput.value.trim().replace(/-+/, " ");
    if (!cityName) {
      alert("Необходимо ввести город на английском языке");
      return;
    }

    weatherInfo.value = "";
    try {
      ev.target.disabled = true;
      if (searchInput.value != cityName) searchInput.value = cityName;
      getWeather(cityName);
    } finally {
      ev.target.disabled = false;
    }
  });
}

/**
 * Запрос погоды и отображение результатов
 * @param {string} cityName - Название города
 */
async function getWeather(cityName) {
  console.log("send fetch for ", cityName);
  const weather = await fetchCurrentWeatherByCityName(cityName);
  if (weather) {
    await showCurrentWeather(weather);
    addCityToHistory(cityName);
    cityStorage.saveHistory(cityName);
  }
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
  weatherInfo.value = "Температура: " + getTemperature();

  const mapSrc = fetchMapImageByCoords(...getCoordinates(weather));
  weatherLocation.src = mapSrc;
}

/**
 * Обновление истории поисков
 * @param {string} cityName - Название города
 */
export function addCityToHistory(cityName) {
  const cityClass = `${cityName}`.replace(/\W+/, "-").toLowerCase();
  let cityElement = root.querySelector(`.${CLASS_HISTORY_LIST} .${cityClass}`);
  if (cityElement) {
    cityElement.closest("li").remove();
  }

  cityElement = document.createElement("li");
  cityElement.innerHTML = `<a class="${CLASS_HISTORY_CITY} ${cityClass}" href="#">${cityName}</a>`;
  cityElement.addEventListener("click", () => getWeather(cityName));

  cityList.append(cityElement);

  let cityElements = cityList.getElementsByClassName(CLASS_HISTORY_CITY);
  if (cityElements.length > HISTORY_LIMIT) {
    cityElements[0].remove();
  }
}
