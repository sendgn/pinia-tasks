<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter -->
    <nav class="filter">
      <p>
        Total:
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
    <!-- loading -->
    <div class="loading" v-if="taskStore.loading">Loading tasks...</div>
    <!-- task list (all) -->
    <div class="task-list" v-if="filter === 'all'">
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- task list (favorites) -->
    <div class="task-list" v-if="filter === 'favs'">
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue';
  import { useTaskStore } from './stores/TaskStore';
  import TaskDetails from './components/TaskDetails.vue';
  import TaskForm from './components/TaskForm.vue';

  export default {
    components: { TaskDetails, TaskForm },
    setup() {
      const taskStore = useTaskStore();
      // fetch tasks
      taskStore.getTasks();
      const filter = ref('all');
      return { taskStore, filter };
    }
  };
</script>
