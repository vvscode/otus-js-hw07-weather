/**
 * Запрашивает объект с данными по выбранной ссылке
 * @param {string} url - Ссылка для GET-запроса
 * @returns - Объект данных формата json
 */
export async function fetchJson(url) {
  try {
    const result = await fetch(url);
    if (result.ok) {
      return await result.json();
    }
  } catch (e) {
    console.log(e);
  }
}
