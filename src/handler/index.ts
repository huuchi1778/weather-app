import {getGeocodeByCity, getWeatherByGeocode} from '../api';
import {OPEN_WEATHER_API_KEY} from '../constant';
import {WeatherResponse, GeolocationPosition} from '../types';

const searchButton = document.querySelector('.search_button');
const searchInput: HTMLInputElement = document.querySelector('.search_input');
const temperatureDisplay = document.querySelector('.temperature_value');
const cityDisplay = document.querySelector('.city_name');
const humidityDisplay = document.querySelector('.humidity_value');
const windDisplay = document.querySelector('.wind_value');

export async function handleIndex() {
  initScreen();
  searchButton.addEventListener('click', handleSearch);
}

async function handleSearch() {
  const searchValue = getSearchValue();
  const weatherData = await getWeatherDataByCity(searchValue);
  setUIData(weatherData);
}

async function initScreen(): Promise<void> {
  const positionData = await getCurrentCoordinate();
  const weatherData = await getWeatherByGeocode({
    lat: String(positionData.coords.latitude),
    lon: String(positionData.coords.longitude),
    appid: OPEN_WEATHER_API_KEY
  });
  setUIData(weatherData);
}

async function getWeatherDataByCity(city: string): Promise<WeatherResponse> {
  const geoCodes = await getGeocodeByCity({city, appid: OPEN_WEATHER_API_KEY});
  const weatherData = await getWeatherByGeocode({
    lat: geoCodes[0].lat,
    lon: geoCodes[0].lon,
    appid: OPEN_WEATHER_API_KEY,
    units: 'metric'
  });

  return weatherData as WeatherResponse;
}

function getSearchValue() {
  return searchInput.value;
}

function setUIData(weatherData: WeatherResponse) {
  setTemperature(weatherData.main.temp);
  setCityName(weatherData.name);
  setHumidity(weatherData.main.humidity);
  setWindSpeed(weatherData.wind.speed);
}

function setTemperature(temp: number) {
  temperatureDisplay.textContent = String(temp);
}

function setCityName(city: string) {
  cityDisplay.textContent = city;
}

function setHumidity(humidity: number) {
  humidityDisplay.textContent = String(humidity);
}

function setWindSpeed(windSpeed: number) {
  windDisplay.textContent = String(windSpeed);
}

async function getCurrentCoordinate() {
  const positionData = await getNavigatorCurrentPosition();
  return positionData;
}

function getNavigatorCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}
