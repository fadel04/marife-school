<script setup lang="ts">
// import StageProgress from '~/components/landing/StageProgress.vue'

const { translateField } = useContentTranslation()

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
const stagesList = computed(() => {
  const stageField = translateField(page.value?.stage, 'stages')
  return stageField ?? []
})

const totalStages = computed(() => stagesList.value.length)
const completedStages = ref(3)

const progress = computed(() =>
  totalStages.value > 0 ? (completedStages.value / totalStages.value) * 100 : 0
)

const stageTitle = computed(
  () => translateField(page, 'title') || translateField(page.value?.stage, 'title')
)
const description = computed(() => translateField(page.value?.stage, 'description'))
const archive = computed(() => translateField(page.value?.stage, 'archive'))
</script>

<template>
  <UPage v-if="page">
    <UPageSection>
      <!-- <StageProgress :page="page" :showTitle="true" :showDescription="true"/> -->
      <div>
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
            :value="index < completedStages ? 100 : 0 || index == 3 ? 45 : 0"
            :size="40"
            :stroke="3"
            :color="index < completedStages ? '#22c55e' : '#facc15'"
            empty-color="#e5e7eb"
          />
          <div class="max-w-md flex flex-col">
            <span
              class="font-medium"
            >
              {{ translateField(item, 'stage') }}</span>
            <span
              class="block text-xs text-gray-500 mt-1"
            >
              {{ translateField(item, 'description') }}
            </span>
          </div>
        </Motion>
      </div>
      <div>
        <div class="text-2xl font-semibold text-center mt-10">
          {{ description }}
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <video
          autoplay
          muted
          loop
          playsinline
          controls
          class="rounded-lg shadow-lg max-w-3xl w-full"
        >
          <source
            src="/videos/update-small.mp4"
            type="video/mp4"
          >
        </video>
      </div>
      <div>
        <div class="text-2xl font-semibold text-center mt-10">
          {{ archive }}
        </div>
      </div>
      <LandingBlog :page="page" />
    </UPageSection>
  </UPage>
</template>
