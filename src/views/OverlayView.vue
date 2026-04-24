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
    <Transition
      enter-from-class="translate-y-full opacity-0 blur-xs scale-75"
      leave-to-class="translate-y-full opacity-0 blur-xs scale-75"
      enter-active-class="transition duration-1500 ease-in-out"
      leave-active-class="transition duration-1500 ease-in-out"
    >
      <Overlay v-if="isActive" :results="results" />
    </Transition>
  </div>
</template>
