<!-- This is an example list component -->
<template>
  <li
    @click="handleClick(source)"
    :class="`cursor-pointer flex justify-between items-center py-2 px-4 hover:bg-lightBlue/30 ${props.isHighlighted ? 'bg-lightBlue/30' : 'bg-white'}`"
  >
    {{ source.name }}
    <input type="checkbox" v-model="isChecked" :checked="props.isActive" class="accent-blue w-4 h-4">
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Source {
  name: string,
  [key: string]: any
}

const props = defineProps<{
  source: Source
  toggleFromList: (source: Source) => void
  isActive: boolean
  isHighlighted: boolean
}>()

const isChecked = ref(props.isActive)

/**
 * Toggles the source from the dropdown
 * @param source source to be toggled from the dropdown
 */
const handleClick = (source: Source) => {
  props.toggleFromList(source)
}
</script>
