<script setup lang="ts">
import TodoList from '@/components/TodoList.vue';
import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';

const todosStore = useTodosStore();
const { completedTodos } = storeToRefs(todosStore)

</script>

<template>
  <div class="completed">
    <h1>Completed</h1>
    <TodoList v-bind:todos="completedTodos" />
    <p class="no-todos" v-if="completedTodos.length === 0">No completed todos!</p>
  </div>
</template>

<style scoped>
.completed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>