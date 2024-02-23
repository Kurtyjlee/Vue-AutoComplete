<template>
  <div class="flex flex-col text-black">
    <h1>{{ props.label }}</h1>
    <input type="text" @input="handleInput" class="border" />
    <ul class="border max-h-24 overflow-auto">
      <slot v-for="source in searchResults" :key="source.name" name="list-component" :source="source"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  source: {
    type: Array<{ name: string }>,
    required: true
  }
})

console.log(props.source)

const isOpen = ref(false)

const search = ref('')
const searchResults = computed(() => {
  if (!search.value) return []

  return props.source.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const handleInput = (e: Event) => {
  isOpen.value = true
  const target = e.target as HTMLInputElement
  search.value = target.value
}
</script>
