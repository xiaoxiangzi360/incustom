<script setup lang="ts">
const { isMobileMenuOpen } = useMobileMenu()
// import { useCookie } from 'nuxt/app'

// 获取 token 值
const token = useCookie('token')

// 根据 token 判断是否显示 NavSecondary
const isTokenValid = computed(() => !!token.value) // 如果有 token，返回 true
</script>
<template>
  <nav class="bg-gradient-to-r w-full mx-auto px-2 from-[#0962A9] to-[#25B9EC] text-white">
    <div class="flex h-full items-center justify-between navbar-grid py-4 max-w-[1440px] mx-auto">
      <div style="grid-area: logo" class="flex ">
        <TheLogo />
      </div>
      <div data-pg-name="Hamburger" style="grid-area: hamburger" class="sm:hidden">
        <NavHamburger @click="isMobileMenuOpen = true" />
      </div>
      <div data-pg-name="NavBarPrimary" style="grid-area: primary-nav" class="hidden sm:flex">
        <NavPrimary class="sm:w-full" />
      </div>
      <div data-pg-name="Searchbox" style="grid-area: search;" class="w-full">
        <UFormGroup hint="Optional">
          <UInput placeholder="Search..." size="md" trailing-icon="i-material-symbols-search-rounded" class="w-full" />
        </UFormGroup>
      </div>


      <div data-pg-name="Profile" class="flex space-x-1">
        <ProfileActions class="!hidden sm:!flex" />
        <!-- <NavSecondary v-if="isTokenValid" /> -->
      </div>
    </div>
    <USlideover v-model="isMobileMenuOpen" data-pg-name="NavBarSecondary" style="grid-area: primary-nav"
      class="w-80 sm:hidden" side="left">
      <NavPrimary class="m-4" />
    </USlideover>
  </nav>
</template>
<style scoped>
.navbar-grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas: 'hamburger logo profile' 'search search search';
  gap: 20px;
}

@media (min-width: 640px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    /* 让 Searchbox 真实填充剩余空间 */
    grid-template-areas: 'logo search profile' 'primary-nav primary-nav primary-nav';
    gap: 20px;
  }
}


@media (min-width: 1280px) {
  /* .navbar-grid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    grid-template-areas: 'logo primary-nav search profile';
  } */
}
</style>
