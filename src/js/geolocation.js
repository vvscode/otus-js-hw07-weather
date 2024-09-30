let coords = undefined;

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 10000,
};

/**
 * Возвращает текущие координаты из браузера (Geolocation API)
 * @returns {Array.<number>} - Массив [широта, долгота]
 */
export async function fetchCoords() {
  if (navigator.geolocation) {
    const promise = new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );

    const nav = await promise;
    coords = [nav.coords.latitude, nav.coords.longitude];
  }
  return coords;
}

/**
 * Проверка наличия и корректности координат
 * @returns {boolean} True в случае корректных координат
 */
export function hasCoords() {
  return coords && coords.length && coords.every(Number.isFinite);
}

/**
 * Обнуление сохранённых значений координат
 */
export function resetCoords() {
  coords = undefined;
}
