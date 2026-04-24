<script lang="ts" setup>
import { computed } from 'vue'

const {
  truthy = 0,
  maybe = 0,
  falsy = 0,
} = defineProps<{
  truthy: number
  maybe?: number
  falsy: number
}>()

const total = computed(() => truthy + maybe + falsy)
</script>

<template>
  <div class="flex justify-between overflow-hidden rounded-md text-4xl font-bold">
    <div
      class="flex min-w-min items-center justify-center bg-green-500 px-1 transition-all duration-500"
      :style="{ width: (truthy / total) * 100 + '%' }"
    >
      {{ truthy }}
    </div>
    <div
      v-if="maybe > 0"
      class="flex min-w-min items-center justify-center bg-yellow-500 px-1 transition-all duration-500"
      :style="{ width: (maybe / total) * 100 + '%' }"
    >
      {{ maybe }}
    </div>
    <div
      class="flex min-w-min items-center justify-center bg-red-500 px-1 transition-all duration-500"
      :style="{ width: (falsy / total) * 100 + '%' }"
    >
      {{ falsy }}
    </div>
  </div>
</template>
