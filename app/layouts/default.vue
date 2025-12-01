<script setup lang="ts">
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default pt-4">
      <AppHeader :links="navLinks" />
      <div :class="` whitespace-pre-line mt-3 sm:text-base lg:text-base font-base !justify-center text-2xl !items-center`">
        <div class="fixed bottom-4 right-4 z-50">
          <a
            href="https://wa.me/905313492419"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-7 h-7"
            >
              <path
                d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.74 6.23L0 24l5.9-1.93A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 21.82a9.82 9.82 0 01-5-1.36l-.36-.21-3.5 1.15 1.14-3.42-.23-.37A9.82 9.82 0 012.18 12c0-5.42 4.4-9.82 9.82-9.82s9.82 4.4 9.82 9.82-4.4 9.82-9.82 9.82zm5.47-7.3c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.93 1.18-.17.2-.34.23-.64.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.66-1.6-.91-2.2-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.08-.8.38s-1.05 1.03-1.05 2.5 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z"
              />
            </svg>
          </a>
        </div>
      </div>
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
