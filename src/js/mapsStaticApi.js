import { fetchJson } from "./fetchUrl";

const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
const apiKey = "";

let src;

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
  const url = `${baseUrl}?center=${latitude},${longitude}&zoom=${zoom}&size=${size}x${size}&key=${apiKey}`;
  src = await fetchJson(url);
  return src;
}
