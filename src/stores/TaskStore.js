import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
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
        if (!resp.ok) {
          throw new Error('Could not get tasks');
        }
        const data = await resp.json();
        this.tasks = data;
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }      
      this.loading = false;
    },
    async addTask(task) {
      try {
        const resp = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task) 
        });
        if (!resp.ok) {
          throw new Error('Could not add the task');
        }
        this.tasks.push(task);
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    },
    async deleteTask(id) {
      try {
        const resp = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'DELETE'
        });
        if (!resp.ok) {
          throw new Error('Could not delete the task');
        }
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);

      try {
        const resp = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isFav: !task.isFav })
        });
        if (!resp.ok) {
          throw new Error('Error toggling favorite');
        }
        task.isFav = !task.isFav;
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    }
  }
})