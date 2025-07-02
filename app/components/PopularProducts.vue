<template>
    <div class="mt-14">
        <div class="max-row">
            <!-- 标题 -->
            <h1 class="text-2xl md:text-5xl mb-8 md:mb-14 bg-clip-text font-normal text-blackcolor text-center">
                Most Popular Products
            </h1>

            <div class="relative">
                <!-- 骨架屏 -->
                <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="n in 3" :key="n" class="rounded-lg overflow-hidden shadow-md bg-white">
                        <!-- 图片骨架 -->
                        <div class="relative w-full aspect-square bg-gray-200 animate-pulse"></div>
                        <!-- 内容骨架 -->
                        <div class="p-4">
                            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div class="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                            <div class="flex items-center justify-between">
                                <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Swiper 轮播图 -->
                <Swiper v-else :modules="swiperModules" :slides-per-view="3" :space-between="24" :breakpoints="{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }" :autoplay="{ delay: 3000, disableOnInteraction: false }" :slides-per-group="3" :loop="true"
                    :pagination="{ clickable: true }" class="product-swiper">
                    <SwiperSlide v-for="(product, index) in products" :key="index">
                        <div @click="checkdetail(product.id)"
                            class="rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                            <!-- 产品图片 -->
                            <div class="relative w-full aspect-square overflow-hidden">
                                <img :src="product.erpProduct.mainPic ?? '/images/empty.jpg'"
                                    :alt="product.erpProduct.productEnglishName" loading="lazy"
                                    class="w-full h-full object-cover object-top">
                            </div>

                            <!-- 产品详情 -->
                            <div class="p-4">
                                <h3 class="text-base font-normal mb-2 line-clamp-2 min-h-[3em]">{{
                                    product.erpProduct.productEnglishName }}</h3>
                                <div class="flex items-center justify-between">
                                    <span class="text-primary font-medium text-lg">
                                        $ {{ product.erpProduct.customPrice }}
                                    </span>
                                    <span class="text-[#8E8E8E] text-sm">{{ product.thirtyDaysSales }} sold</span>
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
import { useRouter } from 'vue-router'
const { getUserProductRollPage } = ProductAuth();

const router = useRouter()

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const swiperModules = [Pagination, Autoplay];
const selectedColors = ref<Record<number, string>>({});
const products = ref([]);
const isLoading = ref(true); // 添加加载状态

const checkdetail = (id) => {
    router.push('/productdetail/' + id)
}

const getpopularlist = async () => {
    try {
        isLoading.value = true; // 开始加载
        let parmes = {
            sortKey: 'thirtyDaysSales',
            pageNum: 1,
            pageSize: 9,
            sortOrder: 'desc',
            fields: "id,productState,erpProduct.productEnglishName,erpProduct.customPrice,erpProduct.mainPic,thirtyDaysSales",

        }
        let res = await getUserProductRollPage(parmes);
        products.value = res.result.list;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        isLoading.value = false; // 加载完成
    }
};

getpopularlist()
</script>

<style scoped>
/* 轮播图底部留出空间 */
.product-swiper {
    padding-bottom: 80px;
}

/* Swiper 分页小圆点 */
.product-swiper :deep(.swiper-pagination-bullet) {
    width: 18px;
    height: 18px;
    background: #B9B9B9;
    opacity: 1;
}

.product-swiper :deep(.swiper-pagination-bullet-active) {
    background: #222222;
    width: 18px;
    height: 18px;
}

.product-swiper :deep(.swiper-pagination) {
    margin-top: 30px;
}

.aspect-square {
    aspect-ratio: 1 / 1;
}

/* 骨架屏动画 */
@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>