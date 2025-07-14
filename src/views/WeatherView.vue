<template>
  <div
    class="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#2e3192] via-[#8f6ed5] to-[#e94057] flex items-center justify-center"
  >
    <WeatherWidget />
  </div>
</template>

<script setup lang="ts">
import WeatherWidget from '../components/WeatherWidget.vue'
</script>
