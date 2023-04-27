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

function showCurrentTemp(response) {
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
}

function searchDefault(position) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let unit = "metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=london&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiLink}`).then(showCurrentTemp);
}

searchDefault("london");
