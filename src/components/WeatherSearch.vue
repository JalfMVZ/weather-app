<template>
  <div class="flex flex-col items-center w-full max-w-lg mx-auto gap-6">
    <form @submit.prevent="onSearch" class="flex flex-col sm:flex-row gap-3 w-full justify-center">
      <input
        v-model="city"
        type="text"
        :placeholder="t('search_placeholder')"
        class="rounded-xl border border-white/30 px-5 py-3 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-white/20 backdrop-blur-sm text-gray-800 placeholder-gray-400 transition-all duration-300 focus:bg-white/30 hover:bg-white/25 shadow"
        :disabled="loading"
        autocomplete="off"
      />
      <button
        type="submit"
        class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow"
        :disabled="loading || !city.trim()"
      >
        <span v-if="loading" class="flex items-center justify-center">
          <svg class="inline mr-2 w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          ...
        </span>
        <span v-else>{{ t('search_button') }}</span>
      </button>
    </form>
    <WeatherCard :weather="weather" :error="error" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchWeatherByCity } from '../api/weatherApi'
import WeatherCard from './WeatherCard.vue'
import es from '../i18n/es'
import type { WeatherResponse } from '../types/weather'

const city = ref('')
const weather = ref<WeatherResponse | undefined>()
const loading = ref(false)
const error = ref(false)

const t = (key: keyof typeof es) => es[key]

async function onSearch() {
  if (!city.value.trim()) return
  loading.value = true
  error.value = false
  weather.value = undefined
  try {
    weather.value = await fetchWeatherByCity(city.value)
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>
