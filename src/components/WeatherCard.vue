<template>
  <div
    class="w-full max-w-md mx-auto bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 mt-8"
  >
    <div v-if="weather" class="flex flex-col items-center w-full">
      <div class="flex items-center gap-3 mb-2">
        <component :is="weatherIconComponent" class="text-4xl text-blue-500" />
        <span class="text-lg font-semibold">{{ weather.city }}, {{ weather.country }}</span>
      </div>
      <div class="flex items-center gap-4">
        <img :src="weatherIconUrl" :alt="weather.description" class="w-16 h-16" />
        <div class="text-5xl font-bold text-gray-800">{{ Math.round(weather.temperature) }}°C</div>
      </div>
      <div class="text-gray-600 capitalize">{{ weather.description }}</div>
      <div class="text-sm text-gray-500 mt-2">{{ feeling.message }}</div>
      <div class="flex justify-between w-full mt-4 text-gray-700">
        <div class="flex flex-col items-center">
          <span class="font-medium">{{ t('feels_like') }}</span>
          <span>{{ Math.round(weather.feels_like) }}°C</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-medium">{{ t('humidity') }}</span>
          <span>{{ weather.humidity }}%</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="font-medium">{{ t('wind') }}</span>
          <span>{{ weather.wind.toFixed(1) }} m/s</span>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="text-red-500 text-center">{{ t('error') }}</div>
    <div v-else class="text-gray-400 text-center">{{ t('search_placeholder') }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getWeatherFeeling } from '../utils/getWeatherFeeling'
import es from '../i18n/es'
import type { WeatherResponse } from '../types/weather'

import { Thermometer, Snowflake, Cloud, CloudSun, Sun } from 'lucide-vue-next'

const props = defineProps<{
  weather?: WeatherResponse
  error?: boolean
}>()

const t = (key: keyof typeof es) => es[key]

const weatherIconUrl = computed(() => {
  if (!props.weather) return ''
  return props.weather.icon.startsWith('http')
    ? props.weather.icon
    : `https://openweathermap.org/img/wn/${props.weather.icon}@4x.png`
})

const feeling = computed(() =>
  props.weather ? getWeatherFeeling(props.weather.temperature) : { icon: '', message: '' },
)

const iconMap: Record<string, any> = {
  'mdi:snowflake': Snowflake,
  'mdi:weather-cloudy': Cloud,
  'mdi:weather-partly-cloudy': CloudSun,
  'mdi:weather-sunny': Sun,
  'mdi:help': Thermometer,
}

const weatherIconComponent = computed(() => {
  if (!props.weather) return Thermometer
  return iconMap[feeling.value.icon] || Thermometer
})
</script>

<style scoped></style>
