export interface WeatherResponse {
  city: string
  country: string
  temperature: number
  description: string
  icon: string
  feels_like: number
  humidity: number
  wind: number
}

export interface CityInfo {
  name: string
  country: string
}
