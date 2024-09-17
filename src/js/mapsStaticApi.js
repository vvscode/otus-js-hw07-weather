import { fetchJson } from "./fetchUrl";
import stubMapSrc from "../map.png";

const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
const apiKey = "";

let mapSrc;

/**
 * Запрашивает тайл по координатам места
 * @param {number} latitude - широта места
 * @param {number} longitude - долгота места
 */
export async function fetchMapImageByCoords(
  latitude,
  longitude,
  zoom = 12,
  size = 400
) {
  if (latitude && longitude && apiKey) {
    const url = `${baseUrl}?center=${latitude},${longitude}&zoom=${zoom}&size=${size}x${size}&key=${apiKey}`;
    mapSrc = await fetchJson(url);
  } else {
    mapSrc = stubMapSrc;
  }
  return mapSrc;
}
