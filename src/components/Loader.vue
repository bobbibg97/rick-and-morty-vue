<template>
  <div class="fixed inset-0 z-40 flex justify-center items-center backdrop-blur-sm transition-all duration-300">
    <div class="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl transform transition-all duration-500">
      <div class="portal-loader relative">
        <svg class="animate-portal-spin" width="100" height="100" viewBox="0 0 100 100">
          <!-- Portal exterior -->
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="8" class="text-green-500 dark:text-green-400">
            <animate attributeName="stroke-dasharray" from="0 283" to="283 283" dur="1.5s" />
          </circle>
          
          <!-- Espiral interior -->
          <path d="M50,10 A40,40 0 0,1 90,50" fill="none" stroke="currentColor" stroke-width="6" 
                class="text-green-300 dark:text-green-600" stroke-linecap="round">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </path>
          
          <!-- Destellos mejorados -->
          <g class="portal-particles">
            <circle cx="50" cy="15" r="3" class="text-green-400 dark:text-green-300 filter blur-sm" fill="currentColor">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="85" cy="50" r="3" class="text-green-400 dark:text-green-300 filter blur-sm" fill="currentColor">
              <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="2;4;2" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="85" r="3" class="text-green-400 dark:text-green-300 filter blur-sm" fill="currentColor">
              <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="r" values="2;4;2" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="15" cy="50" r="3" class="text-green-400 dark:text-green-300 filter blur-sm" fill="currentColor">
              <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="2;4;2" dur="2s" begin="1.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        <!-- Texto de carga con animación -->
        <div class="text-center mt-4">
          <p class="text-gray-600 dark:text-gray-300 font-medium animate-pulse">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const messages = [
  'Buscando en el multiverso...',
  'Atravesando portales...',
  'Consultando a Rick...',
  'Calibrando el Portal Gun...',
  'Esquivando Chronenbergs...'
]

const message = ref(messages[Math.floor(Math.random() * messages.length)])

// Cambiar mensaje cada 3 segundos
let interval
onMounted(() => {
  interval = setInterval(() => {
    message.value = messages[Math.floor(Math.random() * messages.length)]
  }, 3000)
})

// Limpiar el intervalo cuando el componente se destruye
onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.animate-portal-spin {
  animation: portal-spin 2s linear infinite;
}

@keyframes portal-spin {
  0% {
    filter: hue-rotate(0deg) drop-shadow(0 0 5px currentColor);
  }
  50% {
    filter: hue-rotate(180deg) drop-shadow(0 0 10px currentColor);
  }
  100% {
    filter: hue-rotate(360deg) drop-shadow(0 0 5px currentColor);
  }
}

.portal-particles circle {
  filter: drop-shadow(0 0 3px currentColor);
}
</style>
