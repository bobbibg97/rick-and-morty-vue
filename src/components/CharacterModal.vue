<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay con efecto de desenfoque -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      @click="$emit('close')"
    ></div>

    <!-- Modal con efecto de cristal -->
    <div class="relative bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden animate-scale-up">
      <!-- Header con imagen de fondo -->
      <div class="relative h-[28rem]">
        <img 
          :src="character.image" 
          :alt="character.name"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        
        <!-- Botones de acción -->
        <div class="absolute top-4 right-4 flex gap-2">
          <button 
            @click.stop="$emit('toggle-fav', character)"
            class="p-3 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 hover:scale-110 transform transition-all duration-300 group"
            :title="character.isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'"
          >
            <span class="material-icons text-3xl"
                  :class="{
                    'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]': character.isFav,
                    'text-white hover:text-yellow-100': !character.isFav
                  }">
              {{ character.isFav ? 'star' : 'star_outline' }}
            </span>
          </button>
          <button 
            @click="$emit('close')"
            class="p-3 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
          >
            <span class="material-icons text-2xl text-white">close</span>
          </button>
        </div>

        <!-- Información del personaje -->
        <div class="absolute bottom-6 left-6 right-6">
          <h2 class="text-4xl font-bold text-white mb-3">{{ character.name }}</h2>
          <div class="flex items-center gap-2">
            <span 
              class="inline-block w-3 h-3 rounded-full"
              :class="{
                'bg-green-500': character.status === 'Alive',
                'bg-red-500': character.status === 'Dead',
                'bg-gray-500': character.status === 'unknown'
              }"
            ></span>
            <span class="text-white text-xl">{{ character.status }} - {{ character.species }}</span>
          </div>
        </div>
      </div>

      <!-- Detalles del personaje -->
      <div class="p-10 space-y-8">
        <div class="grid grid-cols-2 gap-10">
          <div>
            <h3 class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Género</h3>
            <p class="text-xl font-medium dark:text-white">{{ character.gender }}</p>
          </div>
          <div>
            <h3 class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Origen</h3>
            <p class="text-xl font-medium dark:text-white">{{ character.origin?.name }}</p>
          </div>
          <div>
            <h3 class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Última ubicación</h3>
            <p class="text-xl font-medium dark:text-white">{{ character.location?.name }}</p>
          </div>
          <div>
            <h3 class="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Primera aparición</h3>
            <p class="text-xl font-medium dark:text-white">Episodio {{ character.episode?.[0]?.split('/').pop() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'toggle-fav'])
</script>

<style scoped>
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
