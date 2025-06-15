import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterTable from '../../src/components/CharacterTable.vue'
import { api } from '../../src/services/api'
import { storage } from '../../src/services/storage'

// Mock de los servicios
vi.mock('../../src/services/api', () => ({
  api: {
    getCharacters: vi.fn()
  }
}))

vi.mock('../../src/services/storage', () => ({
  storage: {
    getViewPreference: vi.fn(),
    saveViewPreference: vi.fn()
  }
}))

describe('CharacterTable', () => {
  let wrapper

  const mockCharacters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth' },
      image: 'rick.jpg'
    }
  ]

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    
    // Setup default mock responses
    api.getCharacters.mockResolvedValue({
      results: mockCharacters,
      info: { pages: 1, count: 1 }
    })
    
    storage.getViewPreference.mockReturnValue('grid')

    // Mount component
    wrapper = mount(CharacterTable, {
      props: {
        favorites: [],
        isDark: false
      },
      global: {
        stubs: {
          'AppLoader': true,
          'ErrorMessage': true
        }
      }
    })
  })

  it('renderiza correctamente en modo cuadrícula', () => {
    expect(wrapper.find('.grid').exists()).toBe(true)
  })

  it('cambia entre vista de cuadrícula y tabla', async () => {
    const toggleButton = wrapper.find('button[title="Ver como tabla"]')
    await toggleButton.trigger('click')
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('muestra el loader durante la carga', () => {
    expect(wrapper.findComponent({ name: 'AppLoader' }).exists()).toBe(true)
  })

  it('emite el evento show-modal al hacer click en un personaje', async () => {
    await wrapper.vm.$nextTick() // Esperar que se carguen los datos
    const character = wrapper.find('.cursor-pointer')
    await character.trigger('click')
    expect(wrapper.emitted()['show-modal']).toBeTruthy()
  })

  it('filtra personajes correctamente', async () => {
    const searchInput = wrapper.find('input[placeholder="Buscar por nombre..."]')
    await searchInput.setValue('Rick')
    expect(api.getCharacters).toHaveBeenCalledWith(1, expect.objectContaining({
      name: 'Rick'
    }))
  })

  it('maneja errores de API correctamente', async () => {
    api.getCharacters.mockRejectedValueOnce(new Error('API Error'))
    await wrapper.vm.fetchCharacters()
    expect(wrapper.vm.error).toBeTruthy()
  })

  it('gestiona correctamente los favoritos', async () => {
    await wrapper.vm.$nextTick()
    const favButton = wrapper.find('button[title="Añadir a favoritos"]')
    await favButton.trigger('click')
    expect(wrapper.emitted()['toggle-fav']).toBeTruthy()
  })
})
