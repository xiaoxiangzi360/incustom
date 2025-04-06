<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <!-- Breadcrumb -->
    <UBreadcrumb :links="breadcrumbLinks" class="mb-6 text-gray-500" />

    <!-- 产品详情部分 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- 左侧：产品图片 -->
      <div class="space-y-4">
        <UCard class="p-4">
          <div class="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
            <span class="text-gray-500">Product Image</span>
          </div>
        </UCard>
        <div class="grid grid-cols-5 gap-2">
          <div v-for="n in 5" :key="n" class="bg-gray-200 h-16 rounded-lg"></div>
        </div>
      </div>

      <!-- 右侧：产品信息 -->
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900">
          Waterproof Shade Sail
        </h1>
        <p class="text-xl text-green-600 font-bold mt-2">$36.58</p>

        <!-- 参数（重新排版） -->
        <div class="mt-6 p-4 bg-gray-100 rounded-lg">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-600 text-sm">材质</p>
              <p class="text-gray-900 font-medium">聚乙烯（高密度）</p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">生产工艺</p>
              <p class="text-gray-900 font-medium">工厂工艺</p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">重量</p>
              <p class="text-gray-900 font-medium">503g</p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">发货时效</p>
              <p class="text-gray-900 font-medium">48小时内</p>
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="mt-4 grid grid-cols-3 items-center">
          <span class="font-semibold text-gray-700">颜色</span>
          <div class="col-span-2 flex gap-3">
            <button class="w-8 h-8 bg-black rounded-full border border-gray-300"></button>
            <button class="w-8 h-8 bg-purple-600 rounded-full border border-gray-300"></button>
            <button class="w-8 h-8 bg-white rounded-full border border-gray-300"></button>
          </div>
        </div>

        <!-- 尺寸 -->
        <div class="mt-4 grid grid-cols-3 items-center">
          <span class="font-semibold text-gray-700">尺寸</span>
          <div class="col-span-2 flex gap-3">
            <UButton size="sm" variant="outline">120x60cm</UButton>
            <UButton size="sm" variant="outline">130x80cm</UButton>
          </div>
        </div>

        <!-- 按钮 -->
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton color="green" size="lg" class="w-full md:w-auto">Single Design</UButton>
          <UButton color="green" variant="outline" size="lg" class="w-full md:w-auto">Bulk Design</UButton>
          <UButton color="green" variant="soft" size="lg" class="w-full md:w-auto">Add to Library</UButton>
        </div>
      </div>
    </div>

    <!-- 推荐产品部分 -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold text-gray-900">Recommended products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <UCard v-for="n in 3" :key="n" class="p-4">
          <div class="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span class="text-gray-500">Product Image</span>
          </div>
          <p class="mt-3 text-gray-700 text-sm">
            V-neck cotton linen dress women’s summer basic solid color slim-fit vest skirt
          </p>
          <p class="text-green-600 font-bold mt-2">$36.58</p>
        </UCard>
      </div>
    </div>
  </div>
  <Faq />

</template>

<script setup>
const breadcrumbLinks = [
  { label: "Home", to: "/" },
  { label: "Product Category", to: "/Categories" },
  { label: "Product Details", to: "/productdetail/1" }
];
</script>
