import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/types/Todo.vue'

export const useTodosStore = defineStore('todo', () => {
  const todos = reactive<Todo[]>([
    { id: 0, text: 'test', done: false, isEditing: false },
    { id: 1, text: 'test done', done: true, isEditing: false }
  ])
  const pendingTodos = computed(() => todos.filter((todo) => !todo.done))
  const completedTodos = computed(() => todos.filter((todo) => todo.done))

  const nextId = ref(2)

  function addTodo(text: string) {
    todos.push({
      id: nextId.value,
      text,
      done: false,
      isEditing: false
    })
    nextId.value++
  }

  function editTodo(todo: Todo) {
    const todoIndex = todos.findIndex((item) => item.id === todo.id)
    if (todoIndex !== -1) {
      todos[todoIndex] = todo
    }
  }

  function deleteTodo(id: number) {
    const index = todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.splice(index, 1)
    }
  }

  return { addTodo, editTodo, deleteTodo, todos, pendingTodos, completedTodos }
})
