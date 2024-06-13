<template>
  <div class="note-item-component">
    <div class="note-item-component-name">
      <h2 class="note-item-component-name-text" @click="editNote">
        <icon-star v-if="note.favorite" />
        {{ note.name }}
      </h2>
      <icon-edit class="note-item-component-name-icon" @click="editNote" />
    </div>
    <div class="note-item-component-info">
      <span class="note-item-component-info-date">{{ noteDate }}</span>
      <span
        class="note-item-component-info-category"
        v-for="category of note.categories"
        :key="category"
        @click="showCategory(category)"
      >
        #{{ category }}
      </span>
    </div>
    <div class="note-item-component-content" v-html="note.content"></div>
  </div>
</template>

<script>
import IconEdit from './icons/IconEdit.vue'
import IconStar from './icons/IconStar.vue'

export default {
  name: 'NoteItem',
  components: {
    IconEdit,
    IconStar
  },
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showEditIcon: false
    }
  },
  computed: {
    noteDate() {
      const date = new Date(this.note.edited_at ? this.note.edited_at : this.note.created_at)
      return date.toLocaleString()
    }
  },
  methods: {
    editNote() {
      this.$router.push({ name: 'note', params: { id: this.note.id } })
    },
    showCategory(category) {
      this.$emit('filterByCategory', category)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/note-form';
</style>
