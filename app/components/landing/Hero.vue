<script setup lang="ts">
import StageProgress from './StageProgress.vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const { translateField } = useContentTranslation()

const title = computed(() => translateField(props.page, 'title') || translateField(props.page.hero, 'title'))
const description = computed(() => translateField(props.page, 'description') || translateField(props.page.hero, 'description'))
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #title>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        {{ title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        {{ description }}
      </Motion>
    </template>
    <template #links>
      <StageProgress
        :showDetails="true"
        :showTitle="true"
        :page="page"
      />
    </template>
  </UPageHero>
</template>
