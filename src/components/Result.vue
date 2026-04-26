<script lang="ts" setup>
import { computed } from 'vue'
import Bar from './Bar.vue'

const { value, total } = defineProps<{ label?: string; value: number; total: number }>()
const percent = computed(() => Math.round((value / total) * 100))
</script>

<template>
  <section class="flex flex-col gap-2">
    <div class="flex items-end justify-between">
      <div class="flex items-center gap-3">
        <div
          class="grid size-8 place-items-center rounded-full bg-current text-xl *:text-slate-950"
        >
          <slot name="icon"> </slot>
        </div>
        <div class="font-bold uppercase">
          <span>{{ label }}</span>
          <span class="ml-4 opacity-50">{{ value }}</span>
        </div>
      </div>
      <div class="font-display text-right text-4xl font-extrabold text-current">
        {{ percent }} %
      </div>
    </div>
    <Bar class="h-4" :percent="percent" :votes="value" />
  </section>
</template>
