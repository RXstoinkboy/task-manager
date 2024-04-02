<template>
  <TransitionGroup name="list" tag="ul" class="flex flex-col w-full border c gap-2 rounded-md p-2">
    <slot></slot>
  </TransitionGroup>
</template>

<script setup></script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
