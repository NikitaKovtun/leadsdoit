import { createStore } from 'vuex'

export default createStore({
  state: {
    notes: [],
    updatedNotesList: []
  },
  getters: {
    getNotes(state) {
      return state.updatedNotesList.length ? state.updatedNotesList : state.notes
    },
    getNotesById(state) {
      return (id) => state.notes.find((note) => note.id === id)
    }
  },
  mutations: {
    ADD_NOTES(state, note) {
      state.notes.push(note)
    },
    SET_NOTES(state, note) {
      state.notes = note
    },
    UPDATE_NOTE(state, note) {
      const editingNoteIndex = state.notes.findIndex((item) => item.id === note.id)
      state.notes[editingNoteIndex] = note
    },
    DELETE_NOTE(state, id) {
      const deletedIndex = state.notes.findIndex((note) => note.id === id)
      state.notes.splice(deletedIndex, 1)
    },
    SORT_NOTES(state, value) {
      state.updatedNotesList = [...state.notes].sort((a, b) =>
        a[value] > b[value] ? 1 : b[value] > a[value] ? -1 : 0
      )
    },
    FILTER_FAVORITES_NOTES(state) {
      state.updatedNotesList = [...state.notes].filter((note) => note.favorite)
    },
    FILTER_NOTES_BY_CATEGORY(state, category) {
      state.updatedNotesList = [...state.notes].filter((note) => {
        return note.categories.includes(category)
      })
    },
    CLEAR_UPDATED_NOTES(state) {
      state.updatedNotesList = []
    }
  },
  actions: {
    addNote({ commit }, note) {
      note.created_at = Date.now()
      note.edited_at = note.created_at
      commit('ADD_NOTES', note)
    },
    updateNote({ commit }, note) {
      note.edited_at = Date.now()
      commit('UPDATE_NOTE', note)
    },
    sortNotesBy({ commit }, value) {
      value ? commit('SORT_NOTES', value) : commit('CLEAR_UPDATED_NOTES')
    },
    filteredNotesByFavorite({ commit }) {
      commit('FILTER_FAVORITES_NOTES')
    },
    filteredNotesByCategory({ commit }, category) {
      commit('FILTER_NOTES_BY_CATEGORY', category)
    },
    clearFiltering({ commit }) {
      commit('CLEAR_UPDATED_NOTES')
    },
    setNotes({ commit }, notes) {
      commit('SET_NOTES', notes)
    }
  }
})
