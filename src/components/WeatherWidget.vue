<template>
  <div
    class="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#2e3192] via-[#8f6ed5] to-[#e94057] flex items-center justify-center"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
      ></div>
      <div
        class="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-1000"
      ></div>
      <div
        class="absolute -bottom-8 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"
      ></div>
    </div>

    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"
      ></div>
      <div
        class="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-40 animate-float animation-delay-500"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-float animation-delay-1000"
      ></div>
      <div
        class="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-float animation-delay-1500"
      ></div>
    </div>

    <div
      class="max-w-sm sm:max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col gap-8 relative z-10 transform hover:scale-105 transition-transform duration-300"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"
      ></div>

      <div class="relative z-10">
        <div class="text-center mb-6">
          <h1
            class="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
          >
            Weather App
          </h1>
          <p class="text-white/70 text-sm">Consulta el clima en tiempo real</p>
        </div>

        <form @submit.prevent="onSearch" class="flex flex-col gap-4">
          <div class="relative">
            <input
              v-model="city"
              type="text"
              placeholder="Escribe una ciudad..."
              class="rounded-2xl border border-white/30 px-6 py-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-white/10 backdrop-blur-sm text-white text-lg placeholder-white/50 transition-all duration-300 focus:bg-white/20 hover:bg-white/15"
              :disabled="loading"
              autocomplete="off"
            />
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <button
            type="submit"
            class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            :disabled="loading || !city.trim()"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg
                class="inline mr-2 w-5 h-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
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
              Consultando...
            </span>
            <span v-else class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                ></path>
              </svg>
              Consultar clima
            </span>
          </button>
        </form>

        <div
          v-if="error"
          class="bg-red-500/20 backdrop-blur-sm text-red-200 text-center rounded-2xl py-4 px-6 font-semibold shadow-lg border border-red-300/30 transform animate-shake"
        >
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
          {{ error }}
        </div>

        <div
          v-if="weather"
          class="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-inner border border-white/20 transform animate-fade-in-up"
        >
          <div class="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white">
            <span class="text-3xl animate-bounce">🌍</span>
            <span
              class="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent"
            >
              {{ weather.city }}
            </span>
          </div>

          <div class="relative flex items-center justify-center">
            <div class="text-6xl sm:text-7xl font-bold text-white text-center relative z-10">
              <span
                class="bg-gradient-to-b from-blue-200 to-blue-400 bg-clip-text text-transparent"
              >
                {{ weather.temp }}°C
              </span>
            </div>

            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-40 h-40 border-2 border-blue-300/20 rounded-full animate-spin-slow"
              ></div>
              <div
                class="absolute w-32 h-32 border border-purple-300/15 rounded-full animate-spin-reverse"
              ></div>
            </div>
          </div>

          <div class="relative -mt-2">
            <span
              class="bg-gradient-to-r from-yellow-400/90 to-orange-400/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-lg border border-yellow-300/30 transform hover:scale-105 transition-transform duration-200"
            >
              {{ weatherMessage }}
            </span>
          </div>

          <div class="flex gap-6 text-white/60 text-xs mt-2">
            <div class="flex items-center gap-1.5">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                ></path>
              </svg>
              <span>Actualizado</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>Ubicación</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useWeather from '../composables/useWeather'
import { ref, computed } from 'vue'

const city = ref('')
const { weather, loading, error, fetchWeather } = useWeather()

const onSearch = () => {
  if (!city.value.trim()) return
  fetchWeather(city.value)
}

const weatherMessage = computed(() => {
  if (!weather.value) return ''
  const t = weather.value.temp
  if (t < 10) return 'Hace frío 🧥'
  if (t <= 25) return 'Clima templado 🌤'
  return 'Hace calor ☀️'
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 15s linear infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-1500 {
  animation-delay: 1.5s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
