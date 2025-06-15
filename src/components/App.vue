<template>
  <div 
    :class="[
      'min-h-screen transition-all duration-500',
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white' 
        : 'bg-gradient-to-br from-green-100 via-white to-green-200 text-gray-900'
    ]"
  >
    <!-- Header con efecto de cristal mejorado -->
    <header 
      class="sticky top-0 z-40 p-4 flex flex-col sm:flex-row justify-between items-center shadow-lg backdrop-blur-md transition-all duration-500"
      :class="[
        isDark 
          ? 'bg-gray-900/70 border-b border-green-800' 
          : 'bg-white/70 border-b border-green-200'
      ]"
    >
      <div class="flex items-center gap-3 mb-4 sm:mb-0">
        <div class="relative group">
          <img 
            src="./assets/logo.png" 
            alt="Logo" 
            class="w-12 h-12 rounded-full shadow-lg border-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
            :class="isDark ? 'border-green-400' : 'border-green-500'"
          />
          <div 
            class="absolute inset-0 rounded-full animate-pulse transition-all duration-500"
            :class="isDark ? 'bg-green-500/20' : 'bg-green-500/10'"
          ></div>
          <!-- Efecto de brillo en hover -->
          <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -rotate-45"></div>
        </div>
        <h1 class="text-2xl font-bold relative group">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300 group-hover:from-green-500 group-hover:to-green-300">
            Rick and Morty
          </span>
          <span class="text-sm font-normal ml-2 opacity-75 transition-all duration-300 group-hover:opacity-100">Explorador</span>
        </h1>
      </div>
      
      <div class="flex items-center gap-4">
        <!-- Toggle de modo oscuro mejorado -->
        <button 
          @click="toggleDark" 
          class="relative p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12"
          :class="isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-green-100 text-gray-600 hover:bg-green-200'"
        >
          <span class="material-icons text-2xl transition-transform duration-500" :class="{ 'rotate-180': isDark }">
            {{ isDark ? 'light_mode' : 'dark_mode' }}
          </span>
          <span class="sr-only">{{ isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro' }}</span>
          <!-- Efecto de resplandor -->
          <div class="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-current to-transparent -rotate-45"></div>
        </button>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="p-4 container mx-auto">
      <!-- Sección de Favoritos -->
      <div v-if="favorites.length" class="mb-8 animate-fade-in">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span class="material-icons text-yellow-400">star</span>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
            Favoritos
          </span>
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            v-for="fav in favorites" 
            :key="fav.id" 
            class="relative bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-102 group animate-slide-up"
          >
            <div class="relative h-48">
              <img 
                :src="fav.image" 
                :alt="fav.name" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button 
                @click.stop="toggleFav(fav)"
                class="absolute top-2 right-2 text-2xl transition-all duration-300 hover:scale-125 hover:rotate-12"
              >
                <span class="material-icons text-yellow-400">star</span>
              </button>
            </div>
            
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2" :class="isDark ? 'text-white' : 'text-gray-900'">
                {{ fav.name }}
              </h3>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span 
                  class="inline-block w-2 h-2 rounded-full"
                  :class="{
                    'bg-green-500': fav.status === 'Alive',
                    'bg-red-500': fav.status === 'Dead',
                    'bg-gray-500': fav.status === 'unknown'
                  }"
                ></span>
                {{ fav.status }} - {{ fav.species }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CharacterTable 
        @show-modal="showModal" 
        @toggle-fav="toggleFav" 
        :favorites="favorites"
        :isDark="isDark"
      />
      
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <CharacterModal 
          v-if="modalCharacter" 
          :character="modalCharacter" 
          @close="modalCharacter = null"
          @toggle-fav="toggleFav"
        />
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import CharacterTable from './components/CharacterTable.vue'
import CharacterModal from './components/CharacterModal.vue'
import { storage } from './services/storage'

const isDark = ref(false)
const themeChanging = ref(false)
const favorites = ref([])
const modalCharacter = ref(null)

// Funciones
function toggleDark() {
  themeChanging.value = true
  isDark.value = !isDark.value
  
  // Actualizar clase dark en el HTML y guardar preferencia
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
  
  // Resetear el indicador de cambio después de la animación
  setTimeout(() => {
    themeChanging.value = false
  }, 500)
}

function showModal(character) {
  modalCharacter.value = character
}

function toggleFav(character) {
  const idx = favorites.value.findIndex(f => f.id === character.id)
  if (idx === -1) {
    favorites.value.push(character)
  } else {
    favorites.value.splice(idx, 1)
  }
  saveFavorites()
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

// Efectos
onMounted(() => {
  // Restaurar modo oscuro
  const savedTheme = localStorage.getItem('darkMode')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  } else {
    // Si no hay preferencia guardada, usar preferencia del sistema
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', isDark.value)
  }
  
  // Restaurar favoritos
  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }
  
  // Escuchar cambios en la preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
      isDark.value = e.matches
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  })
})

// Observar cambios en favoritos para mantener sincronizado el estado
watch(favorites, saveFavorites, { deep: true })
</script>

<style>
/* Estilos globales */
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Fondo animado con patrón */
.bg-gradient-to-br {
  position: relative;
  overflow: hidden;
}

.bg-gradient-to-br::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.1;
  background-image:
    repeating-linear-gradient(135deg, currentColor 0 2px, transparent 2px 40px),
    repeating-linear-gradient(45deg, currentColor 0 2px, transparent 2px 40px);
  z-index: 0;
}

main, header {
  position: relative;
  z-index: 1;
}

/* Utilidades personalizadas */
.scale-102 {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

/* Mejoras de accesibilidad */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
