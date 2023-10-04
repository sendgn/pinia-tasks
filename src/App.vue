<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <!-- filter -->
    <nav class="filter">
      <p>
        Count:
        <span>
          {{ filter === 'all' ? taskStore.totalCount : taskStore.favCount }}
        </span>
      </p>
      <div>
        <button
          @click="filter = 'all'"
          :class="{ active: filter === 'all' }"
        >All tasks</button>
        <button
          @click="filter = 'favs'"
          :class="{ active: filter === 'favs' }"
        >Fav tasks</button>
      </div>
    </nav>
    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue'
  import TaskDetails from './components/TaskDetails.vue'
  import { useTaskStore } from './stores/TaskStore'

  export default {
    components: { TaskDetails },
    setup() {
      const taskStore = useTaskStore()

      const filter = ref('all')

      return { taskStore, filter }
    }
  }
</script>
