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
    options.signal = AbortSignal.timeout(timeoutMsecs);
    const result = await fetch(url, options);
    if (result.ok) {
      return result.json();
    }
  } catch (e) {
    console.log(e);
  }
}
