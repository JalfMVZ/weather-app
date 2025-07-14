<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goToWeather = () => router.push('/weather')
</script>

<template>
  <div
    class="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#2e3192] via-[#8f6ed5] to-[#e94057] flex items-center justify-center"
  >
    <div
      class="bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl px-8 py-10 max-w-md w-full flex flex-col items-center gap-8 border border-white/20"
    >
      <h1 class="text-4xl font-bold text-white drop-shadow mb-2">Bienvenido</h1>
      <p class="text-lg text-white/80 mb-4 text-center">
        Consulta el clima actual de cualquier ciudad con un diseño moderno y minimalista.
      </p>
      <button
        @click="goToWeather"
        class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 text-lg shadow-lg"
      >
        Ir al widget de clima
      </button>
    </div>
  </div>
</template>
