<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale: currentLocale, setLocale } = useI18n()
const isShowDialog = ref(false)

const availableLocales = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
]
const currentLocaleFlag = computed(() => {
  return availableLocales.find(l => l.code === currentLocale.value)?.flag || '🌐'
})

const selectLocale = (code: 'en' | 'ar' | 'tr') => {
  setLocale(code)
  isShowDialog.value = false
}
</script>

<template>
  <ClientOnly>
    <div class="relative">
      <UButton
        size="sm"
        color="neutral"
        class="rounded-full"
        variant="ghost"
        @click="isShowDialog = !isShowDialog"
      >
        {{ currentLocaleFlag }}
        <template #fallback>
          <div class="size-4" />
        </template>
      </UButton>
      <Dialog v-model:open="isShowDialog">
        <DialogContent
          class="absolute right-(-4) top-0 mt-3 rounded-lg shadow-lg bg-muted/80 backdrop-blur-sm border border-muted/50"
        >
          <ul class="menu p-2 text-right">
            <li
              v-for="loc in availableLocales"
              :key="loc.code"
            >
              <a
                class="cursor-pointer flex items-center gap-2 justify-end"
                @click="selectLocale(loc.code as 'en' | 'ar' | 'tr')"
              >
                <span>{{ loc.flag }}</span>
              </a>
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  </ClientOnly>
</template>
