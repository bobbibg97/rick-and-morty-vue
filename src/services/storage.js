const STORAGE_KEYS = {
  FAVORITES: 'rick_morty_favorites',
  VIEW_PREFERENCE: 'rick_morty_view_preference',
  THEME: 'rick_morty_theme'
};

export const storage = {
  getFavorites() {
    try {
      const favs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favs ? JSON.parse(favs) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  saveFavorites(favorites) {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  getViewPreference() {
    return localStorage.getItem(STORAGE_KEYS.VIEW_PREFERENCE) || 'grid';
  },

  saveViewPreference(preference) {
    localStorage.setItem(STORAGE_KEYS.VIEW_PREFERENCE, preference);
  },

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};