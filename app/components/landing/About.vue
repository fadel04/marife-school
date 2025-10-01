<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const { translateField, locale } = useContentTranslation()

const isArabic = computed(() => locale.value === 'ar')
const title = computed(() => translateField(props.page, 'title') || translateField(props.page.about, 'title'))
const description = computed(() => translateField(props.page, 'description') || translateField(props.page.about, 'description'))
</script>

<template>
  <UPageSection
    :title="title"
    :description="description"
    :ui="{
      container: '!p-0',
      title: `${isArabic ? 'text-right' : 'text-left'} text-xl sm:text-xl lg:text-2xl font-medium`,
      description: `${isArabic ? 'text-right' : 'text-left'} text-justify whitespace-pre-line mt-3 text-xl sm:text-xl lg:text-xl`
    }"
  />
  <UBlogPosts />
</template>
