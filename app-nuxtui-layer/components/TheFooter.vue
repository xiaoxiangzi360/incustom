<template>
  <footer class="bg-[#222222] text-white py-10">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
      <!-- 左侧 Logo & 介绍 -->
      <div class="flex-1 flex flex-col items-start text-left">
        <h2 class="text-2xl font-bold">
          <img src="/images/footerlogo.png" class="h-8 md:h-12" />
        </h2>
        <p class="text-sm mt-2">
          Fulfilling your ideas on demand
        </p>
        <p class="text-xs mt-1">
          Trusted to deliver 99.8M items since 2024
        </p>

        <!-- 社交图标 -->
        <div class="flex flex-wrap justify-start gap-4 mt-4">

          <img @mouseover="hovered = item.id" @mouseleave="hovered = null"
            :src="hovered === item.id ? item.img + '-active.png' : item.img + '.png'" class="w-10 cursor-pointer"
            v-for="item in medialist">
        </div>
      </div>

      <!-- 右侧菜单 -->
      <div class="flex-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
        <div>
          <p class="font-semibold">Services</p>
          <NuxtLink to="/" class="block hover:text-primary mt-6">Integrations</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-6">Shipping</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-6">Blog</NuxtLink>
        </div>
        <div class="pl-4">
          <p class="font-semibold">Feature</p>
          <NuxtLink to="/" class="block hover:text-primary mt-6">Requests</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-6">Policies</NuxtLink>
        </div>
        <div class="pl-4 hidden md:block">
          <p class="font-semibold">Feature requests</p>
          <NuxtLink to="/" class="block hover:text-primary mt-6">Recent updates</NuxtLink>
          <NuxtLink to="/" class="block hover:text-primary mt-6">FAQ</NuxtLink>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="text-center text-xs text-gray-400 mt-10">
      © 2025 Incustom. All rights reserved.
    </div>
  </footer>
</template>
<script setup>
import { ref } from 'vue'
const medialist = ([
  {
    id: 1,
    img: '/images/media1',
  },
  {
    id: 2,
    img: '/images/media2',
  },
  {
    id: 3,
    img: '/images/media3',
  }, {
    id: 4,
    img: '/images/media4',
  }, {
    id: 5,
    img: '/images/media5',
  }, {
    id: 6,
    img: '/images/media6',
  }, {
    id: 7,
    img: '/images/media7',
  },
])
const hovered = ref(null)
</script>
