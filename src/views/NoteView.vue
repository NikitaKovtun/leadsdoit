<template>
  <div class="note-component">
    <div class="container container-page">
      <div class="note-component-form">
        <div class="note-component-form-row note-component-form-favorite">
          <p>Mark favorite:</p>
          <input
            class="note-component-form-favorite-checkbox"
            type="checkbox"
            v-model="formData.favorite"
          />
        </div>
        <div class="note-component-form-row">
          <p>Name:</p>
          <input
            class="note-component-input"
            v-model="formData.name"
            placeholder="Put your name..."
          />
        </div>
        <div class="note-component-form-row">
          <p>Note text:</p>
          <textarea
            class="note-component-input"
            v-model="formData.content"
            placeholder="Put note content here..."
          />
        </div>
        <div class="note-component-form-row">
          <div class="note-component-form-categories">
            <div
              class="note-component-form-categories-item note-component-form-categories-item-new"
            >
              <input
                v-model="newCategory"
                placeholder="Put your category..."
                @keyup.enter="addCategory"
              />
            </div>
            <div
              :class="{
                'note-component-form-categories-item': true,
                selected: formData.categories.includes(category)
              }"
              v-for="category of categoriesList"
              :key="category"
              @click="toggleCategory(category)"
            >
              {{ category }} <span class="cross-icon" @click.stop="deleteCategory(category)"></span>
            </div>
          </div>
        </div>
        <div class="note-component-form-row note-component-form-actions">
          <button class="action-btn" @click="addUpdateNote">{{ computedButtonText }} Note</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NoteView',
  data() {
    return {
      formData: {
        name: '',
        content: '',
        categories: [],
        favorite: false
      },
      newCategory: '',
      categoriesList: ['home', 'work', 'vacation'],
      editingNote: null
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.editingNote = this.getNotesById(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['getNotes', 'getNotesById']),
    computedButtonText() {
      return this.$route.params.id ? 'Update' : 'Add'
    }
  },
  watch: {
    editingNote(noteData) {
      this.formData = { ...noteData }
      this.categoriesList = [...new Set([...this.categoriesList, ...noteData.categories])]
    }
  },
  methods: {
    ...mapActions(['addNote', 'updateNote']),
    addCategory() {
      if (!this.categoriesList.includes(this.newCategory)) {
        this.categoriesList.push(this.newCategory)
      }
      this.toggleCategory(this.newCategory)
      this.newCategory = ''
    },
    toggleCategory(category) {
      const categoryIndex = this.formData.categories.findIndex((item) => item === category)
      categoryIndex === -1
        ? this.formData.categories.push(category)
        : this.formData.categories.splice(categoryIndex, 1)
    },
    deleteCategory(category) {
      const categoryIndex = this.categoriesList.findIndex((item) => item === category)
      const selectedCategoryIndex = this.formData.categories.findIndex((item) => item === category)
      this.categoriesList.splice(categoryIndex, 1)
      if (selectedCategoryIndex !== -1) {
        this.formData.categories.splice(categoryIndex, 1)
      }
    },
    addUpdateNote() {
      this.editingNote
        ? this.updateNote(this.formData)
        : this.addNote({ ...this.formData, id: 'id' + Math.random().toString(16).slice(2) })
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/note-form';
</style>
