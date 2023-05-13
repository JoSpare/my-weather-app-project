let current = document.querySelector("#now");

let app = new Date();

let dates = app.getDate();

let days = app.getDay();

let today = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedenesday",
  "Thursday",
  "Friday",
  "Saturday",
];
days = today[app.getDay()];

let months = app.getMonth();
let calendar = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemeber",
  "October",
  "November",
  "December",
];

months = calendar[app.getMonth()];

let years = app.getFullYear();

let currentTime = app.getHours();
if (currentTime < 10) {
  currentTime = `0${currentTime}`;
}

let minutes = app.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayDate = `${days} ${currentTime}:${minutes}`;
current.innerHTML = displayDate;

function showHourlyTemp(response) {
  console.log(response);
}

function showHourlyTemp(response) {
  console.log(response);
}

function updatedDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayDailyForecastData(response) {
  let everydayForecast = response.data.daily;
  console.log(everydayForecast);
  let newDayForecastElement = document.querySelector("#daily-forecast-display");

  let dayHTML = `<div class="row">`;

  everydayForecast.forEach(function (responseDay, index) {
    if (index < 6) {
      dayHTML =
        dayHTML +
        `
            <div class="col-2 section-design">
            <div><h3>${updatedDay(responseDay.dt)}</h3></div>
            <div><img src="https://openweathermap.org/img/wn/${
              responseDay.weather[0].icon
            }@2x.png" width="45"></></div>
            <div>
              <h3><span>${Math.round(
                responseDay.temp.max
              )}°</span> <span class="hourly temp-menu">${Math.round(
          responseDay.temp.min
        )}°</span></h3>
            </div></div>
`;
    }
  });

  dayHTML = dayHTML + `</div>`;

  newDayForecastElement.innerHTML = dayHTML;
}

function updateHour(timestamp) {
  let hour = new Date(timestamp * 1000);

  let minute = new Date(timestamp * 1000);
  let hours = hour.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = minute.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let timeString = `${hours}:${minutes}`;

  return timeString;
}

function displayForecastData(response) {
  let everyHourForecast = response.data.hourly;
  console.log(everyHourForecast);
  let newForecastElement = document.querySelector("#forecast-section");

  let forecastHTML = `<div class="row">`;

  everyHourForecast.forEach(function (responseHour, index) {
    if (
      index == 1 ||
      index == 4 ||
      index == 7 ||
      index == 10 ||
      index == 13 ||
      index == 16
    ) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2 shade section-design">
<div><h3>${updateHour(responseHour.dt)}</h3></div>
<div><img src="https://openweathermap.org/img/wn/${
          responseHour.weather[0].icon
        }@2x.png" width="45"></></div>
<div><h3 class="hourly temp-menu">${Math.round(
          responseHour.temp
        )}°</h3></div></div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  newForecastElement.innerHTML = forecastHTML;
}

function showMyLocation(response) {
  console.log(response);
  let mySpot = Math.round(response.data.main.temp);
  let city = response.data.name;
  let myForecast = response.data.weather[0].description;
  let windForecast = Math.round(response.data.wind.speed);
  let humidityForecast = response.data.main.humidity;
  blah.innerHTML = `Results for ${city}`;
  nowForecast.innerHTML = mySpot;
  description.innerHTML = myForecast;
  sticky.innerHTML = humidityForecast;
  wind.innerHTML = windForecast;
  let weatherIcon = document.querySelector("#conditions");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  defaultCelsiusTemperature = response.data.main.temp;
  getOpenWeatherData(response.data.coord);
}

function showLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let unit = "metric";
  let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit=5&units=${unit}&appid=${apiKey}`;
  axios.get(`${geoApi}`).then(showMyLocation);
  console.log(showLocation);
}

function cityTemp(event) {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let showMeCurrentTemp = document.querySelector("#geolocation");
showMeCurrentTemp.addEventListener("click", cityTemp);

function showSearchedTemp(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let windDesc = Math.round(response.data.wind.speed);
  let mainDesc = response.data.weather[0].description;
  let humid = response.data.main.humidity;
  let tempLink = document.querySelector("#nowForecast");
  tempLink.innerHTML = currentTemperature;
  let speed = document.querySelector("#wind");
  speed.innerHTML = windDesc;
  let status = document.querySelector("#description");
  status.innerHTML = mainDesc;
  let currentHumidity = document.querySelector("#sticky");
  currentHumidity.innerHTML = humid;
  let defaultLocation = document.querySelector("#blah");
  blah.innerHTML = `Results for ${response.data.name}`;
  let weatherIcon = document.querySelector("#conditions");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  defaultCelsiusTemperature = response.data.main.temp;
  getOpenWeatherData(response.data.coord);
}

function anyWhere(event) {
  event.preventDefault();
  let input = document.querySelector("#chosen");
  console.log(input.value);
  let selectedLocation = input.value;
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let unit = "metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiLink}`).then(showSearchedTemp);
}

let showThis = document.querySelector("form");
showThis.addEventListener("submit", anyWhere);

function unitConversion(event) {
  event.preventDefault();
  let displayedFahrenheitTemp = document.querySelector("#nowForecast");
  let showFahrenheitTemp = (defaultCelsiusTemperature * 9) / 5 + 32;

  displayedFahrenheitTemp.innerHTML = Math.round(showFahrenheitTemp);
}

let fahrenheitConversion = document.querySelector("#fheit");
fahrenheitConversion.addEventListener("click", unitConversion);

function defaultTempUnit(event) {
  event.preventDefault();
  let tempOnLoad = document.querySelector("#nowForecast");
  let showCelsiusTemp = defaultCelsiusTemperature;

  tempOnLoad.innerHTML = Math.round(showCelsiusTemp);
}

let celsiusConversion = document.querySelector("#celsius");
celsiusConversion.addEventListener("click", defaultTempUnit);

function getOpenWeatherData(coordinates) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let unit = "metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
  console.log(apiLink);
  axios.get(apiLink).then(displayDailyForecastData);
  axios.get(apiLink).then(displayForecastData);
}

function showCurrentTemp(response) {
  console.log(response);
  let currentTemperature = Math.round(response.data.main.temp);
  let windDesc = Math.round(response.data.wind.speed);
  let mainDesc = response.data.weather[0].description;
  let humid = response.data.main.humidity;
  let weatherCondition = response.data.weather[0].icon;
  let tempLink = document.querySelector("#nowForecast");
  tempLink.innerHTML = currentTemperature;
  let speed = document.querySelector("#wind");
  speed.innerHTML = windDesc;
  let status = document.querySelector("#description");
  status.innerHTML = mainDesc;
  let currentHumidity = document.querySelector("#sticky");
  currentHumidity.innerHTML = humid;
  let defaultLocation = document.querySelector("#blah");
  blah.innerHTML = `Results for ${response.data.name}`;
  let weatherIcon = document.querySelector("#conditions");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  defaultCelsiusTemperature = response.data.main.temp;

  getOpenWeatherData(response.data.coord);
}

function searchDefault(position) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let unit = "metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=london&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiLink}`).then(showCurrentTemp);
}

let defaultCelsiusTemperature = null;

searchDefault("london");
