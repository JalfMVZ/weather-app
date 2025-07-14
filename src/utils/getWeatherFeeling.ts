import { weatherMap } from '../constants/weatherMap'

export function getWeatherFeeling(temperature: number): { icon: string; message: string } {
  for (const range of weatherMap) {
    if (temperature >= range.min && temperature < range.max) {
      return { icon: range.icon, message: range.message }
    }
  }
  return { icon: 'mdi:help', message: '' }
}
