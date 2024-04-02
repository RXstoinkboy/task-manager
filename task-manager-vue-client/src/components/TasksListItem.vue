<template>
  <li
    :class="
      clsx(
        'flex flex-col gap-2 justify-between bg-slate-100 rounded-md hover:cursor-pointer transition-all',
        {
          'bg-stone-50': optimisticTask.completed,
          'order-2': optimisticTask.completed,
          'hover:shadow-lg': !isEdit,
          'hover:-translate-y-1': !isEdit
        }
      )
    "
  >
    <div class="flex flex-1 flex-col">
      <span
        @click="$emit('edit', optimisticTask._id)"
        :class="
          clsx('flex-1 p-2', {
            'line-through': optimisticTask.completed,
            'opacity-50': optimisticTask.completed
          })
        "
        >{{ optimisticTask.task }}</span
      >
      <Transition name="form">
        <EditTaskForm v-if="isEdit" @cancel-edit="$emit('cancel-edit')" :task="task" />
      </Transition>
    </div>
  </li>
</template>

<script setup>
import { clsx } from 'clsx'
import { computed } from 'vue'
import { useMutationState } from '@tanstack/vue-query'
import EditTaskForm from './EditTaskForm.vue'

const props = defineProps(['task', 'isEdit'])
defineEmits(['cancel-edit', 'edit'])

const optimisticTask = computed(() => {
  if(updateTaskVariables.value[0]?._id === props.task._id) {
    return {
      ...props.task,
      task: updateTaskVariables.value[0]?.task ?? props.task.task,
      completed: updateTaskVariables.value[0]?.completed ?? props.task.completed,
    }
  }
  
  if(!props.task._id) {
    return {
      ...props.task,
      task: createTaskVariables.value[0]?.task,
      completed: false,
    }
  }
  
  return props.task
})

// In order to make optimistic updates:
// 1. assign mutationKey to the mutation
// 2. read the variables from the mutation state using 'useMutationState'
// 3. filter the mutation state by the mutationKey and status 'pending'
// 4. select the variables from the mutation state (for easier access)
// 5. use the variables in the computed property to update the task values
// NOTE on 5. (identify the task by the _id)
const updateTaskVariables = useMutationState({
  filters: { mutationKey: ['update-task'], status: 'pending' },
  select: (mutation) => mutation.state.variables
})

const createTaskVariables = useMutationState({
  filters: { mutationKey: ['create-task'], status: 'pending' },
  select: (mutation) => mutation.state.variables
})

</script>

<style scoped>
.form-enter-active,
.form-leave-active {
  transition: all 0.5s ease-in-out;
}

.form-leave-to,
.form-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
