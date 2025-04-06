<script setup lang="ts">
import { ref } from 'vue';

// 按钮分类数
const categories = ref([
  { label: "Shade Sail", link: "/categories" },
  { label: "Roller Shade", link: "/categories" },
  { label: "Privacy Screen", link: "/categories" },
  { label: "Shade Cloth", link: "/categories" },
  { label: "Plant Cover", link: "/categories" },
  { label: "Patio Furniture Covers", link: "/categories" },
]);
</script>

<template>
  <div class="mt-5 flex flex-wrap gap-4 md:flex-nowrap md:flex-row md:gap-10">
    <NuxtLink v-for="(category, index) in categories" :key="index" :to="category.link"
      class="text-lg hover:text-primary hover:bg-transparent duration-200 p-2 border border-transparent md:border-none">
      {{ category.label }}
    </NuxtLink>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  div {
    flex-direction: column;
    align-items: center;
  }
}
</style>