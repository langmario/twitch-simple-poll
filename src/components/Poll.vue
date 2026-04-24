<script setup lang="ts">
import { computed } from 'vue'
import Bar from './Bar.vue'
const {
  truthy = 0,
  maybe = 0,
  falsy = 0,
} = defineProps<{
  truthy?: number
  maybe?: number
  falsy?: number
}>()
const total = computed(() => truthy + maybe + falsy)
</script>

<template>
  <div
    id="poll"
    class="flex h-full flex-col justify-center rounded-4xl border-2 border-mist-800/95 bg-mist-950/95 px-8 py-4 text-white shadow-lg/50 backdrop-blur-sm"
  >
    <h1 class="mb-4 text-center text-2xl font-bold">Chat Poll</h1>
    <Bar :truthy="truthy" :maybe="maybe" :falsy="falsy" class="grow" />
    <small class="mt-2 block text-center text-sm font-bold opacity-50">{{ total }} votes</small>
  </div>
</template>
