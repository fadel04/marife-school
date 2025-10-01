<script setup lang="ts">
const props = defineProps<{
  value: number
  size?: number
  stroke?: number
  color?: string
  emptyColor?: string
}>()

const size = computed(() => props.size ?? 40)
const stroke = computed(() => props.stroke ?? 4)
const radius = computed(() => (size.value - stroke.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(
  () => circumference.value - (circumference.value * props.value) / 100
)
</script>

<template>
  <div class="relative inline-flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" class="transform -rotate-90">
      <!-- الخلفية -->
      <circle
        :r="radius"
        :cx="size / 2"
        :cy="size / 2"
        :stroke-width="stroke"
        :stroke="emptyColor || '#e5e7eb'"
        fill="transparent"
      />
      <!-- التقدم -->
      <circle
        :r="radius"
        :cx="size / 2"
        :cy="size / 2"
        :stroke-width="stroke"
        :stroke="color || '#10b981'"
        stroke-linecap="round"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <!-- النص داخل الدائرة -->
    <span class="absolute text-xs font-medium">{{ props.value }}%</span>
  </div>
</template>
