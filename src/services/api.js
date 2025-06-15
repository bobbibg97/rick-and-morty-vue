const API_URL = 'https://rickandmortyapi.com/api';

export const api = {
  async getCharacters(page = 1, filters = {}) {
    try {
      let url = `${API_URL}/character/?page=${page}`;
      
      // Agregar filtros a la URL si existen
      if (filters.name) url += `&name=${encodeURIComponent(filters.name)}`;
      if (filters.status) url += `&status=${encodeURIComponent(filters.status)}`;
      if (filters.species) url += `&species=${encodeURIComponent(filters.species)}`;
      if (filters.gender) url += `&gender=${encodeURIComponent(filters.gender)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return {
        results: data.results,
        info: data.info
      };
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  },

  async getCharacterById(id) {
    try {
      const response = await fetch(`${API_URL}/character/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching character ${id}:`, error);
      throw error;
    }
  }
};