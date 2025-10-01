<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const { locale } = useI18n()

const localizedLinks = computed(() =>
  navLinks.map((link) => {
    const currentLang = locale.value

    const localizedTo
      = currentLang === 'ar'
        ? link.to
        : `/${currentLang}${link.to === '/' ? '' : link.to}`

    if (link.label === 'Home') {
      return {
        ...link,
        label: '',
        leadingIcon: link.icon,
        to: localizedTo
      }
    } else {
      return {
        ...link,
        label: link.translations?.[currentLang] || link.label,
        to: localizedTo
      }
    }
  })
)
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu
      :items="localizedLinks"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'block',
        linkLabel: 'inline'
      }"
    >
      <template #list-trailing>
        <div class="flex items-center">
          <LanguageSwitcher />
        </div>
        <ColorModeButton />
      </template>
    </UNavigationMenu>
  </div>
</template>
