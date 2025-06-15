<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300">
      <div class="text-center">
        <span class="material-icons text-6xl text-red-500 mb-4">error_outline</span>
        <h3 class="text-xl font-bold mb-2 dark:text-white">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">{{ message }}</p>
        <button 
          @click="$emit('retry')"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
        >
          Reintentar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Error'
  },
  message: {
    type: String,
    required: true
  }
})

defineEmits(['close', 'retry'])
</script>
