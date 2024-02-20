<script setup lang="ts">
import { useTodosStore } from '@/stores/todos';
import type { Todo } from '@/types/Todo.vue';
import { reactive } from 'vue';
const { editTodo, deleteTodo } = useTodosStore();


defineProps<{
    todos: Todo[]
}>()

const state = reactive({
    inputText: '',
    isEditing: false,
});

const openEditItem = (item: Todo, index: number) => {
    console.log(index)
    if (!item.isEditing) {
        state.isEditing = !state.isEditing;
        editTodo({ ...item, isEditing: true });

    }
};

const handleSaveTodo = (item: Todo) => {
    if (state.inputText !== '') {
        editTodo({ ...item, text: state.inputText, isEditing: false })
    } else {
        editTodo({ ...item, isEditing: false })
    }
}

</script>

<template>
    <ul>
        <li v-for="(todo, index) in todos" :key="todo.id">
            <span>

                <input type="checkbox" v-model="todo.done" @change="handleSaveTodo(todo)" />

                <span v-if="!todo.isEditing" :class="{ done: todo.done }"
                    @click="openEditItem(todo, index)">
                    {{ todo.text }}
                </span>

                <input v-else type="text" v-model="todo.text" @change="editTodo(todo)"
                    @input="state.inputText = ($event.target as HTMLTextAreaElement).value" />

            </span>
            <button v-if="!todo.isEditing" @click="deleteTodo(todo.id)">Delete</button>

            <button v-else @click="handleSaveTodo(todo)">Save</button>
        </li>
    </ul>
</template>
 
<style scoped>
ul {
    border: 1px solid #666;
    border-radius: 5px;
    padding: 10px;
}

li,
li>span {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>