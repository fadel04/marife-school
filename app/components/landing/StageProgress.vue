<script setup lang="ts">
import UCircularProgress from '../UCircularProgress.vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
  showDescription?: boolean
  showDetails?: boolean
  showTitle?: boolean
}>()

const { translateField, locale } = useContentTranslation()

const min = ref(locale.value === 'tr' ? 533760 : 12720)
const max = ref(locale.value === 'tr' ? 900000 : 21000)
const current = ref(locale.value === 'tr' ? 533760 : 12720)

const minLabel = computed(() =>
  locale.value === 'tr' ? `₺${min.value.toLocaleString('tr-TR')}` : `$${min.value.toLocaleString()}`
)

const maxLabel = computed(() =>
  locale.value === 'tr' ? `₺${max.value.toLocaleString('tr-TR')}` : `$${max.value.toLocaleString()}`
)

const stagesList = computed(() => {
  const stageField = translateField(props.page.stage, 'stages')
  return stageField ?? []
})

const totalStages = computed(() => stagesList.value.length)
const completedStages = ref(2)

const progress = computed(() =>
  totalStages.value > 0 ? (completedStages.value / totalStages.value) * 100 : 0
)

const stageTitle = computed(
  () => translateField(props.page, 'title') || translateField(props.page.stage, 'title')
)
</script>

<template>
  <div class="!pt-0 lg:grid lg:grid-cols-2 lg:gap-8 w-full">
    <div v-if="props.showTitle">
      <div class="text-center mb-2 text-sm font-medium">
        {{ stageTitle }}
      </div>
      <UProgress
        v-model="progress"
        :min="completedStages"
        :max="100"
        color="neutral"
        status
      />
      <div class="flex justify-between mt-1 text-sm text-gray-600">
        <span>{{ completedStages }}</span>
        <span>{{ totalStages }}</span>
      </div>
      <Motion
        v-for="(item, index) in stagesList"
        :key="index"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.4 + 0.2 * index }"
        :in-view-options="{ once: true }"
        class="flex items-center gap-2 my-2"
      >
        <UCircularProgress
          :value="index < completedStages ? 100 : 0 || index == 2 ? 85 : 0"
          :size="40"
          :stroke="3"
          :color="index < completedStages ? '#22c55e' : '#facc15'"
          empty-color="#e5e7eb"
        />
        <div class="max-w-md flex flex-col">
          <span
            :class="props.showDescription ? 'mt-6' : ''"
            class="font-medium"
          >
            {{ translateField(item, 'stage') }}</span>
          <span
            v-if="props.showDescription"
            class="block text-xs text-gray-500 mt-1"
          >
            {{ translateField(item, 'description') }}
          </span>
        </div>
      </Motion>
    </div>

    <USeparator
      v-if="props.showDetails"
      class="block md:hidden"
    />

    <div
      v-if="props.showDetails"
      class="mt-8 lg:mt-7 flex flex-col"
    >
      <UProgress
        v-model="current"
        :min="min"
        :max="max"
        status
        color="neutral"
      />
      <div class="flex justify-between mt-1 text-sm text-gray-600 w-full">
        <span>{{ minLabel }}</span>
        <span>{{ maxLabel }}</span>
      </div>
    </div>
  </div>
</template>
