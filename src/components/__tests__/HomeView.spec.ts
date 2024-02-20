import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import { setActivePinia, createPinia, type Store, type _UnwrapAll } from 'pinia'
import { nextTick, type ComputedRef } from 'vue'
import { useTodosStore } from '@/stores/todos'
import type { Todo } from '@/types/Todo.vue'
import HomeViewVue from '@/views/HomeView.vue'

describe('Home.vue', () => {
  let wrapper: VueWrapper<any, any>
  let todosStore: Store<
    'todo',
    _UnwrapAll<
      Pick<
        {
          addTodo: (text: string) => void
          editTodo: (todo: Todo) => void
          deleteTodo: (id: number) => void
          todos: { id: number; isEditing: boolean; text: string; done: boolean }[]
          pendingTodos: ComputedRef<
            { id: number; isEditing: boolean; text: string; done: boolean }[]
          >
          completedTodos: ComputedRef<
            { id: number; isEditing: boolean; text: string; done: boolean }[]
          >
        },
        'todos'
      >
    >,
    Pick<
      {
        addTodo: (text: string) => void
        editTodo: (todo: Todo) => void
        deleteTodo: (id: number) => void
        todos: { id: number; isEditing: boolean; text: string; done: boolean }[]
        pendingTodos: ComputedRef<{ id: number; isEditing: boolean; text: string; done: boolean }[]>
        completedTodos: ComputedRef<
          { id: number; isEditing: boolean; text: string; done: boolean }[]
        >
      },
      'pendingTodos' | 'completedTodos'
    >,
    Pick<
      {
        addTodo: (text: string) => void
        editTodo: (todo: Todo) => void
        deleteTodo: (id: number) => void
        todos: { id: number; isEditing: boolean; text: string; done: boolean }[]
        pendingTodos: ComputedRef<{ id: number; isEditing: boolean; text: string; done: boolean }[]>
        completedTodos: ComputedRef<
          { id: number; isEditing: boolean; text: string; done: boolean }[]
        >
      },
      'addTodo' | 'editTodo' | 'deleteTodo'
    >
  >

  beforeEach(() => {
    setActivePinia(createPinia())
    todosStore = useTodosStore()
    wrapper = mount(HomeViewVue)
  })

  it('should add a new todo when the add button is clicked', async () => {
    const input = wrapper.find('input[type="text"]')
    const addButton = wrapper.find('button')

    await input.setValue('New Todo')
    await addButton.trigger('click')

    expect(todosStore.pendingTodos).toContainEqual({
      id: expect.any(Number),
      text: 'New Todo',
      done: false,
      isEditing: false
    })
    expect(wrapper.vm.state.input).toBe('')
  })

  it('should clear the input after adding a todo', async () => {
    const input = wrapper.find('input[type="text"]')
    const addButton = wrapper.find('button')

    await input.setValue('Another Todo')
    await addButton.trigger('click')

    expect(wrapper.vm.state.input).toBe('')
  })

  it('should render pending todos', async () => {
    todosStore.addTodo('Pending Todo')

    await nextTick()

    const pendingSection = wrapper.find('section:first-child')
    expect(pendingSection.text()).toContain('Pending')
    expect(pendingSection.find('.no-todos').exists()).toBe(false)
    expect(pendingSection.findComponent({ name: 'TodoList' }).props('todos')).toEqual(
      todosStore.pendingTodos
    )
  })

  it('should render completed todos', async () => {
    todosStore.addTodo('completed Todo')
    const todo = todosStore.pendingTodos[0]
    todosStore.editTodo({
      ...todo,
      done: true
    })

    await nextTick()

    const completedSection = wrapper.find('section:last-child')
    expect(completedSection.text()).toContain('Completed')
    expect(completedSection.find('.no-todos').exists()).toBe(false)
    expect(completedSection.findComponent({ name: 'TodoList' }).props('todos')).toEqual(
      todosStore.completedTodos
    )
  })
})
