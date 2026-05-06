import { computed, onMounted, ref, watch } from "vue"
import type { Results, VoteKeys, VoteOptions } from "./types"
import Comfy from 'comfy.js';

export const useChatCounter = (channel: string) => {

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

    // Check if message matches any of the keywords
    if (Object.values(voteOptions).some((options) => options.includes(message))) {
      // Get the key for the keyword that matched the message
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

  function clear() {
    votes.value.clear();
  }

  Comfy.onChat = onChat

  onMounted(() => {
      Comfy.Init(channel)
  })
  watch(votes.value, (votes) => {
    if (votes.size > 3) {
      showResults.value = true
    }
  })

  return { showResults, results, clear }
}
