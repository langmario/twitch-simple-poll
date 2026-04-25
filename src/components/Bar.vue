<script lang="ts" setup>
defineProps<{
  votes: number
  percent: number
}>()
</script>

<template>
  <div class="overflow-hidden rounded bg-white/5">
    <div
      class="flex h-full items-center justify-center rounded bg-current transition-all duration-300 ease-out"
      :style="{ width: `${percent}%` }"
    ></div>
  </div>
</template>
