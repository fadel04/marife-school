<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const heroImages = computed(() => (props.page.hero as any)?.images ?? [])

const lightboxOpen = ref(false)
const selectedImage = ref<any>(null)
const selectedIndex = ref<number>(0)

const openLightbox = (img: any, index: number) => {
  selectedImage.value = img
  selectedIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  selectedImage.value = null
}

const prevImage = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  } else {
    selectedIndex.value = heroImages.value.length - 1
  }
  selectedImage.value = heroImages.value[selectedIndex.value]
}

const nextImage = () => {
  if (selectedIndex.value < heroImages.value.length - 1) {
    selectedIndex.value++
  } else {
    selectedIndex.value = 0
  }
  selectedImage.value = heroImages.value[selectedIndex.value]
}
</script>

<template>
  <UPageSection>
    <UMarquee
      pause-on-hover
      class="py-1 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
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
          v-bind="img"
          @click="openLightbox(img, index)"
        />
      </Motion>
    </UMarquee>

    <div
      v-if="lightboxOpen"
      class="fixed inset-0 flex justify-center items-center z-50"
    >
      <div
        class="bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-80 p-6 rounded-lg max-w-[80%] max-h-[80%] flex flex-col items-center relative"
      >
        <button
          @click="closeLightbox"
          class="absolute top-0 right-2 text-black dark:text-white text-2xl font-bold hover:text-gray-300"
        >
          &times;
        </button>

        <button
          @click="prevImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-3xl font-bold"
        >
          &#10094;
        </button>

        <button
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-3xl font-bold"
        >
          &#10095;
        </button>

        <NuxtImg
          v-bind="selectedImage"
          class="max-h-[80vh] max-w-[80vw] rounded-lg object-contain"
        />
      </div>
    </div>
  </UPageSection>
</template>
