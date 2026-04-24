<script setup lang="ts">
import Overlay from '@/components/Overlay.vue'
import type { Results } from '@/types'
import { ref } from 'vue'

const results = ref<Results>({
  yes: 0,
  no: 0,
  maybe: 0,
})

const isActive = ref(false)
</script>

<template>
  <div class="grid size-full items-end justify-stretch overflow-hidden p-2 pb-7">
    <Overlay v-if="isActive" :results="results" />
  </div>
</template>
