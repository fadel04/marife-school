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
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageSection>
      <LandingAbout :page />
      <div class="flex justify-center mt-6">
        <video
          autoplay
          muted
          loop
          playsinline
          class="rounded-lg shadow-lg max-w-3xl w-full"
        >
          <source
            src="/videos/project.mov"
          >
        </video>
      </div>
    </UPageSection>
  </UPage>
</template>
