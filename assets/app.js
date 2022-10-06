// Format date -->

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
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  return `${days[date.getDay()]} ${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}`;
}

// Show city info accordingly to user input -->

function getInfo(res) {
  const currentDate = document.querySelector("#date");
  const city = document.querySelector("#current-city");
  const country = document.querySelector("#country");
  const prevision = document.querySelector("#prevision");
  const humid = document.querySelector("#humid");
  const wind = document.querySelector("#wind");
  const BigIcon = document.querySelector(".weather-img");
  const currentTemp = document.querySelector("#temp");
  const celsius = document.querySelector("#link-c");
  const fahrenheit = document.querySelector("#link-f");

  const nameCity = res["name"];
  const nameCountry = res["sys"]["country"];
  const description = res["weather"][0]["description"];
  const humidity = res["main"]["humidity"];
  const speedWind = Math.round(res["wind"]["speed"]);
  const date = res["dt"];
  const icon = res["weather"][0]["icon"];
  const temp = Math.round(res["main"]["temp"]);

  // Change temperature metrics -->

  function getCelsius() {
    currentTemp.textContent = temp;
  }

  function getFahrenheit() {
    const tempF = Math.round((temp * 9) / 5 + 32);
    currentTemp.textContent = tempF;
  }

  currentDate.textContent = formatDate(date * 1000);
  currentTemp.textContent = temp;
  city.textContent = nameCity;
  country.textContent = nameCountry;
  prevision.textContent = description;
  humid.textContent = humidity;
  wind.textContent = speedWind;
  BigIcon.setAttribute("src", `./assets/img/${icon}.png`);

  celsius.addEventListener("click", getCelsius);
  fahrenheit.addEventListener("click", getFahrenheit);
}

async function getData(city) {
  const key = "f09d3949047ab6c9e3bcaf79cf61f619";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

  try {
    const res = await axios.get(url);
    console.log(res.data);
    return getInfo(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function getPosition(position) {
  const key = "5863935ee9cca4c02ed68203f807c65b";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

  try {
    const res = await axios.get(url);
    return getInfo(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("#city-input");
  await getData(input.value);
  input.value = "";
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

const form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

const currentLocation = document.querySelector("#search-location");
currentLocation.addEventListener("click", getCurrentPosition);

getData("London");
