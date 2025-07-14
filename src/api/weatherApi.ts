import type { WeatherResponse, CityInfo } from '../types/weather'

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHERAPI_KEY = import.meta.env.VITE_WEATHERAPI_KEY

export async function fetchWeatherByCity(city: string): Promise<WeatherResponse> {
  if (!OPENWEATHER_API_KEY || !OPENWEATHER_API_KEY.trim()) {
    throw new Error(
      'Falta la clave de OpenWeatherMap. Configura VITE_OPENWEATHER_API_KEY en tu .env',
    )
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`,
    )
    if (!res.ok) throw new Error('OpenWeatherMap error')
    const data = await res.json()
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    }
  } catch (e) {
    return fetchWeatherByCityFallback(city)
  }
}

async function fetchWeatherByCityFallback(city: string): Promise<WeatherResponse> {
  if (!WEATHERAPI_KEY || !WEATHERAPI_KEY.trim()) {
    throw new Error('Falta la clave de WeatherAPI. Configura VITE_WEATHERAPI_KEY en tu .env')
  }
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(city)}&lang=es`,
    )
    if (!res.ok) throw new Error('WeatherAPI error')
    const data = await res.json()
    return {
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      icon: data.current.condition.icon,
      feels_like: data.current.feelslike_c,
      humidity: data.current.humidity,
      wind: data.current.wind_kph / 3.6,
    }
  } catch (e) {
    throw new Error('No se pudo obtener el clima. Intenta nuevamente más tarde.')
  }
}
