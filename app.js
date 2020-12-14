const apiKey = "6ff42468ea999ed6fe9170423059dcf2";
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const weatherDisplay = document.querySelector(".weather-display");
const timeDisplay = document.querySelector(".time-display");
let searchValue;

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
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

async function fetchWeather(city) {
  try {
    clear();
    const dataFetch = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await dataFetch.json();
    console.log(data);
    const weatherCard = document.querySelector("div");
    weatherCard.classList.add("weather-card");
    weatherDisplay.appendChild(weatherCard);

    weatherDisplay.appendChild(card);
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
