const btn = document.querySelector('button');
const form = document.querySelector('#city');
const tempDiv = document.querySelector('.tempDiv');
const cityDiv = document.querySelector('.cityInfo');
const dateDiv = document.querySelector('.dateInfo');
const timeDiv = document.querySelector('.timeInfo');
const tempDescription = document.querySelector('.description');
const farein = document.querySelector('.F');
const cel = document.querySelector('.C');
let measure = 'metric';

function handleFarein(e) {
  e.preventDefault();
  measure = 'imperial';
  handleClick(e); 
}

function handleCelsius(e) {
  e.preventDefault();
  measure = 'metric';
  handleClick(e);
}

farein.addEventListener('click', handleFarein);
cel.addEventListener('click', handleCelsius);


async function fetchCityWeather(cityName) {
  addCityInfo(cityName);
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=862fd0705c243de0b37a18c82fad1ab3&units=${measure}`, {mode: 'cors'});
  const weatherData = await response.json();
  const cityTemp = weatherData.main.temp;
  setTemp(cityTemp);
  addIcon(weatherData);
  addDescription(weatherData);
  console.log(weatherData)
}

function setTemp(temp) {
  if(measure === 'metric') {
    tempDiv.innerText = Math.round(temp) + '°C';
  } else {
    tempDiv.innerText = Math.round(temp) + '°F';
  }
}

function addCityInfo(cityName) {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'short'});
  const day = date.getDay();
  const year = date.getFullYear();
  const weekDay = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const weekDayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDayString = weekDayArray[weekDay];
  const cleanCityName = cityName.replace('+', ' ');
  cityDiv.innerText = cleanCityName; 
  dateDiv.innerText =  weekDayString + ', ' + month + day + ', ' + year;
  timeDiv.innerText = hours + 'h' + minutes;
}

function handleClick(event) {
  event.preventDefault();
  const cityInput = document.querySelector('#cityName');
  const city = cityInput.value;
  const cityName = city.replace(' ', '+');
  fetchCityWeather(cityName);
}

function addIcon(data) {
  let locationIcon = document.querySelector('.weather-icon');
  const icon = data.weather[0].icon;
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`; 
  console.log(data.weather[0].icon);
}

function addDescription(data) {
  tempDescription.innerHTML = data.weather[0].description;
  console.log(data.weather[0].description);
}

btn.addEventListener('click', handleClick);

