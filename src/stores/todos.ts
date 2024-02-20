import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/types/Todo.vue'

const getTodosFromLocalStorage = JSON.parse(localStorage.getItem('todos') || '[]')
const saveTodosToLocalStorage = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

export const useTodosStore = defineStore('todo', () => {
  const todos = reactive<Todo[]>(getTodosFromLocalStorage)
  const pendingTodos = computed(() => todos.filter((todo) => !todo.done))
  const completedTodos = computed(() => todos.filter((todo) => todo.done))

  const generateRandomId = () => Math.floor(Math.random() * 100000)

  function addTodo(text: string) {
    todos.push({
      id: generateRandomId(),
      text,
      done: false,
      isEditing: false
    })
    saveTodosToLocalStorage(todos)
  }

  function editTodo(todo: Todo) {
    const todoIndex = todos.findIndex((item) => item.id === todo.id)
    if (todoIndex !== -1) {
      todos[todoIndex] = todo
    }
    saveTodosToLocalStorage(todos)
  }

  function deleteTodo(id: number) {
    const index = todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
    }
    saveTodosToLocalStorage(todos)
  }

  return { addTodo, editTodo, deleteTodo, todos, pendingTodos, completedTodos }
})
