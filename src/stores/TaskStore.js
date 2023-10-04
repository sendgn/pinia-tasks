import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false
  }),
  getters: {
    favs() {
      return this.tasks.filter(t => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((acc, cur) => {
        return cur.isFav ? acc + 1 : acc;
      }, 0);
    },
    totalCount: (state) => state.tasks.length
  },
  actions: {
    async getTasks() {
      this.loading = true;
      try {
        const resp = await fetch('http://localhost:3000/tasks');
        const data = await resp.json();
        this.tasks = data;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }      
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    }
  }
})