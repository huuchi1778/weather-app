import {getCityNameByCoord, getGeocodeByCity, getWeatherByGeocode} from '../api';
import {OPEN_WEATHER_API_KEY, STANDARD_DECIMAL_PLACES, WEATHER_CODE_ICON} from '../constant';
import {WeatherResponse, GeolocationPosition, DirectGeoCodingResponse, UIDataProps} from '../types';

const searchButton = document.querySelector('.search_button');
const searchInput: HTMLInputElement = document.querySelector('.search_input');
const temperatureDisplay = document.querySelector('.temperature_value');
const cityDisplay = document.querySelector('.city_name');
const humidityDisplay = document.querySelector('.humidity_value');
const windDisplay = document.querySelector('.wind_value');
const weatherIconDisplay: HTMLImageElement = document.querySelector('.weather_icon');

export async function handleIndex() {
  initOnFirstAccess();

  searchButton.addEventListener('click', handleSearch);
}

async function handleSearch() {
  const searchValue = getSearchValue();
  const [weatherData, geoCodes] = await getWeatherAndGeocodeByCity(searchValue);
  setUIData({weatherData, geoCodes});
}

async function initOnFirstAccess(): Promise<void> {
  const positionData = await getCurrentCoordinate();
  const locationData = await getCityNameByCoord({
    lat: String(positionData.coords.latitude),
    lon: String(positionData.coords.longitude),
    appid: OPEN_WEATHER_API_KEY
  });

  const weatherData = await getWeatherByGeocode({
    lat: String(positionData.coords.latitude),
    lon: String(positionData.coords.longitude),
    appid: OPEN_WEATHER_API_KEY,
    units: 'metric'
  });
  setUIData({weatherData, locationData});
}

async function getWeatherAndGeocodeByCity(city: string): Promise<any> {
  const geoCodes = await getGeocodeByCity({city, appid: OPEN_WEATHER_API_KEY});
  const weatherData = await getWeatherByGeocode({
    lat: geoCodes[0].lat,
    lon: geoCodes[0].lon,
    appid: OPEN_WEATHER_API_KEY,
    units: 'metric'
  });

  return [weatherData as WeatherResponse, geoCodes as DirectGeoCodingResponse];
}

function getSearchValue() {
  return searchInput.value;
}

function setUIData(props: UIDataProps) {
  const cityName = props.geoCodes && props.geoCodes[0]?.name || props.locationData && props.locationData[0]?.name;
  setTemperature(props.weatherData.main.temp);
  setCityName(cityName);
  setHumidity(props.weatherData.main.humidity);
  setWindSpeed(props.weatherData.wind.speed);
  setWeatherIcon(props.weatherData);
}

function setWeatherIcon(weatherData: WeatherResponse) {
  const weatherMode = weatherData.weather[0]?.main;
  weatherIconDisplay.src = WEATHER_CODE_ICON[weatherMode];
}

function setTemperature(temp: number) {
  temperatureDisplay.textContent = String(temp.toFixed(STANDARD_DECIMAL_PLACES));
}

function setCityName(city: string) {
  cityDisplay.textContent = city;
}

function setHumidity(humidity: number) {
  humidityDisplay.textContent = String(humidity);
}

function setWindSpeed(windSpeed: number) {
  windDisplay.textContent = String(windSpeed.toFixed(STANDARD_DECIMAL_PLACES));
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
