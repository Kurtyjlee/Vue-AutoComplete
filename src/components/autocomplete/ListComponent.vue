<template>
  <li
    @click="handleClick(source)"
    :class="`cursor-pointer ${isActive ? 'bg-[#0000ff] text-white' : 'bg-white text-black'}`"
  >
    {{ source.name }}
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  source: { name: string }
  toggleFromList: (source: { name: string }) => void
}>()

const isActive = ref(false)

const handleClick = (source: { name: string }) => {
  isActive.value = !isActive.value
  props.toggleFromList(source)
}
</script>
