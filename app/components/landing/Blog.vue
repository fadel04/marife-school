<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const heroImages = computed(() => (props.page.hero as any)?.images ?? [])

const lightboxOpen = ref(false)
const selectedImage = ref<any>(null)

const openLightbox = (img: any) => {
  selectedImage.value = img
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  selectedImage.value = null
}
</script>

<template>
  <UPageSection>
    <UMarquee
      pause-on-hover
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
    >
      <Motion
        v-for="(img, index) in heroImages"
        :key="index"
        :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: index * 0.1 }"
      >
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg object-cover cursor-pointer"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
          @click="openLightbox(img)"
        />
      </Motion>
    </UMarquee>
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 flex justify-center items-center z-50"
    >
      <div class="bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-80 p-6 rounded-lg max-w-[80%] max-h-[80%] flex flex-col items-center relative">
        <button
          @click="closeLightbox"
          class="absolute top-0 right-2 text-black dark:text-white text-2xl font-bold hover:text-gray-300"
        >
          &times;
        </button>
        <NuxtImg
          v-bind="selectedImage"
          class="max-h-[80vh] max-w-[80vw] rounded-lg object-contain"
        />
      </div>
    </div>
  </UPageSection>
</template>
