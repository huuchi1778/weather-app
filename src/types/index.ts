export type DirectGeoCodingProps = {
  city: string,
  appid: string;
  limit?: number
}

export type DirectGeoCodingResponse = {
  [key: string]: DirectGeoCodingLocation
}

type DirectGeoCodingLocation = {
  name: string,
  local_name: DirectGeoCodingLocalName,
  lat: string,
  lon: string,
  country: string,
  state: string
}

type DirectGeoCodingLocalName = {
  [key:string]: string
}

export type WeatherProps = {
  lat: string,
  lon: string,
  appid: string,
  mode?: 'xml' | 'html',
  exclude?: string
  units?: 'standard'|'metric'|'imperial',
  lang?: string
}

export type WeatherResponse = {
  coord: Coord;
  weather: WeatherDescription[];
  base: string;
  main: MainData;
  visibility: number;
  wind: WindData;
  rain?: RainData;
  clouds: CloudsData;
  dt: number;
  sys: SysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type GeolocationPosition = {
  coords: {
    accuracy: number,
    altitude: number,
    heading: number,
    latitude: number,
    longitude: number,
    speed: number
  },
  timestamp: number
}

export type ReverseGeocodingProps = {
  lat: string,
  lon: string,
  appid: string,
  limit?: number
}

export type ReverseGeoCodeResponse = {
  [key: string]: LocationResponse
}

export type UIDataProps = {
  weatherData: WeatherResponse,
  geoCodes?: DirectGeoCodingResponse,
  locationData?: ReverseGeoCodeResponse
}


type LocationResponse = {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
}

type LocalNames = {
  [language: string]: string;
  ascii?: string;
  feature_name?: string;
}

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

type MainData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

type WindData = {
  speed: number;
  deg: number;
  gust: number;
}

type RainData = {
  '1h': number;
}

type CloudsData = {
  all: number;
}

type SysData = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

type Coord = {
  lon: number;
  lat: number;
}
