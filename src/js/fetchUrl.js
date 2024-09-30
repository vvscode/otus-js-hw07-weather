const defaultOptions = {};

/**
 * Запрашивает объект с данными по выбранной ссылке
 * @param {string} url - Ссылка для GET-запроса
 * @returns - Объект данных формата json
 */
export async function fetchJson(
  url,
  options = defaultOptions,
  timeoutMsecs = 5000
) {
  try {
    if (isAbsoluteURL(url)) options.signal = AbortSignal.timeout(timeoutMsecs);
    const result = await fetch(url, options);
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    console.log("fetch error: ", e);
  }
}

/**
 * Проверка на то, является ли адрес ссылки абсолютным или относительным
 * @param {string} url - адрес ссылки
 * @returns {boolean} True = абсолютный, False = относительный
 */
export function isAbsoluteURL(url) {
  return url.indexOf("://") > 0 || url.indexOf("//") === 0;
}
