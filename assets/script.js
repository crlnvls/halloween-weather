// Format date -->

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

// Show city info accordingly to user input -->

const key = "acb8cbc1cbebcc4544d2f68a7d215266";
const locationKey = "49b631c45785fe73d2a88477803dea22";

const currentDate = document.querySelector("#date");
const input = document.querySelector("#city-input");
const city = document.querySelector("#current-city");
const currentTemp = document.querySelector("#temp");
const prevision = document.querySelector("#prevision");
const celsius = document.querySelector("#link-c");
const fahrenheit = document.querySelector("#link-f");
const humid = document.querySelector("#humid");
const wind = document.querySelector("#wind");
const currentLocation = document.querySelector("#search-location");
const BigIcon = document.querySelector(".weather-img");

async function getData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${key}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function getInfo(e) {
  e.preventDefault();

  const res = await getData();
  console.log(res);

  const description = res["weather"][0]["description"];
  const temp = Math.round(res["main"]["temp"]);
  const humidity = res["main"]["humidity"];
  const speedWind = Math.round(res["wind"]["speed"]);
  const date = res["dt"];
  const icon = res["weather"][0]["icon"];

  BigIcon.setAttribute("src", `./assets/img/${icon}.png`);
  currentDate.textContent = formatDate(date * 1000);
  currentTemp.textContent = temp;
  city.textContent = input.value;
  input.value = "";
  prevision.textContent = description;
  humid.textContent = humidity;
  wind.textContent = speedWind;

  // Change temperature metrics -->

  function getCelsius() {
    const temp = Math.round(res["main"]["temp"]);

    currentTemp.textContent = temp;
  }

  function getFahrenheit() {
    const temp = Math.round(res["main"]["temp"]);
    const tempF = Math.round((temp * 9) / 5 + 32);

    currentTemp.textContent = tempF;
  }

  celsius.addEventListener("click", getCelsius);
  fahrenheit.addEventListener("click", getFahrenheit);
}

const form = document.querySelector("#city-form");
form.addEventListener("submit", getInfo);

// Handle current location of user -->

async function handlePosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${locationKey}`;

  try {
    const location = await axios.get(url);
    const res = location.data;

    const nameCity = res["name"];
    const description = res["weather"][0]["description"];
    const temp = Math.round(res["main"]["temp"]);
    const humidity = res["main"]["humidity"];
    const speedWind = Math.round(res["wind"]["speed"]);
    const date = res["dt"];
    const icon = res["weather"][0]["icon"];

    BigIcon.setAttribute("src", `./assets/img/${icon}.png`);
    currentDate.textContent = formatDate(date * 1000);
    city.textContent = nameCity;
    currentTemp.textContent = temp;
    prevision.textContent = description;
    humid.textContent = humidity;
    wind.textContent = speedWind;

    // Change temperature metrics -->

    function getCelsius() {
      const temp = Math.round(res["main"]["temp"]);

      currentTemp.textContent = temp;
    }

    function getFahrenheit() {
      const temp = Math.round(res["main"]["temp"]);
      const tempF = Math.round((temp * 9) / 5 + 32);

      currentTemp.textContent = tempF;
    }

    celsius.addEventListener("click", getCelsius);
    fahrenheit.addEventListener("click", getFahrenheit);
  } catch (err) {
    console.log(err);
  }
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
currentLocation.addEventListener("click", getCurrentPosition);
