<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

// const { global } = useAppConfig()

const props = defineProps<{
  page: IndexCollectionItem
}>()

const heroImages = computed(() => (props.page.hero as any)?.images ?? [])
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
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee>
    <!-- <UBlogPosts
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(post, index) in heroImages"
        :key="index"
        orientation="horizontal"
        variant="naked"
        v-bind="post"
        :to="post.path"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        !-- <div
          v-for="(img, index) in heroImages"
          :key="index"
          class="overflow-hidden rounded-lg"
        > --
        <NuxtImg
          :src="post.src"
          :alt="post.alt"
          class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        !-- <Motion
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
          <UColorModeAvatar
            class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
            :light="global.picture?.light!"
            :dark="global.picture?.dark!"
            :alt="global.picture?.alt!"
          />
        </Motion> --
        !-- </div> --
      </UBlogPost>
    </UBlogPosts> -->
    <!-- <template #headline>
      <div
        v-for="(img, index) in heroImages"
        :key="index"
        class="overflow-hidden rounded-lg"
      >
        <NuxtImg
          :src="img.src"
          :alt="img.alt"
          class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
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
          <UColorModeAvatar
            class="size-18 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
            :light="global.picture?.light!"
            :dark="global.picture?.dark!"
            :alt="global.picture?.alt!"
          />
        </Motion>
      </div>
    </template> -->
  </UPageSection>
</template>
