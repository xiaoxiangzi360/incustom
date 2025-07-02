<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCookie } from 'nuxt/app'
import { useRouter } from 'vue-router'
const router = useRouter()
const searchInput = ref('')

// 获取 token 值
const token = useCookie('token')

// 根据 token 判断是否显示 NavSecondary
const isTokenValid = computed(() => !!token.value)

// 控制移动菜单
const { isMobileMenuOpen } = useMobileMenu()

// 替换模拟数据的 searchHistory
const searchHistory = ref<{ id: string; date: string }[]>([])

// 当前时间固定为模拟用，也可以用 new Date()
const now = new Date('2025-07-01T14:37:00+08:00')
const todayStr = now.toISOString().split('T')[0]
const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

// 初始化加载本地记录
onMounted(() => {
  const saved = localStorage.getItem('search-history')
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as { id: string; date: string }[]
      // 只保留最近7天的
      searchHistory.value = parsed.filter(item => new Date(item.date) >= sevenDaysAgo)
    } catch (e) {
      console.error('Failed to parse local search history:', e)
    }
  }
})

// 存储关键词到本地并去重、去旧
const saveKeywordToLocalHistory = (keyword: string) => {
  const keywordTrimmed = keyword.trim()
  if (!keywordTrimmed) return

  // 去除已有的重复项
  const filtered = searchHistory.value.filter(item => item.id !== keywordTrimmed)
  // 添加当前关键词
  const newItem = { id: keywordTrimmed, date: todayStr }
  const updated = [newItem, ...filtered]

  // 过滤只保留最近7天
  const recent = updated.filter(item => new Date(item.date) >= sevenDaysAgo)

  // 保存回 localStorage
  localStorage.setItem('search-history', JSON.stringify(recent))
  searchHistory.value = recent
}


// 过滤最近7天的搜索历史
const filteredSearchHistory = computed(() =>
  searchHistory.value.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate >= sevenDaysAgo
  })
)

// 控制搜索历史显示
const isSearchHistoryVisible = ref(false)

// 关闭面板
const closePanel = () => {
  isSearchHistoryVisible.value = false
}

const searchkeywords = (keyword: string) => {
  searchInput.value = keyword
  isSearchHistoryVisible.value = false
  saveKeywordToLocalHistory(keyword)
  window.location.href = `/search?query=${encodeURIComponent(keyword)}`
}

const onEnterSearch = () => {
  if (searchInput.value.trim() !== '') {
    searchkeywords(searchInput.value.trim())
  }
}

</script>

<template>
  <nav class="bg-[#222222] w-full mx-auto text-white fixed z-50 h-[122px]">
    <div class="flex h-full items-center justify-between navbar-grid py-2 max-row">
      <div style="grid-area: logo" class="flex">
        <TheLogo />
      </div>
      <div data-pg-name="Hamburger" style="grid-area: hamburger" class="sm:hidden">
        <NavHamburger @click="isMobileMenuOpen = true" />
      </div>
      <div data-pg-name="NavBarPrimary" style="grid-area: primary-nav" class="hidden sm:flex mt-4">
        <NavPrimary class="sm:w-full" />
      </div>
      <div data-pg-name="Searchbox" style="grid-area: search;" class="max-w-100 ml-4 relative">
        <UFormGroup hint="Optional">
          <UInput v-model="searchInput" @keyup.enter="onEnterSearch" icon="i-heroicons-magnifying-glass"
            placeholder="Search..." size="md" class="w-full border-none ring-0" :ui="{
              icon: { base: '!text-gray-500' },
              base: '!shadow-none !ring-0 focus:ring-0 focus:ring-offset-0 focus:shadow-none rounded-b-none',
              ring: 'focus:ring-0',
              variant: { outline: 'shadow-none focus:ring-0' },
            }" autocomplete="off"
            :input-class="isSearchHistoryVisible ? '!rounded-b-none border-b border-gray-100 focus:border-gray-100 focus:ring-0 focus:outline-none' : ''"
            @focus="isSearchHistoryVisible = true" @blur="isSearchHistoryVisible = false" />
          <!-- 搜索历史面板 -->
          <div v-if="isSearchHistoryVisible" @pointerdown.prevent class="absolute top-full left-0 w-full bg-white shadow-lg rounded p-2 z-50 rounded-t-none
">
            <div class="flex justify-between items-center">
              <div class="text-base text-d3black py-2 font-bold ml-1">Recent Searches</div>
            </div>
            <div class="mt-2">
              <span v-for="(item, index) in filteredSearchHistory" :key="index" @click="searchkeywords(item.id)"
                class="inline-block px-3 py-2 bg-f0black text-d3black text-xs rounded border border-f0black mr-2 mb-2 cursor-pointer hover:border-primary">
                {{ item.id }}
              </span>
            </div>
            <div
              class="inline-block text-xs text-gray-500 mt-2 ml-1 hover:text-primary hover:border-b hover:border-primary cursor-pointer">
              Records
              of the last 7 days</div>
          </div>
        </UFormGroup>
      </div>

      <div data-pg-name="Profile" class="flex space-x-1">
        <ProfileActions class="!hidden sm:!flex" />
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
}

@media (min-width: 640px) {
  .navbar-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'logo search profile' 'primary-nav primary-nav primary-nav';
  }
}

@media (min-width: 1280px) {
  .navbar-grid {
    /* Adjust as needed */
  }
}
</style>