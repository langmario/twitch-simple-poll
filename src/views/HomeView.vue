<script lang="ts" setup>
import { computed, ref } from 'vue'

const channel = ref('')
const isDemo = ref(false)

const url = computed(() => {
  const url = new URL(window.location.href)
  url.pathname = channel.value
  if (isDemo.value) {
    url.searchParams.set('demo', 'true')
  }
  return url.toString()
})
</script>

<template>
  <div>
    <h1 class="text-lg font-bold">Configure Browser Source URL</h1>
    <input v-model="channel" class="rounded border p-1" type="text" placeholder="Channel" />
    <label class="block">
      <input v-model="isDemo" type="checkbox" />
      Is Demo?
    </label>
    <div class="mt-4">
      <code class="block rounded bg-mist-950 p-2 text-sm text-white">{{ url }}</code>
    </div>
  </div>
</template>
