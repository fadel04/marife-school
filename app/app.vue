<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

const visitors = ref<number>(0)
const isAdmin = ref(false)

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: 'Marife School',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image'
})

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  isAdmin.value = urlParams.get('admin') === 'true'

  const storageKey = 'marife_school_visitor_count'

  let currentCount = parseInt(localStorage.getItem(storageKey) || '0')

  if (!isAdmin.value) {
    currentCount++
    localStorage.setItem(storageKey, currentCount.toString())
  }

  visitors.value = currentCount

  console.log(`Visitors: ${currentCount} (Admin: ${isAdmin.value})`)
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
        <div
          v-if="isAdmin"
          class="fixed bottom-2 right-2 bg-black text-white p-2 rounded shadow-lg z-50"
        >
          👀 {{ visitors }}
        </div>
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
