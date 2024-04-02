<template>
  <form class="flex flex-1 flex-col justify-between bg-slate-100 p-2 rounded-md gap-2">
    <label for="text" class="flex flex-col"
      >Title:
      <input type="text" id="text" v-model="taskTitle" class="p-4 bg-white rounded-md" autofocus />
    </label>
    <label for="completed"
      ><input type="checkbox" id="completed" v-model="completed" /> Completed</label
    >

    <fieldset class="flex gap-2 justify-stretch">
      <button
        class="flex flex-1 bg-green-400 text-white font-semibold rounded-md justify-center item-center p-2 hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer transition-all"
        type="submit"
        @click.prevent="saveTask"
      >
        Save
      </button>
      <button
        class="flex flex-1 bg-stone-400 text-white font-semibold rounded-md justify-center item-center p-2 hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer transition-all"
        @click.prevent="cancelEdit"
      >
        Cancel
      </button>
      <button
        class="flex bg-red-400 text-white font-semibold rounded-md justify-center item-center p-2 hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer transition-all"
        @click.prevent="deleteTask"
      >
        Delete
      </button>
    </fieldset>
  </form>
</template>

<script setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'

const props = defineProps(['task'])
const emit = defineEmits(['cancel-edit'])
const queryClient = useQueryClient()

const taskTitle = ref(props.task.task)
const completed = ref(props.task.completed)

const updateMutation = useMutation({
  mutationKey: ['update-task'],
  mutationFn: ({ _id, ...task }) => {
    fetch(`/api/tasks/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    emit('cancel-edit')
  },
  onSettled: () => {
    return queryClient.invalidateQueries(['todos'])
  }
})

const deleteMutation = useMutation({
  mutationKey: ['delete-task'],
  mutationFn: (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    })
    emit('cancel-edit')
  },
  onSettled: () => {
    return queryClient.invalidateQueries(['todos'])
  }
})

const saveTask = () => {
  updateMutation.mutate({
    _id: props.task._id,
    task: taskTitle.value,
    completed: completed.value
  })
}
const deleteTask = () => {
  deleteMutation.mutate(props.task._id)
}
const cancelEdit = () => {
  emit('cancel-edit')
}
</script>
