<template>
    <div class="mt-14">
        <div class="max-w-[1440px] mx-auto container px-4 py-8 md:py-12">
            <!-- 标题 -->
            <h1
                class="text-2xl md:text-5xl font-bold mb-8 md:mb-14 bg-clip-text text-transparent bg-gradient-to-b from-[#25B9EC] to-[#0962A9] text-center">
                Customized to your needs
            </h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Product Category Card -->
                <div class="relative rounded-lg overflow-hidden md:h-[150px] h-[150px] group cursor-pointer"
                    v-for="(need, index) in needs" :key="index">
                    <img :src="need.img" :alt="need.title" class="w-full h-full object-cover object-top" />
                    <div
                        class="absolute inset-0 bg-black bg-opacity-20 transition-all duration-300 group-hover:bg-opacity-50 flex items-center justify-center">
                        <div class="text-white text-center">
                            <img :src="need.icon" class="w-12 md:w-16 mx-auto mb-2">
                            <h3 class="text-2xl font-semibold">{{ need.title }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const needs = ref([
    { title: 'Product category', img: '/images/needs1.png', icon: '/images/needs_icon1.png' },
    { title: 'Color selection', img: '/images/needs2.png', icon: '/images/needs_icon2.png' },
    { title: 'Size customization', img: '/images/needs3.png', icon: '/images/needs_icon3.png' },
    { title: 'Customizable product', img: '/images/needs4.png', icon: '/images/needs_icon4.png' },
]);
</script>
