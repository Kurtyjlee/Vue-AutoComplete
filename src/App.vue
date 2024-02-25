<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from './components/autocomplete/AutoComplete.vue'
import countries from './data/countries.json'
import ListComponent from './components/autocomplete/ListComponent.vue'
import { type CountryModel } from './models/CountryModel'

// Imagine a function to handle selections from input 2, which is sync in this case
const selectedCountries = ref<CountryModel[]>([])

/**
 * Adds or remove a country from the non async selected list
 * @param country country to be toggled for the non async selecton
 */
const toggleCountries = (country: CountryModel) => {
  if (selectedCountries.value.map((country) => country.name).includes(country.name)) {
    selectedCountries.value = selectedCountries.value.filter((c) => c.name !== country.name)
    return
  }
  selectedCountries.value.push(country)
}

// This is a function to handle selections from input 1, which is async in this case
const selectedCountriesAsync = ref<CountryModel[]>([])

/**
 * Adds or remove a country from the async selected list
 * @param country country to be toggled for the async selecton
 */
const toggleCountriesAsync = (country: CountryModel) => {
  if (selectedCountriesAsync.value.map((country) => country.name).includes(country.name)) {
    selectedCountriesAsync.value = selectedCountriesAsync.value.filter(
      (c) => c.name !== country.name
    )
    return
  }
  selectedCountriesAsync.value.push(country)
}
</script>

<template>
  <div class="flex w-screen bg-lightGrey min-h-screen min-w-full items-center justify-center m-0 p-0 overflow-hidden">
    <div class="flex flex-col gap-4 p-8 rounded-lg bg-white">
      <AutoComplete
        :label="'Async auto complete'"
        :source="countries"
        :selectedArr="selectedCountriesAsync"
        :toggleFromList="toggleCountriesAsync"
        :isAsync="true"
        placeholder="Type to begin searching"
        :isDisabled="false"
      >
        <template #list-component="{ source, isActive, isHighlighted }">
          <ListComponent
            :source="source"
            :toggleFromList="toggleCountriesAsync"
            :isActive="isActive"
            :isHighlighted="isHighlighted"
          />
        </template>
      </AutoComplete>
      <AutoComplete
        :label="'Sync auto complete'"
        :source="countries"
        :selectedArr="selectedCountries"
        :toggleFromList="toggleCountries"
        :isAsync="false"
        placeholder="Type to begin searching"
        :isDisabled="false"
      >
        <template #list-component="{ source, isActive, isHighlighted }">
          <ListComponent
            :source="source"
            :toggleFromList="toggleCountries"
            :isActive="isActive"
            :isHighlighted="isHighlighted"
          />
        </template>
      </AutoComplete>
    </div>
  </div>
</template>
