<script setup lang="ts">
import IconCheck from '~icons/mdi/check'
import IconCross from '~icons/mdi/close'
import IconQuestionmark from '~icons/mdi/help'
import Result from './Result.vue'
import type { Results } from '@/types'
import { computed } from 'vue'

const { results } = defineProps<{
  results: Results
}>()

const total = computed(() => Object.values(results).reduce((prev, sum) => sum + prev, 0))
</script>

<template>
  <Transition
    enter-from-class="translate-y-full opacity-0 blur-xs scale-75"
    leave-to-class="translate-y-full opacity-0 blur-xs scale-75"
    enter-active-class="transition duration-1500 ease-in-out"
    leave-active-class="transition duration-1500 ease-in-out"
  >
    <div
      class="@container flex flex-col gap-8 rounded-xl border border-slate-800 bg-slate-950/98 p-[clamp(1rem,3vw,3rem)] text-white shadow-xl/65 backdrop-blur-sm"
    >
      <div class="flex flex-col gap-6">
        <template v-for="[key, value] in Object.entries(results)" :key="key">
          <Transition
            enter-active-class="transition-all duration-1000 ease-out"
            enter-from-class="opacity-0"
          >
            <Result
              v-if="value > 0"
              :label="key"
              :value="value"
              :total="total"
              class="grow"
              :class="{
                'text-green-300': key === 'yes',
                'text-red-300': key === 'no',
                'text-purple-300': key === 'maybe',
              }"
            >
              <template #icon>
                <IconCheck v-if="key === 'yes'" />
                <IconCross v-else-if="key === 'no'" />
                <IconQuestionmark v-else-if="key === 'maybe'" />
              </template>
            </Result>
          </Transition>
        </template>
      </div>
      <div class="text-center leading-none text-slate-500">{{ total }} total votes</div>
    </div>
  </Transition>
</template>
