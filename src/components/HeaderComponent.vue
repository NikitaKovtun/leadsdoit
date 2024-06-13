<template>
  <div class="header-component">
    <div class="container">
      <div class="header-component-content">
        <div class="header-component-title">
          <h2 @click="toHome">Notes List</h2>
        </div>
        <div class="header-component-action">
          <button
            class="header-component-action-btn header-component-action-btn-save"
            @click="saveState"
          >
            Save state
          </button>
          <button class="header-component-action-btn" @click="createNote">Create note</button>
        </div>
        <!--  ability to add navigation, login, etc. in future -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapGetters(['getNotes'])
  },
  beforeMount() {
    if (localStorage.getItem('notesList')) {
      this.setNotes(JSON.parse(localStorage.getItem('notesList')))
    }
  },
  methods: {
    ...mapActions(['setNotes']),
    createNote() {
      this.$router.push({ name: 'note' })
    },
    toHome() {
      this.$router.push({ name: 'home' })
    },
    saveState() {
      localStorage.setItem('notesList', JSON.stringify(this.getNotes))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/header.scss';
</style>
