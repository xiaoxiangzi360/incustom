<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
    <div class="max-w-[1440px] mx-auto px-4">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(item, index) in items" :key="index"
                class="relative h-[200px] rounded-lg overflow-hidden group cursor-pointer">
                <img :src="item.image" class="absolute inset-0 w-full h-full object-cover object-top" alt="">
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-black/70 flex items-center">
                    <div class=" flex flex-col gap-3 text-white left-12 absolute">
                        <h2 class="text-3xl font-bold mb-0">{{ item.title }}</h2>
                        <div class="text-sm  ">
                            {{ item.description }}
                            <i class="fas fa-arrow-right ml-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

const items = ref([
    {
        title: 'Backyard',
        description: 'Discover all models >',
        image: '/images/cate1.png'
    },
    {
        title: 'Poolside',
        description: 'Go tou our solutions >',
        image: '/images/cate2.png'
    },
    {
        title: 'Balcony Living',
        description: 'Go to Categoty >',
        image: '/images/cate3.png'
    },
    {
        title: 'Window Area',
        description: 'See the solutions >',
        image: '/images/cate4.png'
    },
    {
        title: 'Garden Care',
        description: 'Discover all collectios >',
        image: '/images/cate5.png'
    },
    {
        title: 'Patio Zone',
        description: 'Discover all accessories >',
        image: '/images/cate6.png'
    }
]);
</script>

<style scoped>
.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>