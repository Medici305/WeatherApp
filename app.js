const apiKey = "6ff42468ea999ed6fe9170423059dcf2";
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const weatherDisplay = document.querySelector(".weather-display");
const timeDisplay = document.querySelector(".time-display");
const dateDisplay = document.querySelector(".date-display");
let searchValue;
let iconImage;

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function celsius(f) {
  return Math.floor(f - 273.15);
}

function changeIcon(description) {
  console.log(description);
  if (description === "scattered clouds") {
    iconImage = "./resources/images/animated/cloudy-night-1.svg";
    return;
  }
  if (description === "few clouds") {
    iconImage = "./resources/images/animated/cloudy-day-1.svg";
    return;
  }
  if (description === "overcast clouds") {
    iconImage = "./resources/images/animated/cloudy-day-2.svg";
    return;
  }
  if (description === "broken clouds") {
    iconImage = "./resources/images/animated/cloudy-night-2.svg";
    return;
  }
  if (description === "light rain") {
    iconImage = "./resources/images/animated/rainy-1.svg";
    return;
  }
  if (description === "moderate rain") {
    iconImage = "./resources/images/animated/rainy-3.svg";
    return;
  }
  if (description === "heavy rain") {
    iconImage = "./resources/images/animated/rainy-5.svg";
    return;
  }
  if (description === "clear sky") {
    iconImage = "./resources/images/animated/day.svg";
    return;
  }
  if (description === "snow") {
    iconImage = "./resources/images/animated/snowy-4.svg";
    return;
  }
}

function startTime() {
  let today = new Date();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  minute = checkTime(minute);
  second = checkTime(second);
  timeDisplay.innerText = `${hour}:${minute}:${second}`;
}

function getDate() {
  let today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const date = `${day}/${month}/${year}`;
  dateDisplay.innerText = date;
}

async function fetchWeather(city) {
  try {
    clear();
    const dataFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await dataFetch.json();
    console.log(data);
    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");
    // Inside card
    // Icon
    const icon = document.createElement("img");
    icon.classList.add("icon-img");
    changeIcon(data.weather[0].description);
    console.log(iconImage);
    icon.src = iconImage;
    // City name
    const cityName = document.createElement("h3");
    cityName.classList.add(".city-name");
    cityName.innerText = data.name;
    // Weather description
    const weatherDescription = document.createElement("p");
    weatherDescription.classList.add("weather-description");
    weatherDescription.innerText = data.weather[0].description;
    // Temperature
    const temperature = document.createElement("p");
    temperature.classList.add("temperature");
    temperature.innerText = celsius(data.main.temp) + "°C";
    //Append All
    weatherCard.appendChild(icon);
    weatherCard.appendChild(cityName);
    weatherCard.appendChild(weatherDescription);
    weatherCard.appendChild(temperature);
    weatherDisplay.appendChild(weatherCard);
  } catch (error) {
    console.log(error.message);
  }
}

function updateInput(e) {
  searchValue = e.target.value;
}

function clear() {
  weatherDisplay.innerHTML = "";
  searchInput.value = "";
}

searchInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather(searchValue);
});

setInterval(() => {
  startTime();
}, 1000);

setInterval(() => {
  getDate();
}, 1000);
