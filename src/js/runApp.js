import mapImg from "../map.png";

/**
 * Запуск приложения
 * @param {Element} el - Корневой элемент в теле разметки главной страницы
 */
export default async function runApp(el) {
  fillElements(el);
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
