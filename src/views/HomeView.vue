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
    <h1>Todo list </h1>

    <div class="input-container">

      <input type="text" @change="handleAddTodo(($event.target as HTMLTextAreaElement).value)"
        @input="state.input = ($event.target as HTMLTextAreaElement).value" v-model="state.input"
        placeholder="Add a new todo" />
      <button @click="handleAddTodo(state.input)">Add</button>
    </div>

    <main>
      <section>
        <h2>Pending</h2>
        <TodoList v-if="pendingTodos.length > 0" :todos="pendingTodos" />
        <p class="no-todos" v-else>Nothing todo!</p>
      </section>

      <section>
        <h2>Completed</h2>
        <TodoList v-if="completedTodos.length > 0" :todos="completedTodos" />
        <p class="no-todos" v-else>No completed todos</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 10px;
}

.input-container {
  display: flex;
}

section {
  text-align: center;
  width: 25%;
}
</style>

 