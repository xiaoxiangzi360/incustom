<script setup lang="ts">
const languagearr = ['EN', 'CN']
const countryarr = ['America', 'Chinese']

const language = ref(languagearr[0])
const country = ref(countryarr[0])
const people = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
const token = useCookie('token')
const isTokenValid = computed(() => !!token.value) // 如果有 token，返回 true
const selected = ref(people[0])
</script>

<template>
  <div class="flex flex-nowrap items-center justify-center p-4 rounded-lg ">
    <img src="/cart.png" class="h-9 mr-10" />
    <NuxtLink class="text-white cursor-pointer" to="/login" v-if="!isTokenValid">
      <img src="/user.png" class="h-9 mr-10" />

    </NuxtLink>
    <NuxtLink class="text-white cursor-pointer" to="/login" v-if="isTokenValid">
      <img src="/userfill.png" class="h-9 mr-10" />

    </NuxtLink>
    <!-- <NuxtLink class="text-white cursor-pointer mr-6" to="/register">Sign Up</NuxtLink>
    <NuxtLink class="text-white cursor-pointer mr-6" to="/login">Sign In</NuxtLink> -->

    <USelectMenu v-slot="{ open }" class="mr-6" v-model="language" :options="languagearr">
      <UButton color="white"
        class="bg-transparent flex-1 justify-between border border-white text-white hover:bg-transparent ring-0 rounded-md w-24">
        {{ language }}

        <UIcon name="i-heroicons-chevron-down-16-solid"
          class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500 "
          :class="[open && 'transform rotate-180']" />
      </UButton>

    </USelectMenu>

    <USelectMenu v-slot="{ open }" class="mr-6" v-model="country" :options="countryarr">
      <UButton color="white"
        class="bg-transparent flex-1 justify-between border border-white text-white hover:bg-transparent ring-0 rounded-md w-28">
        {{ country }}

        <UIcon name="i-heroicons-chevron-down-16-solid"
          class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
          :class="[open && 'transform rotate-180']" />
      </UButton>
    </USelectMenu>
  </div>
</template>
<style scoped>
::v-deep .bg-gray-100 {
  background-color: #F1F1F1 !important;
}
</style>