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
  </div>
  <TodoList v-bind:todos="completedTodos" />
</template>

 