<template>
  <footer class="bg-[#222222] text-white py-10">
    <div class="max-w-[1440px]  mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 text-center md:text-left">
      <!-- 左侧 Logo & 介绍 -->
      <div class="col-span-1 flex flex-col items-center md:items-start">
        <h2 class="text-2xl font-bold">
          <img src="/images/footerlogo.png" class="h-8 md:h-12" />
        </h2>
        <p class="text-sm text-white mt-2">
          Fulfilling your ideas on demand
        </p>
        <p class="text-xs text-white mt-1">
          Trusted to deliver 99.8M items since 2024
        </p>

        <!-- 社交图标 -->
        <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
          <UButton icon="i-uil-instagram" color="white" class="text-white hover:bg-primary" variant="ghost" />
          <UButton icon="i-uil-facebook" color="white" class="text-white hover:bg-primary" variant="ghost" />
          <UButton icon="i-uil-linkedin" color="white" class="text-white hover:bg-primary" variant="ghost" />
          <UButton icon="i-uil-telegram" color="white" class="text-white hover:bg-primary" variant="ghost" />
          <UButton icon="i-uil-instagram" color="white" class="text-white hover:bg-primary" variant="ghost" />
          <UButton icon="i-uil-youtube" color="white" class="text-white hover:bg-primary" variant="ghost" />
        </div>
      </div>

      <!-- 右侧菜单 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-3 gap-6">
        <div class="space-y-2">
          <p class="font-semibold text-white">Services</p>
          <NuxtLink to="/" class="block text-white hover:text-primary">Integrations</NuxtLink>
          <NuxtLink to="/" class="block text-white hover:text-primary">Shipping</NuxtLink>
          <NuxtLink to="/" class="block text-white hover:text-primary">Blog</NuxtLink>
        </div>
        <div class="space-y-2 border-gray-500 pl-4">
          <p class="font-semibold text-white">Feature</p>
          <NuxtLink to="/" class="block text-white hover:text-primary">Requests</NuxtLink>
          <NuxtLink to="/" class="block text-white hover:text-primary">Policies</NuxtLink>
        </div>
        <div class="space-y-2 border-gray-500 pl-4 hidden md:block">
          <p class="font-semibold text-white">Feature requests</p>
          <NuxtLink to="/" class="block text-white hover:text-primary">Recent updates</NuxtLink>
          <NuxtLink to="/" class="block text-white hover:text-primary">FAQ</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
