<script setup lang="ts">
import TodoList from '@/components/TodoList.vue';

import { useTodosStore } from '@/stores/todos';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';


const todosStore = useTodosStore();
const { addTodo } = todosStore;
const { pendingTodos, completedTodos } = storeToRefs(todosStore)
const state = reactive({
  input: '',
});

const handleAddTodo = (todo: string) => {
  if (todo != '') {

    addTodo(todo);
    state.input = '';
  }
}; 
</script>

<template>
  <div class="home">

    <h1>ToDo List</h1>
    <input @change="handleAddTodo(($event.target as HTMLTextAreaElement).value)"
      @keypress="state.input = ($event.target as HTMLTextAreaElement).value" v-model="state.input"
      placeholder="Add a new todo" />
    <button @click="handleAddTodo(state.input)">Add</button>
    <TodoList :todos="pendingTodos" />

    <h2>Completed</h2>
    <TodoList :todos="completedTodos" />
  </div>
</template>

 