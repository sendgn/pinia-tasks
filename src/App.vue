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
          {{ filter === 'all' ? totalCount : favCount }}
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
    <div class="loading" v-if="loading">Loading tasks...</div>
    <div class="error" v-if="error">{{ error }}</div>
    <!-- task list (all) -->
    <div class="task-list" v-if="filter === 'all'">
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- task list (favorites) -->
    <div class="task-list" v-if="filter === 'favs'">
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- reset a store state -->
    <div class="reset">
      <button @click="taskStore.$reset">Reset state</button>
    </div>
  </main>
</template>

<script>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useTaskStore } from './stores/TaskStore';
  import TaskDetails from './components/TaskDetails.vue';
  import TaskForm from './components/TaskForm.vue';

  export default {
    components: { TaskDetails, TaskForm },
    setup() {
      const taskStore = useTaskStore();

      const {
        tasks,
        loading,
        error,
        favs,
        totalCount,
        favCount
      } = storeToRefs(taskStore);

      // fetch tasks
      taskStore.getTasks();
      
      const filter = ref('all');

      return {
        taskStore,
        filter,
        tasks,
        loading,
        error,
        favs,
        totalCount,
        favCount
      };
    }
  };
</script>
