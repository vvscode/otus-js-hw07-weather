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
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const nav = await promise;
    coords = [nav.coords.latitude, nav.coords.longitude];
  }
  return coords;
}

export function hasCoords() {
  return coords.every(Number.isFinite);
}
