import {DirectGeoCodingProps, DirectGeoCodingResponse, WeatherProps, WeatherResponse, ReverseGeocodingProps, ReverseGeoCodeResponse} from '../types';

const DIRECT_GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const REVERSE_GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/reverse';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getGeocodeByCity(props: DirectGeoCodingProps): Promise<DirectGeoCodingResponse> {
  const q = `?q=${props.city}&limit=${props.limit ? props.limit : 1}&appid=${props.appid}`;
  const response = await fetch(DIRECT_GEOCODE_URL + q);
  if (response.status !== 200) throw new Error('Network issue');
  return (response.json() as unknown) as DirectGeoCodingResponse;
}

export async function getWeatherByGeocode(props: WeatherProps): Promise<WeatherResponse> {
  const coordinates = `lat=${props.lat}&lon=${props.lon}&appid=${props.appid}`;
  const exlucde = props.exclude ? `&exclude=${props.exclude}` : '';
  const units = props.units ? `&units=${props.units}` : '';
  const lang = props.lang ? `&lang=${props.lang}` : '';
  const query = `?${coordinates}${exlucde}${units}${lang}`;

  const response = await fetch(WEATHER_URL + query);
  if (response.status !== 200) throw new Error('Network issue');
  return (response.json() as unknown) as WeatherResponse;
}

export async function getCityNameByCoord(props: ReverseGeocodingProps): Promise<ReverseGeoCodeResponse> {
  const q = `?lat=${props.lat}&lon=${props.lon}&appid=${props.appid}`;
  const response = await fetch(REVERSE_GEOCODE_URL + q);
  if (response.status !== 200) throw new Error('Network issue');
  return (response.json() as unknown) as ReverseGeoCodeResponse;
}
