<template>
    <div class="mt-14">
        <div class="max-w-[1440px] mx-auto container px-4 py-8 md:py-12">
            <!-- 标题 -->
            <h1
                class="text-2xl md:text-5xl font-bold mb-8 md:mb-14 bg-clip-text text-transparent bg-gradient-to-b from-[#25B9EC] to-[#0962A9] text-center">
                Most Popular Products
            </h1>

            <div class="relative">
                <!-- Swiper 轮播图 -->
                <Swiper :modules="swiperModules" :slides-per-view="3" :space-between="24" :breakpoints="{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }" :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                    class="product-swiper">
                    <SwiperSlide v-for="(product, index) in products" :key="index">
                        <div class="rounded-lg overflow-hidden shadow-md bg-white">
                            <!-- 产品图片 -->
                            <div class="relative h-64 overflow-hidden">
                                <img :src="product.image" :alt="product.title" loading="lazy"
                                    class="w-full h-full object-cover object-top">
                            </div>

                            <!-- 产品详情 -->
                            <div class="p-6">
                                <h3 class="text-lg font-semibold mb-2">{{ product.title }}</h3>
                                <div class="flex items-center justify-between mb-4">
                                    <span class="text-primary font-bold text-xl">
                                        {{ new Intl.NumberFormat('en-US', {
                                            style: 'currency', currency: 'USD'
                                        }).format(product.price) }}
                                    </span>
                                    <span class="text-gray-500 text-sm">{{ product.sold }} sold</span>
                                </div>

                                <!-- 颜色选择 -->
                                <div class="mb-4">
                                    <p class="text-sm text-gray-600 mb-2">Color</p>
                                    <div class="flex gap-2">
                                        <button v-for="color in product.colors" :key="color"
                                            class="w-6 h-6 rounded-md transition-all duration-300" :class="{
                                                'border-blue-500 ring-2 ring-blue-300': selectedColors[index] === color,
                                                'border-gray-200': selectedColors[index] !== color
                                            }"
                                            :style="{ backgroundColor: color, boxShadow: color === '#FFFFFF' ? '0 0 2px rgba(0, 0, 0, 0.3)' : 'none' }"
                                            :aria-label="`Select color ${color}`"
                                            @click="selectedColors[index] = color"></button>
                                    </div>
                                </div>

                                <!-- 尺寸 -->
                                <div>
                                    <p class="text-sm text-gray-600 mb-2">Size</p>
                                    <p class="text-sm">{{ product.size }}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const swiperModules = [Pagination, Autoplay];
const selectedColors = ref<Record<number, string>>({});

const products = [
    {
        title: 'Triangle General Shade Sail',
        price: 847.00,
        sold: 345,
        size: '16*18*19',
        image: 'https://ai-public.mastergo.com/ai/img_res/6ae92f31645b5176dded863dfe53d52f.jpg',
        colors: ['#000000', '#FF6B6B', '#4ECDC4', '#F7D794', '#95A5A6']
    },
    {
        title: 'Premium Shade Sail',
        price: 847.00,
        sold: 345,
        size: '16*18*19',
        image: 'https://ai-public.mastergo.com/ai/img_res/c2a60ca85ce09bacae4a8a717499196d.jpg',
        colors: ['#000000', '#FF6B6B', '#4ECDC4', '#F7D794', '#95A5A6']
    },
    {
        title: 'Deluxe Triangle Sail',
        price: 847.00,
        sold: 345,
        size: '16*18*19',
        image: 'https://ai-public.mastergo.com/ai/img_res/97486c5f96045eef3aaeb1977973ab49.jpg',
        colors: ['#000000', '#FF6B6B', '#4ECDC4', '#F7D794', '#95A5A6']
    },
    {
        title: 'Triangle General Shade Sail',
        price: 847.00,
        sold: 345,
        size: '16*18*19',
        image: 'https://ai-public.mastergo.com/ai/img_res/6ae92f31645b5176dded863dfe53d52f.jpg',
        colors: ['#000000', '#FF6B6B', '#4ECDC4', '#F7D794', '#95A5A6']
    },
    {
        title: 'Premium Shade Sail',
        price: 847.00,
        sold: 345,
        size: '16+18+19',
        image: 'https://ai-public.mastergo.com/ai/img_res/c2a60ca85ce09bacae4a8a717499196d.jpg',
        colors: ['#000000', '#FF6B6B', '#4ECDC4', '#F7D794', '#95A5A6']
    },
    {
        title: 'Deluxe Triangle Sail',
        price: 847.00,
        sold: 345,
        size: '16*18*19',
        image: 'https://ai-public.mastergo.com/ai/img_res/97486c5f96045eef3aaeb1977973ab49.jpg',
        colors: ['#000000', '#FF6B6B', '#4ECDC4', '#F7D794', '#95A5A6']
    }
];
</script>

<style scoped>
/* 轮播图底部留出空间 */
.product-swiper {
    padding-bottom: 80px;
}

/* Swiper 分页小圆点 */
.product-swiper :deep(.swiper-pagination-bullet) {
    width: 24px;
    height: 24px;
    background: #B9B9B9;
    opacity: 1;
}

.product-swiper :deep(.swiper-pagination-bullet-active) {
    background: #222222;
    width: 24px;
    /* 让选中的点更大 */
    height: 24px;
}

.product-swiper :deep(.swiper-pagination) {
    margin-top: 30px;
    /* 你可以调整这个值 */
}
</style>