// Format date and days-->

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

function formatDays(time) {
  const date = new Date(time * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
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
  city.textContent = nameCity + ",";
  country.textContent = nameCountry;
  prevision.textContent = description;
  humid.textContent = humidity;
  wind.textContent = speedWind;
  BigIcon.setAttribute("src", `./assets/img/${icon}.png`);

  celsius.addEventListener("click", getCelsius);
  fahrenheit.addEventListener("click", getFahrenheit);

  getForecast(res["coord"]);
}

const error = document.querySelector("#error");
async function getData(city) {
  const key = "f09d3949047ab6c9e3bcaf79cf61f619";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

  try {
    const res = await axios.get(url);
    error.textContent = "";
    return getInfo(res.data);
  } catch (err) {
    console.log(err);
    error.textContent = "Please enter a valid city 👻";
  }
}

async function getPosition(position) {
  const key = "5863935ee9cca4c02ed68203f807c65b";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

  try {
    const res = await axios.get(url);
    error.textContent = "";
    return getInfo(res.data);
  } catch (err) {
    console.log(err);
    error.textContent = "Something went wrong! Please try again later! 🎃";
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("#city-input");
  await getData(input.value);
  input.value = "";
}

function handleCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

async function getForecast(coord) {
  const key = "c819171fe0abdc14039af4ef5dda283b";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${key}&units=metric`;

  try {
    const res = await axios.get(url);
    console.log(res.data.daily);
    error.textContent = "";
    return handleForecast(res.data.daily);
  } catch (err) {
    console.log(err);
    error.textContent = "Something went wrong! Please try again later! 🎃";
  }
}

function handleForecast(res) {
  const card = document.querySelector("#forecast");
  const forecast = res;
  let cardForecast = "";

  forecast.map((d) => {
    cardForecast =
      cardForecast +
      `<div class="card">
            <h4>${formatDays(d.dt)}</h4>
            <img src="./assets/img/${
              d["weather"][0]["icon"]
            }.png" alt="weather icon" class="card-img" />
            <div class="min-max">
              <h5>${Math.round(d["temp"]["max"])}°</h5>
              <h5 class="min">${Math.round(d["temp"]["min"])}°</h5>
            </div>
          </div>`;
  });

  card.innerHTML = cardForecast;
}

const form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

const currentLocation = document.querySelector("#search-location");
currentLocation.addEventListener("click", handleCurrentPosition);

console.log(formatDate(166505400 * 1000));
console.log(formatDate(1665088376 * 1000));

getData("London");
