<script setup lang="ts">
import Overlay from '@/components/Overlay.vue'
import { type Results } from '@/types'
import { onMounted, ref } from 'vue'

const results = ref<Results>({
  yes: 0,
  no: 0,
  maybe: 0,
})

const isActive = ref(false)

async function startDemo() {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  results.value['yes'] = 1
  isActive.value = true
  await delay(1000)
  for (let i = 0; i < 99; i++) {
    const idx = Math.random()
    if (idx > 0.45) {
      results.value['yes'] += 1
    } else if (idx > 0.02) {
      results.value['no'] += 1
    } else {
      results.value['maybe'] += 1
    }
    await delay(Math.random() * i * 10)
  }
}

onMounted(async () => {
  await startDemo()
})
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
