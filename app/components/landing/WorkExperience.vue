<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const { translateField, locale } = useContentTranslation()
const min = ref(locale.value === 'tr' ? 809384 : 19278)
const max = ref(locale.value === 'tr' ? 1000000 : 24000)
const current = ref(locale.value === 'tr' ? 809384 : 19278)

const minLabel = computed(() =>
  locale.value === 'tr' ? `₺${min.value.toLocaleString('tr-TR')}` : `$${min.value.toLocaleString()}`
)

const maxLabel = computed(() =>
  locale.value === 'tr' ? `₺${max.value.toLocaleString('tr-TR')}` : `$${max.value.toLocaleString()}`
)
const isArabic = computed(() => locale.value === 'ar')

const title = computed(() => translateField(props.page.experience, 'title'))
</script>

<template>
  <UPageSection
    :title="title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: `${isArabic ? 'text-right' : 'text-left'} text-xl sm:text-xl lg:text-2xl font-medium`,
      description: 'mt-2'
    }"
  >
    <template #title>
      <div class="mb-6 w-full">
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
      <div class="mb-2">
        {{ title }}
      </div>
    </template>
    <template #description>
      <div class="flex flex-col gap-2">
        <Motion
          v-for="(experience, index) in page.experience.items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * index }"
          :in-view-options="{ once: true }"
          class="text-muted flex items-center text-nowrap gap-2"
        >
          <p class="text-sm">
            {{ experience.date }}
          </p>
          <USeparator />
          <ULink
            class="flex items-center gap-1"
            target="_blank"
          >
            <span class="text-sm">
              {{ translateField(experience, 'position') }}
            </span>
          </ULink>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
