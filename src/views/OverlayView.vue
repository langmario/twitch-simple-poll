<script setup lang="ts">
import Overlay from '@/components/Overlay.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useChatCounter } from '@/useChatCounter.ts'

const route = useRoute()
const channel = computed(() => route.params.channel)

const { results, showResults, clear } = useChatCounter(channel.value?.toString() ?? '')
</script>

<template>
  <div class="grid size-full items-end justify-stretch overflow-hidden p-2 pb-7">
    <Transition
      enter-from-class="translate-y-full opacity-0 blur-xs scale-75"
      leave-to-class="translate-y-full opacity-0 blur-xs scale-75"
      enter-active-class="transition duration-1500 ease-in-out"
      leave-active-class="transition duration-1500 ease-in-out"
      @after-leave="clear()"
    >
      <Overlay v-if="showResults" :results="results" />
    </Transition>
  </div>
</template>
