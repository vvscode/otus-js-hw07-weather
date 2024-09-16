import mapImg from "./map.png";

const apiKey = "7881bfb7be02c74633e5fdee4ff41329";

/**
 * Запуск приложения
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
export default async function runApp(el) {
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

  await getCurrentWeaherByCityName("Moscow");
  // await getWeaherForecastByCityName();
}

async function getCurrentWeaherByCityName(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;
  console.log(url);
  const result = await fetch(url);
  console.log(result);
  console.log(await result.json());
}

async function getWeaherForecastByCityName() {
  const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=37.61&lon=55.75&appid=${apiKey}`;
  console.log(url);
  const result = await fetch(url);
  console.log(result);
  console.log(await result.json());
}
