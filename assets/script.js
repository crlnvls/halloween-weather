function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function formatDate() {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[date.getDay()]} ${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}`;
}

const currentDate = document.querySelector("#date");
currentDate.textContent = formatDate();

function showCity(e) {
  e.preventDefault();
  const input = document.querySelector("#city-input");
  const city = document.querySelector("#current-city");

  city.textContent = input.value;
  input.value = "";
}

const form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

const temp = document.querySelector("#temp");

function getFahrenheit(e) {
  e.preventDefault();
  const fahrenheitTemperature = Math.round((18 * 9) / 5 + 32);
  temp.textContent = fahrenheitTemperature;
}

function getCelsius(e) {
  e.preventDefault();
  const celsiusTemperature = Math.round(18);
  temp.textContent = celsiusTemperature;
}

const fahrenheit = document.querySelector("#link-f");
const celsius = document.querySelector("#link-c");

fahrenheit.addEventListener("click", getFahrenheit);
celsius.addEventListener("click", getCelsius);
