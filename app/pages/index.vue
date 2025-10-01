<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <div class="relative w-full h-[250px] sm:h-[450px] text-center">
      <img
        src="/images/test7.jpg"
        alt="Hero background"
        class="w-full h-full object-cover rounded-3xl shadow-lg"
      >
    </div>
    <LandingHero
      :page
    />
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <LandingAbout :page />
    </UPageSection>
  </UPage>
</template>
