<template>
    <div class="max-w-[1440px] mx-auto">

        <!-- 卡片布局 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <!-- 卡片 1 -->
            <div class="relative rounded-lg overflow-hidden h-64">
                <!-- 背景图片 -->
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/right1.png')">
                </div>
                <!-- 标签 -->
                <div
                    class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black/50 text-white py-8">
                    Hot Selling List
                </div>
            </div>

            <!-- 卡片 2 -->
            <div class="relative rounded-lg overflow-hidden h-64">
                <!-- 背景图片 -->
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/right2.png')">
                </div>
                <!-- 标签 -->
                <div
                    class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black/50 text-white py-8">
                    New arrival
                </div>
            </div>

            <!-- 卡片 3 -->
            <div class="relative rounded-lg overflow-hidden h-64">
                <!-- 背景图片 -->
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/images/right1.png')">
                </div>
                <!-- 标签 -->
                <div
                    class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black/50 text-white py-8">
                    Hot Selling List
                </div>
            </div>
        </div>

        <!-- 侧边栏和商品列表 -->
        <div class="flex flex-col md:flex-row mt-6">
            <!-- 侧边栏分类 (移动端折叠) -->
            <aside class="w-full md:w-1/4 mb-4 md:mb-0">
                <UCard>
                    <h2 class="text-base font-semibold mb-3 text-title">Special Collections(15)</h2>
                    <UList>
                        <UListItem v-for="category in categories" :key="category"
                            class="text-base block w-full py-2 cursor-pointer hover:text-primary rounded-md transition text-center md:text-left text-title">
                            {{ category }}
                        </UListItem>
                    </UList>
                </UCard>
            </aside>

            <!-- 商品列表 -->
            <div class="w-full md:w-3/4 ">
                <main class="md:ml-6 text-red-500 mb-4 flex items-center gap-2">
                    <UIcon name="i-uil-fire" class="w-9 h-9 text-red-500" width="36px" />
                    <span class="font-semibold text-4xl text-[#222222]">Hot Selling List</span>
                </main>

                <main class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:ml-6">
                    <div v-for="product in products" :key="product.id" class="p-4">
                        <NuxtLink to="/productdetail/1" class="block text-white hover:text-primary">
                            <div class="w-full rounded-md">
                                <img src="/images/homepage.png" />
                            </div>
                        </NuxtLink>
                        <h3 class="mt-3 text-sm font-semibold">{{ product.name }}</h3>
                        <div class="flex items-center gap-2 mt-2">
                            <span v-for="color in product.colors" :key="color"
                                :class="['w-4 h-4 rounded-full', color]"></span>
                        </div>
                        <p class="text-gray-600 mt-1">{{ product.size }}</p>
                        <p class="text-red-500 font-bold">${{ product.price }}</p>
                    </div>
                </main>
            </div>

        </div>
    </div>
</template>

<script setup>
const categories = ['ALL', 'US Local Shipping', 'Shade Sails', 'Roller Blinds', 'Privacy Screens', 'Furniture'];

const products = Array(9).fill({
    id: Math.random(),
    name: "V-neck cotton linen dress",
    colors: ["bg-green-500", "bg-purple-500", "bg-pink-500"],
    size: "100-150cm",
    price: 36.58,
});
</script>

<style scoped>
/* 调整输入框和按钮的样式 */
.u-input {
    height: 48px;
    /* 输入框高度 */
    border: none;
    /* 移除边框 */
}

.u-button {
    height: 56px;
    /* 按钮高度，比输入框高 */
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    /* 确保按钮文字垂直居中 */
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
}
</style>

<style global>
/* 移除浏览器默认边距 */
body {
    margin: 0;
}
</style>