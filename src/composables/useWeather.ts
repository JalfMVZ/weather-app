import { ref } from 'vue'

export interface WeatherData {
  city: string
  temp: number
}

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHERAPI_KEY = import.meta.env.VITE_WEATHERAPI_KEY
const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const WEATHERAPI_URL = 'https://api.weatherapi.com/v1/current.json'

export default function useWeather() {
  const weather = ref<WeatherData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWeather(city: string) {
    weather.value = null
    error.value = null
    loading.value = true
    try {
      const res = await fetch(
        `${OPENWEATHER_URL}?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`,
      )
      if (!res.ok) throw new Error('OpenWeatherMap failed')
      const data = await res.json()
      weather.value = {
        city: data.name,
        temp: data.main.temp,
      }
    } catch (e) {
      try {
        const res2 = await fetch(
          `${WEATHERAPI_URL}?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(city)}&aqi=no`,
        )
        if (!res2.ok) throw new Error('WeatherAPI failed')
        const data2 = await res2.json()
        weather.value = {
          city: data2.location.name,
          temp: data2.current.temp_c,
        }
      } catch (e2) {
        error.value = 'Could not fetch weather. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }

  return { weather, loading, error, fetchWeather }
}
