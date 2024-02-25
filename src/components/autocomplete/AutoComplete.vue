<!-- Auto complete component with keybindings -->
<template>
  <div class="relative flex flex-col text-black gap-2">
    <h1>{{ label }}</h1>
    <InputComponent
      :inputHandler="inputHandler"
      :isLoading="isLoading"
      :placeholder="props.placeholder"
      :isDisabled="props.isDisabled"
    />
    <ul
      :class="`absolute bg-white top-20 w-full z-10 max-h-48 overflow-auto shadow-lg rounded-lg border border-lightGrey transition-opacity duration-300 ease-out origin-top 
            ${isOpen ? 'opacity-100' : 'opacity-0'}`"
      v-if="isOpen && searchResults.length > 0"
      ref="componentRef"
    >
      <template v-for="(source, index) in searchResults" :key="source.name">
        <slot
          name="list-component"
          :source="source"
          :isActive="props.selectedArr.some((obj) => obj.name === source.name)"
          :isHighlighted="highlightedIndex === index"
        />
      </template>
    </ul>
    <div
      v-if="isOpen && searchResults.length === 0"
      class="absolute bg-white top-20 w-full z-10 border border-lightGrey px-4 py-3 rounded-lg shadow-lg"
      ref="componentRef"
    >
      <label>No results were found</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, onUnmounted, ref, type Ref } from 'vue'
import InputComponent from './InputComponent.vue';

interface Source {
  name: string;
  [key: string]: any;
}

const props = defineProps<{
  label: string
  source: Source[]
  selectedArr: Source[]
  toggleFromList: (source: { name: string }) => void
  isAsync: boolean
  placeholder: string
  isDisabled: boolean
}>()

const isOpen = ref(false)
const search = ref('')
const isLoading = ref(false)

const inputHandler = computed(() => (props.isAsync ? handleInputAsync : handleInput))

/**
 * Debounce the input event to prevent too many API calls
 * @param e Event
 */
const handleInputAsync = debounce(async (e: Event) => {
  isLoading.value = true
  // Simulate a delay to show the async nature of the operation
  await delay(1000)

  const target = e.target as HTMLInputElement
  search.value = target.value
  isOpen.value = !!target.value
  isLoading.value = false
}, 300)

/**
 * Utility function to delay execution
 */
function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

/**
 * Utility function to debounce function calls
 * @param func Function to debounce
 * @param wait Duration to wait
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

/**
 * Handle input event for synchronous operations
 * @param e Event
 */
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.value.length > 0) {
    isOpen.value = true
  } else {
    isOpen.value = false
  }
  search.value = target.value
}

// Search reselts are computed based on the search value
const searchResults = computed(() => {
  if (!search.value) return []

  return props.source.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const highlightedIndex = ref(-1) // No item is highlighted initially

/**
 * Handle keyboard events
 * @param event KeyboardEvent
 */
const handleKeyDown = (event: KeyboardEvent) => {
  const itemCount = searchResults.value.length
  if (event.key === 'Escape') {
    isOpen.value = false
  } else if (event.key === 'ArrowDown') {
    event.preventDefault() // Prevent page scrolling
    highlightedIndex.value = (highlightedIndex.value + 1) % itemCount
  } else if (event.key === 'ArrowUp') {
    event.preventDefault() // Prevent page scrolling
    highlightedIndex.value = (highlightedIndex.value - 1 + itemCount) % itemCount
  } else if (event.key === 'Enter' && highlightedIndex.value >= 0) {
    props.toggleFromList(searchResults.value[highlightedIndex.value])
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const componentRef: Ref<HTMLElement | null> = ref(null)

/**
 * Handle click outside to close the dropdown
 * @param event MouseEvent
 */
function handleClickOutside(event: MouseEvent) {
  if (componentRef.value && !componentRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
