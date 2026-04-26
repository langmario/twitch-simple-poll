<script setup lang="ts">
import Overlay from '@/components/Overlay.vue'
import { type VoteKeys, type Results, type VoteOptions } from '@/types'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Comfy from 'comfy.js'

const route = useRoute()
const channel = computed(() => route.params.channel)

const voteTimeout = ref<number>()
const showResults = ref(false)

const voteOptions: VoteOptions = {
  yes: ['y', 'yes', '1', '+'],
  no: ['n', 'no', '0', '-'],
  maybe: ['?'],
} as const

const votes = ref(new Map<string, VoteKeys>())
const results = computed(() =>
  [...votes.value.values()].reduce<Results>((prev, curr) => ({ ...prev, [curr]: prev[curr] + 1 }), {
    yes: 0,
    no: 0,
    maybe: 0,
  }),
)

function onChat(user: string, originalMessage: string) {
  const message = originalMessage.toLowerCase().trim()
  if (Object.values(voteOptions).some((options) => options.includes(message))) {
    const key = Object.entries(voteOptions).find(([, options]) =>
      options.includes(message),
    )?.[0] as VoteKeys | undefined
    if (key) {
      votes.value.set(user, key)
      clearTimeout(voteTimeout.value)
      voteTimeout.value = setTimeout(() => (showResults.value = false), 15000)
    }
  }
}

Comfy.onChat = onChat

onMounted(() => {
  if (channel.value) {
    Comfy.Init(channel.value.toString())
  }
})
watch(votes.value, (votes) => {
  if (votes.size > 3) {
    showResults.value = true
  }
})
</script>

<template>
  <div class="grid size-full items-end justify-stretch overflow-hidden p-2 pb-7">
    <Transition
      enter-from-class="translate-y-full opacity-0 blur-xs scale-75"
      leave-to-class="translate-y-full opacity-0 blur-xs scale-75"
      enter-active-class="transition duration-1500 ease-in-out"
      leave-active-class="transition duration-1500 ease-in-out"
      @after-leave="votes.clear()"
    >
      <Overlay v-if="showResults" :results="results" />
    </Transition>
  </div>
</template>
