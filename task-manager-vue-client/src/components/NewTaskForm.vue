<template>
  <form class="flex justify-between mb-2 gap-2">
    <label for="text" class="flex flex-1 flex-col"
      >Title:
      <input @focus="$emit('cancel-edit')" type="text" id="text" v-model="taskTitle" class="p-2 bg-white border border-slate-200 rounded-md" autofocus />
    </label>
    <button
      class="flex bg-green-400 text-white font-semibold self-end rounded-md px-4 py-2 hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer transition-all"
      type="submit"
      @click.prevent="saveTask"
    >
      Save
    </button>
  </form>
</template>

<script setup>
import { useMutation,useQueryClient } from '@tanstack/vue-query';
import {ref} from 'vue'

const taskTitle = ref('')
const emit = defineEmits(['cancel-edit'])

const queryClient = useQueryClient()

const createTaskMutation = useMutation({
  mutationKey: ['create-task'],
  mutationFn: (task) => {
    fetch(`/api/tasks`, {
      method: 'POST',
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

const saveTask = () => {
  createTaskMutation.mutate({
    task: taskTitle.value,
  });
  taskTitle.value = ''
}
</script>

<style scoped>
/* Your component's CSS styles go here */
</style>
