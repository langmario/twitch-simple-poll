<script setup lang="ts">
import ComfyJS from 'comfy.js'
import { computed, ref } from 'vue'
import Poll from './components/Poll.vue'

type Vote = boolean | null

const url = new URL(window.location.href)
const channel = url.pathname.substring(1)

const truthyValues = ['y', 'yes', '1', '+']
const falsyValues = ['n', 'no', '0', '-']

const isPollActive = ref(false)
const pollTimeout = ref<number>()

const voteHistory = ref(new Map<string, Vote>())
const truthyVotes = computed(() => [...voteHistory.value.values()].filter((v) => v === true).length)
const maybeVotes = computed(() => [...voteHistory.value.values()].filter((v) => v === null).length)
const falsyVotes = computed(() => [...voteHistory.value.values()].filter((v) => v === false).length)

function onVote(user: string, vote: Vote) {
  voteHistory.value.set(user, vote)
  isPollActive.value = true

  clearTimeout(pollTimeout.value)
  pollTimeout.value = setTimeout(endPoll, 1000 * 20)
}

function endPoll() {
  isPollActive.value = false
  voteHistory.value = new Map()
}

ComfyJS.onChat = (user, message) => {
  const m = message.toLowerCase().trim()
  if (truthyValues.includes(m)) {
    onVote(user, true)
  }
  if (falsyValues.includes(m)) {
    onVote(user, false)
  }
}

ComfyJS.Init(channel)
</script>

<template>
  <Poll
    v-if="channel"
    :truthy="truthyVotes"
    :maybe="maybeVotes"
    :falsy="falsyVotes"
    :data-active="isPollActive"
    class="size-full opacity-0 transition duration-500 ease-out data-[active=true]:opacity-100"
  />
  <div v-else>Error: channel name not provided</div>
</template>

<style>
#app {
  height: 100vh;
  padding: 2rem;
}
</style>
