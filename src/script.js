function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `85º`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `29º`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function displayLocalTemp(response) {
  let heading = document.querySelector("#current-temp");
  let temp = Math.round(response.data.main.temp);
  heading.innerHTML = `${temp}º`;
  let h2 = document.querySelector("h2");
  let city = `${response.data.name}`;
  h2.innerHTML = `${city}`;
}
function displayCity(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}º`;
}
function searchCity(city) {
  let apiKey = "d64403a59d7be699c0e3c274cba6ea07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCity);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function getLocalTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d64403a59d7be699c0e3c274cba6ea07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayLocalTemp);
}
function getLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocalTemp);
}

let currentButton = document.querySelector("#local");
currentButton.addEventListener("click", getLocal);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);
