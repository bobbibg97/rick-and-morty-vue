<template>
  <div>
    <div class="mb-4 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 sm:justify-between sm:items-center">
      <!-- Controles de búsqueda y filtros -->
      <div class="flex flex-wrap gap-2 w-full sm:w-auto">
        <div class="relative flex-grow sm:flex-grow-0">
          <span class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
          <input 
            v-model="search" 
            placeholder="Buscar por nombre..." 
            class="pl-10 w-full sm:w-64 border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 transition-all duration-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white/90"
          />
        </div>
        
        <!-- Filtros -->
        <select 
          v-model="filterStatus" 
          class="flex-grow sm:flex-grow-0 border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 transition-all duration-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white/90"
        >
          <option value="">Estado</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>

        <select 
          v-model="filterGender" 
          class="flex-grow sm:flex-grow-0 border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 transition-all duration-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white/90"
        >
          <option value="">Género</option>
          <option value="Female">Femenino</option>
          <option value="Male">Masculino</option>
          <option value="Genderless">Sin género</option>
          <option value="unknown">Desconocido</option>
        </select>

        <select 
          v-model="filterSpecies" 
          class="flex-grow sm:flex-grow-0 border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 transition-all duration-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white/90"
        >
          <option value="">Especie</option>
          <option value="Human">Humano</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Animal">Animal</option>
          <option value="Mythological">Mitológico</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      <!-- Botones de acción -->
      <div class="flex gap-2 justify-end">
        <button 
          @click="toggleView" 
          class="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2"
          :title="isGridView ? 'Ver como tabla' : 'Ver como cuadrícula'"
        >
          <span class="material-icons">{{ isGridView ? 'table_rows' : 'grid_view' }}</span>
        </button>
        <button 
          @click="exportCSV" 
          class="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-semibold flex items-center gap-2"
        >
          <span class="material-icons">download</span>
          <span class="hidden sm:inline">Exportar CSV</span>
        </button>
      </div>
    </div>

    <!-- Vista de cuadrícula -->
    <div v-if="isGridView" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="character in filteredCharacters" 
           :key="character.id"           class="group bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer relative"
           @click="onCharacterClick(character)">
        
        <!-- Botón de favorito -->
        <button 
          @click.stop="toggleFav(character)"
          class="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:scale-110 transform"
          :title="character.isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'"
        >
          <span class="material-icons text-2xl"
                :class="{
                  'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]': character.isFav,
                  'text-white hover:text-yellow-100': !character.isFav
                }">
            {{ character.isFav ? 'star' : 'star_outline' }}
          </span>
        </button>

        <!-- Contenedor de imagen con ratio aspect -->
        <div class="aspect-w-4 aspect-h-3 relative overflow-hidden">
          <img 
            :src="character.image" 
            :alt="character.name" 
            class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
            loading="lazy"
          />
        </div>
        
        <!-- Contenido de la tarjeta -->
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-300">
            {{ character.name }}
          </h3>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span 
              class="inline-block w-2 h-2 rounded-full"
              :class="{
                'bg-green-500': character.status === 'Alive',
                'bg-red-500': character.status === 'Dead',
                'bg-gray-500': character.status === 'unknown'
              }"
            ></span>
            <span class="line-clamp-1">{{ character.status }} - {{ character.species }}</span>
          </div>
          <div class="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
            {{ character.origin.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de tabla -->
    <div v-else class="overflow-x-auto">
      <table class="w-full bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg">
        <thead>
          <tr class="text-left border-b dark:border-gray-700">
            <th class="p-4">Nombre</th>
            <th class="p-4">Estado</th>
            <th class="p-4">Especie</th>
            <th class="p-4">Género</th>
            <th class="p-4">Origen</th>
            <th class="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="character in filteredCharacters" 
              :key="character.id"
              class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <td class="p-4">
              <div class="flex items-center gap-3">
                <img 
                  :src="character.image" 
                  :alt="character.name" 
                  class="w-12 h-12 rounded-lg object-cover"
                  loading="lazy"
                />
                <span class="font-medium">{{ character.name }}</span>
              </div>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-2">
                <span 
                  class="inline-block w-2 h-2 rounded-full"
                  :class="{
                    'bg-green-500': character.status === 'Alive',
                    'bg-red-500': character.status === 'Dead',
                    'bg-gray-500': character.status === 'unknown'
                  }"
                ></span>
                {{ character.status }}
              </div>
            </td>
            <td class="p-4">{{ character.species }}</td>
            <td class="p-4">{{ character.gender }}</td>
            <td class="p-4">{{ character.origin.name }}</td>
            <td class="p-4">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="toggleFav(character)"
                  class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span class="material-icons text-2xl"
                        :class="{
                          'text-yellow-400': character.isFav,
                          'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300': !character.isFav
                        }">
                    {{ character.isFav ? 'star' : 'star_outline' }}
                  </span>
                </button>
                <button 
                  @click="onCharacterClick(character)"
                  class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span class="material-icons text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                    visibility
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loader y mensajes -->
    <AppLoader v-if="loading"/>
    <ErrorMessage
      v-if="error"
      :title="error.title"
      :message="error.message"
      @retry="fetchCharacters"
      @close="error = null"
    />
    <div v-if="!loading && filteredCharacters.length === 0" 
         class="text-center p-8 bg-white/90 dark:bg-gray-800/90 rounded-xl mt-4">
      <span class="material-icons text-4xl text-gray-400 mb-2">search_off</span>
      <p class="text-gray-500 dark:text-gray-400">No se encontraron resultados.</p>
    </div>

    <!-- Paginación -->
    <div v-if="!loading && pagination.pages > 1" class="mt-6 flex justify-center gap-2">
      <button 
        @click="changePage(pagination.current - 1)"
        :disabled="pagination.current === 1"
        class="px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class=" [
          isDark 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        ]"
      >
        <span class="material-icons">navigate_before</span>
      </button>

      <div class="flex items-center gap-2">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="changePage(page)"
          class="min-w-[2.5rem] h-10 rounded-lg transition-all duration-200 font-medium"
          :class=" [
            page === pagination.current
              ? isDark
                ? 'bg-green-600 text-white'
                : 'bg-green-500 text-white'
              : isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button 
        @click="changePage(pagination.current + 1)"
        :disabled="pagination.current === pagination.pages"
        class="px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class=" [
          isDark 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        ]"
      >
        <span class="material-icons">navigate_next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import AppLoader from './Loader.vue'
import ErrorMessage from './ErrorMessage.vue'
import { api } from '../services/api'
import { storage } from '../services/storage'

const emit = defineEmits(['show-modal', 'toggle-fav'])
const props = defineProps({
  favorites: {
    type: Array,
    required: true
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

// Estado
const characters = ref([])
const loading = ref(true)
const search = ref('')
const filterStatus = ref('')
const filterGender = ref('')
const filterSpecies = ref('')
const isGridView = ref(true)
const error = ref(null)
const pagination = ref({
  current: 1,
  pages: 1,
  count: 0
})

// Computed properties
const visiblePages = computed(() => {
  const current = pagination.value.current
  const total = pagination.value.pages
  const delta = 2
  
  let pages = []
  pages.push(1)
  
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    pages.push(i)
  }
  
  if (total > 1) {
    pages.push(total)
  }
  
  const withEllipsis = []
  pages.forEach((page, i) => {
    if (i > 0 && page - pages[i - 1] > 1) {
      withEllipsis.push('...')
    }
    withEllipsis.push(page)
  })
  
  return withEllipsis
})

const filteredCharacters = computed(() => {
  return characters.value
})

// Métodos
async function fetchCharacters(page = 1) {
  loading.value = true
  error.value = null
  try {
    const filters = {
      name: search.value || undefined,
      status: filterStatus.value || undefined,
      species: filterSpecies.value || undefined,
      gender: filterGender.value || undefined
    }
    
    const { results, info } = await api.getCharacters(page, filters)
    
    characters.value = results.map(c => ({
      ...c,
      isFav: props.favorites.some(f => f.id === c.id)
    }))
    
    pagination.value = {
      current: page,
      pages: info.pages,
      count: info.count
    }
  } catch (err) {
    console.error('Error:', err)
    error.value = {
      title: 'Error al cargar los personajes',
      message: 'No pudimos conectar con el multiverso. ¿Quieres intentarlo de nuevo?'
    }
    characters.value = []
    pagination.value = { current: 1, pages: 1, count: 0 }
  } finally {
    loading.value = false
  }
}

async function changePage(page) {
  if (page < 1 || page > pagination.value.pages) return
  await fetchCharacters(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onCharacterClick(character) {
  emit('show-modal', character)
}

function toggleFav(character) {
  emit('toggle-fav', character)
}

function toggleView() {
  isGridView.value = !isGridView.value
  storage.saveViewPreference(isGridView.value ? 'grid' : 'table')
}

function exportCSV() {
  const rows = filteredCharacters.value.map(c =>
    [c.name, c.species, c.gender, c.status, c.origin.name].join(',')
  )
  const csv = 'Nombre,Especie,Género,Estado,Origen\n' + rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'personajes.csv'
  a.click()
  URL.revokeObjectURL(url)
}

// Watchers
watch([search, filterStatus, filterGender, filterSpecies], () => {
  fetchCharacters(1) // Volver a la primera página al cambiar los filtros
})

watch(props.favorites, (newFavs) => {
  characters.value.forEach(c => {
    c.isFav = newFavs.some(f => f.id === c.id)
  })
}, { deep: true })

// Lifecycle hooks
onMounted(() => {
  fetchCharacters()
  const preferredView = storage.getViewPreference()
  if (preferredView) {
    isGridView.value = preferredView === 'grid'
  }
})
</script>

<style scoped>
.shadow-glow {
  box-shadow: 0 0 10px currentColor;
}

/* Efecto hover en las cards */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Animación del botón de favorito */
.favorite-bounce {
  animation: bounce 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) both;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}
</style>