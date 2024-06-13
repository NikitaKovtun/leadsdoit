<template>
  <div class="home-component">
    <div class="container container-page">
      <h1>Notes count: {{ getNotes.length }}</h1>
      <div class="home-component-panel">
        <div class="home-component-panel-sort">
          <span>Sorted by:</span>
          <select v-model="sortedBy">
            <option :value="null">No sorting</option>
            <option v-for="option of sortingOptions" :key="option" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="home-component-panel-filter">
          <span>Filtered by:</span>
          <select v-model="filteredBy">
            <option :value="null">No filter</option>
            <option v-for="option of filteringOptions" :key="option" :value="option.value">
              {{ option.name }}
            </option>
          </select>
          <div class="home-component-panel-filter" v-if="filteredBy === 'category'">
            <input v-model="filteredCategory" placeholder="Put filtering category..." />
          </div>
        </div>
      </div>
      <div class="notes-list">
        <note-item
          v-for="note of getNotes"
          :key="note.id"
          :note="note"
          @filterByCategory="showCategory"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NoteItem from '@/components/NoteItem.vue'

export default {
  name: 'HomeView',
  components: { NoteItem },
  emits: ['filterByCategory'],
  data() {
    return {
      count: 0,
      filteringOptions: [
        {
          name: 'Category',
          value: 'category'
        },
        {
          name: 'Favorite',
          value: 'favorite'
        }
      ],
      sortingOptions: [
        {
          name: 'Name',
          value: 'name'
        },
        {
          name: 'Date',
          value: 'edited_at'
        }
      ],
      filteredBy: null,
      sortedBy: null,
      filteredCategory: ''
    }
  },
  beforeUnmount() {
    this.sortNotesBy(null)
  },
  computed: {
    ...mapGetters(['getNotes'])
  },
  watch: {
    sortedBy(value) {
      this.sortNotesBy(value)
    },
    filteredBy(value) {
      if (!value) {
        this.clearFiltering()
      } else if (value === 'favorite') {
        this.filteredNotesByFavorite()
      }
    },
    filteredCategory(value) {
      this.filteredNotesByCategory(value)
    }
  },
  methods: {
    ...mapActions([
      'sortNotesBy',
      'filteredNotesByCategory',
      'filteredNotesByFavorite',
      'clearFiltering'
    ]),
    showCategory(categoryName) {
      this.filteredBy = 'category'
      this.filteredCategory = categoryName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/home.scss';
</style>
