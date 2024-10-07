// import mapImg from "../images/map.png";
export const mapImg = "../images/map.png";

export const baseUrl = "https:/static-maps.yandex.ru/v1";
const apiKey = "";

let src;

/**
 * Запрашивает тайл по координатам места
 * @param {number} latitude - широта места
 * @param {number} longitude - долгота места
 * @returns {string}
 */
export function fetchMapImageByCoords(
  latitude,
  longitude,
  zoom = 12,
  size = 400
) {
  if (longitude && latitude && apiKey) {
    src = `${baseUrl}?ll=${latitude},${longitude}&lang=ru_RU&size=${size},${size}&z=${zoom}&pt=${latitude},${longitude}&apikey=${apiKey}`;
  } else {
    src = mapImg;
  }
  return src;
}
