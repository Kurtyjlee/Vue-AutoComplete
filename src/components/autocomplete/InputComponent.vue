<!-- Component for input part of auto complete component -->
<template>
  <div class="relative flex items-center">
    <div class="absolute left-0 pl-3">
      <img src="@/assets/search.svg" alt="Loading Search" class="h-5 w-5" />
    </div>
    <input
      type="text"
      :placeholder="$props.placeholder"
      class="rounded-lg shadow-lg py-2 px-4 border border-lightGrey pl-10 focus:outline-none focus:ring-2 focus:ring-blue focus:border-blue-500"
      @input="inputHandler"
			:disabled="$props.isDisabled"
    />
    <div v-if="isLoading" class="absolute right-0 pr-3">
      <img src="@/assets/spinner.svg" alt="Loading Spinner" class="h-5 w-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  inputHandler: (e: Event) => void
  isLoading: boolean
  placeholder: string
	isDisabled: boolean
}>()
</script>
