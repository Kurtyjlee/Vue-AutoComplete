<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from './components/autocomplete/AutoComplete.vue'
import countries from './data/countries.json'
import ListComponent from './components/autocomplete/ListComponent.vue'
import { type CountryModel } from './models/CountryModel'

const selectedCountries = ref<CountryModel[]>([])

const toggleCountries = (country: { name: string }) => {
  if (selectedCountries.value.map((country) => country.name).includes(country.name)) {
    selectedCountries.value = selectedCountries.value.filter((c) => c.name !== country.name)
    return
  }
  selectedCountries.value.push(country)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <AutoComplete :label="'Async auto complete'" :source="countries">
      <template #list-component="{ source }">
        <!-- Any component can go here -->
        <ListComponent
          :source="source"
          :toggleFromList="toggleCountries"
        />
      </template>
    </AutoComplete>
    <AutoComplete :label="'Sync auto complete'" :source="countries">
      <template #list-component="{ source }">
        <!-- Any component can go here -->
        <ListComponent
          :source="source"
          :toggleFromList="toggleCountries"
        />
      </template>
    </AutoComplete>
    <div v-for="country in selectedCountries" :key="country.name">{{ country }}</div>
  </div>
</template>

<style scoped></style>
