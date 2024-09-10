document.querySelector(".app").innerHTML = `<h1>a + b = ${sum(1, 2)}</h1>`;

export function sum(a, b) {
  return a + b;
}
