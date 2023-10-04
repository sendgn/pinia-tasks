import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'buy some milk', isFav: false },
      { id: 2, title: 'play Heavy Rain', isFav: true }
    ]
  }),
  getters: {
    favs() {
      return this.tasks.filter(t => t.isFav)
    },
    favCount() {
      return this.tasks.reduce((acc, cur) => {
        return cur.isFav ? acc + 1 : acc
      }, 0)
    },
    totalCount: (state) => state.tasks.length
  }
})