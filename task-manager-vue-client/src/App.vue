<template>
  <header>
    <h1 class="text-4xl">Task manager</h1>
  </header>
  <main class="w-full h-full">
    <NewTaskForm @cancel-edit="disableEdit" />
    <TasksList>
      <TasksListItem
        v-for="task in data"
        :key="task._id"
        :task="task"
        @edit="setEditedId"
        @cancel-edit="disableEdit"
        :is-edit="editedId === task._id"
      />
    </TasksList>
  </main>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import TasksList from './components/TasksList.vue'
import TasksListItem from './components/TasksListItem.vue'
import NewTaskForm from './components/NewTaskForm.vue'
import { ref } from 'vue'

const editedId = ref()
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/api/tasks').then((res) => res.json()),
  initialData: [],
})

const setEditedId = (id) => {
  editedId.value = id
}

const disableEdit = () => {
  editedId.value = null
}
</script>
