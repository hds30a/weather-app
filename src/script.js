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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="42"
    />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )}° </span
    ><span class="weather-forecast-temperature-min"> ${Math.round(
      forecastDay.temp.min
    )}° </span>
    </div>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d64403a59d7be699c0e3c274cba6ea07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayLocalTemp(response) {
  let heading = document.querySelector("#current-temp");
  let temp = Math.round(response.data.main.temp);
  heading.innerHTML = `${temp}º`;
  let h2 = document.querySelector("h2");
  let city = `${response.data.name}`;
  h2.innerHTML = `${city}`;
}
function displayCity(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}º`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temp-max").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}º`;
  document.querySelector("#temp-min").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}º`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph`;

  fahrenheiTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "d64403a59d7be699c0e3c274cba6ea07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayLocalTemp);
}
function getLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocalTemp);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(fahrenheiTemperature)}º`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = (5 / 9) * (fahrenheiTemperature - 32);
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}º`;
}

let fahrenheiTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
let currentButton = document.querySelector("#local");
currentButton.addEventListener("click", getLocal);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

searchCity("Nashville");
