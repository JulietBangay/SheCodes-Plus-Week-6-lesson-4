let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let apiKey = "f85062d84430cd35a6b8db439bd6c8f6";
let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?";

let now = new Date();
function currentDate() {
  let weekDay = days[now.getDay()];
  let month = months[now.getMonth()];
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let dateTime = document.querySelector("#date-and-time");
  dateTime.innerHTML = `${weekDay} ${month} ${day} ${hour}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  cityInput.value = cityInput.value.trim();
  cityInput.value = cityInput.value.toLowerCase();
  axios
    .get(`${weatherApiUrl}q=${cityInput.value}&units=metric&appid=${apiKey}`)
    .then(showSearchCityResults);
  function showSearchCityResults(response) {
    let newCityInput = document.querySelector("#city-displayed");
    newCityInput.innerHTML = `${cityInput.value}`;
    let searchCityTemp = response.data.main.temp;
    let searchCityHumidity = response.data.main.humidity;
    let searchCityWindspeed = response.data.wind.speed;
    let searchCityTempElement = document.querySelector("#current-temp-celsius");
    searchCityTempElement.innerHTML = `${searchCityTemp}°C`;
  }
}

function convertToFarenheit(event) {
  event.preventDefault();
  let celciusTemp = 20;
  let farenheitTemp = Math.round(celciusTemp * 1.8 + 32);
  let currentTemp = document.querySelector("#current-temp-celsius");
  currentTemp.innerHTML = `${farenheitTemp}°F`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let celciusTemp = 20;
  let currentTemp = document.querySelector("#current-temp-celsius");
  currentTemp.innerHTML = `${celciusTemp}°C`;
}

function currentLocationWeather(position) {
  console.log(position);
  let longitude = Math.round(position.coords.longitude);
  let latitude = Math.round(position.coords.latitude);
  axios
    .get(
      `${weatherApiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(showCurrentLocationCityId);
  function showCurrentLocationCityId(response) {
    console.log(response.data);
    let currentCityTemp = response.data.main.temp;
    let currentCityHumidity = response.data.main.humidity;
    let currentCityWindspeed = response.data.wind.speed;
    let temperatureElement = document.querySelector("#current-temp-celsius");
    temperatureElement.innerHTML = `${currentCityTemp}°C`;
    let currentLocationElement = document.querySelector("#city-displayed");
    currentLocationElement.innerHTML = `Longitude: ${longitude} <br /> Latitude: ${latitude}`;
  }
}

let enterCityButton = document.querySelector("#search-city-button");
enterCityButton.addEventListener("click", searchCity);

let currentLocationDataButton = document.querySelector(
  "#search-current-location-button"
);
currentLocationDataButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentLocationWeather)
);

currentDate();
