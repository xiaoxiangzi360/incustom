<template>
  <div class="bg-white w-full pt-10">
    <!-- Loading 遮罩 -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>

    <!-- 骨架屏 -->
    <div v-if="isLoading" class="max-row">
      <div class="mb-6">
        <!-- 面包屑骨架 -->
        <div class="flex gap-2 mb-6">
          <div v-for="i in 3" :key="i" class="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- 左侧图片区域骨架 -->
          <div class="md:col-span-5">
            <div class="sticky top-[124px]">
              <div class="w-full aspect-square bg-gray-200 rounded-xl animate-pulse mb-4"></div>
              <div class="flex gap-2">
                <div v-for="i in 4" :key="i" class="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>

          <!-- 右侧内容区域骨架 -->
          <div class="md:col-span-7">
            <div class="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>

            <!-- 属性选择骨架 -->
            <div v-for="i in 3" :key="i" class="mb-6 border-b border-gray-200 pb-6">
              <div class="flex justify-between items-center">
                <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div class="grid grid-cols-5 gap-4 mt-4">
                <div v-for="j in 5" :key="j" class="h-24 w-full bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>

            <!-- 数量和价格骨架 -->
            <div class="border-b border-gray-200 pb-6">
              <div class="flex flex-col gap-4">
                <div class="flex justify-between">
                  <div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex justify-between">
                  <div class="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex gap-4">
                  <div class="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
                  <div class="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 原有内容，只有在非loading状态下显示 -->
    <div v-else class="max-row">
      <UBreadcrumb divider=">" :links="breadcrumbLinks" class="mb-6 text-blackcolor custom-breadcrumb text-2xl" :ui="{
        li: 'text-base font-normal text-blackcolor', active: 'text-customblack dark:text-primary-400 underline',
      }" />
      <!-- 产品详情部分 -->
      <div class="text-gray-800" ref="detailSectionRef">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Left section with image thumbnails -->
          <div class="md:col-span-5">
            <div class="sticky top-[124px]">
              <div class="w-full aspect-square overflow-hidden mb-4 relative" v-if="mainImage">
                <img :src="mainImage" alt="Shade sail"
                  class="rounded-xl shadow-lg w-full transition-all duration-300 w-full h-full object-cover" />
                <!-- Main image navigation buttons -->
                <div class="main-button-prev absolute -left-[20px] top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer"
                  @click="prevMainImage">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
                    <UIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />
                  </div>
                </div>
                <div class="main-button-next absolute -right-[20px] top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer"
                  @click="nextMainImage">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
                    <UIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />
                  </div>
                </div>
              </div>
              <Swiper v-if="productinfo.erpProduct.photoList" :modules="[Navigation]" :navigation="{
                nextEl: '.custom-button-next',
                prevEl: '.custom-button-prev'
              }" :space-between="10" class="w-full" :slides-per-view="4" :breakpoints="{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 }
              }" @swiper="onSwiper" @slideChange="onSlideChange">
                <SwiperSlide v-for="item in productinfo.erpProduct.photoList" :key="item.url">
                  <img :src="item.url" alt="thumbnail"
                    class="w-full object-cover rounded-xl cursor-pointer hover:opacity-80"
                    @click="mainImage = item.url" />
                </SwiperSlide>
                <SwiperSlide>
                  <div class="flex items-center justify-center h-full w-full">
                    <video class="max-h-full max-w-full">
                      <source :src="productinfo.erpProduct.productVideoUrl" type="video/mp4" />
                    </video>
                  </div>
                </SwiperSlide>

                <div class="custom-button-prev absolute -left-[20px] top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
                    <UIcon name="i-raphael:arrowleft2" class="text-primary w-6 h-6" />
                  </div>
                </div>
                <div class="custom-button-next absolute -right-[20px] top-1/2 -translate-y-1/2 z-10 p-2 cursor-pointer">
                  <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-primary">
                    <UIcon name="i-raphael:arrowright2" class="text-primary w-6 h-6" />
                  </div>
                </div>
              </Swiper>
            </div>
          </div>

          <!-- Right section -->
          <div class="md:col-span-7">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-bold sm:text-lg md:text-lg lg:text-2xl mb-0">
                {{ productinfo.erpProduct.productEnglishName }}
              </h1>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 mt-7">
              <div class="text-xl sm:text-xl font-medium">
                ${{ skuprice }}
              </div>
            </div>
            <!-- Section 1: THE TYPE -->
            <div v-if="productinfo.normalPropertyList" class="mt-12">
              <div class="mb-6 border-b border-b-[#C8C8C8] pb-6"
                v-for="(property, index) in productinfo.normalPropertyList">
                <div class="flex justify-between items-center cursor-pointer" @click="changeshow(index)">
                  <h2 class="font-bold text-lg flex items-center mb-0">
                    <UBadge color="black" variant="solid" class="mr-3 w-6 h-6">{{ index + 1 }}</UBadge>
                    <span class="truncate-1-lines">{{ property.propertyNameShop }}</span>
                    <Tooltip color="white" :overlayInnerStyle="{ color: '#333' }" v-if="property.desc"
                      :title="property.desc"
                      :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                      <img src="/question.png" class="w-6 h-6 ml-2">
                    </Tooltip>
                  </h2>
                  <div class="flex items-center">
                    <span class="mr-4 truncate-1-lines" v-if="property.selectedproperty">{{
                      property.isneedinput && property.chooseindex == 2 ? property.selectedproperty.inputvalue :
                        property.selectedproperty.detailName
                    }}</span>
                    <UIcon :name="property.showType ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="w-5 h-5 text-gray-500 font-medium transition-all duration-300" />
                  </div>
                </div>

                <div :class="[
                  'transition-all duration-300 ease-in-out grid gap-4',
                  property.showType ? 'max-h-[500px] mt-4' : 'overflow-hidden max-h-0',
                  !property.isneedinput && property.productPropertyDetailType != 'text' ? 'grid-cols-5' : ''
                ]">
                  <div v-if="!property.isneedinput && property.productPropertyDetailType != 'text'"
                    v-for="(type, propertyindex) in property.detailList" :key="type"
                    @click="selectproperty(index, type)" :class="[
                      'p-1 rounded-xl flex flex-col items-center transition-all',
                      type.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    ]">
                    <div :class="[
                      'w-full aspect-square overflow-hidden',
                      property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                        ? 'border border-primary' : ''
                    ]" v-if="type.imageLink">
                      <img :src="type.imageLink" class="w-full h-full object-contain" />
                    </div>
                    <div class="py-2 w-full text-sm" :class="[
                      'py-2 w-full',
                      !type.imageLink ? 'border border-customblack w-full rounded-md' : '',
                      !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                        ? 'border border-primary w-full' : '',
                    ]">
                      <div class="truncate-2-lines text-center">{{ type.detailName }}</div>
                    </div>
                  </div>
                  <div class="w-full flex flex-wrap max-h-[500px] overflow-y-auto"
                    v-if="!property.isneedinput && property.productPropertyDetailType == 'text'">
                    <div v-for="(type, propertyindex) in property.detailList" :key="type"
                      @click="selectproperty(index, type)" :class="[
                        'p-2 rounded-xl flex flex-col items-center transition-all max-w-[33.3333%] min-w-[20%]',
                        type.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      ]">
                      <div :class="[
                        'w-full aspect-square overflow-hidden',
                        property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'border border-primary' : ''
                      ]" v-if="type.imageLink">
                        <img :src="type.imageLink" class="w-full h-full object-cover" />
                      </div>
                      <div class="p-2 w-full text-sm" :class="[
                        'py-2 w-full',
                        !type.imageLink ? 'border border-customblack w-full rounded-md' : '',
                        !type.imageLink && property.selectedproperty && type.propertyDetailId === property.selectedproperty.propertyDetailId
                          ? 'border border-primary w-full' : '',
                      ]">
                        <div class="truncate-1-lines text-center">{{ type.detailName }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col md:flex-row md:items-start gap-6 relative w-full"
                    v-if="property.isneedinput">
                    <div class="flex-1 space-y-4">
                      <div class="text-base text-gray-800">
                        <label class="cursor-pointer block"
                          v-for="(needinput, needindex) in property.needinputlist.filter(item => !item.disabled)">
                          <div class="flex items-center">
                            <input type="radio" v-model="property.chooseindex" :value="needindex + 2" />
                            <span class="font-semibold text-sm">{{ needinput.detailName }}</span>
                          </div>
                          <div class="mt-4" v-for="(inputitem, pindex) in needinput.inputList">
                            <div class="flex items-center space-x-4 mt-2">
                              <label class="text-sm">{{ inputitem }}</label>
                              <input type="number" v-model="needinput.inputvalue[pindex]"
                                @change="changeinputvalue(property, needindex + 2)" class="rounded p-1 text-sm w-28"
                                :min="0" :max="100" step="1" />
                            </div>
                          </div>
                          <div class="text-red-500 text-sm mt-2">{{ errorsize }}</div>
                        </label>
                        <label v-if="property.noneedinputlist.length > 0"
                          class="flex items-center space-x-2 cursor-pointer mt-4">
                          <input type="radio" v-model="property.chooseindex" value="1" class="mt-1" />
                          <span class="font-bold text-sm">Standard size:</span>
                          <USelectMenu :popper="{ teleport: true }" v-model="property.selectedproperty"
                            option-attribute="detailName" :filter-option="customFilter" searchable
                            :options="property.noneedinputlist" @update:model-value="handleSelectChange(index, $event)"
                            size="sm" placeholder="Please select attributes">
                            <template #label>
                              <div class="flex items-center w-28">
                                <img v-if="property.selectedproperty?.imageLink"
                                  :src="property.selectedproperty.imageLink" class="w-6 h-6 mr-2" />
                                <span>{{ property.selectedproperty?.detailName || 'select attributes' }}</span>
                              </div>
                            </template>
                            <template #option="{ option }">
                              <div class="flex items-center gap-2 py-2 w-28">
                                <img v-if="option.imageLink" :src="option.imageLink" class="w-6 h-6 mr-2" />
                                <span>{{ option.detailName }}</span>
                              </div>
                            </template>
                          </USelectMenu>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6 border-b border-b-[#C8C8C8] pb-6"
              v-show="productinfo.printPropertyList && productinfo.printPropertyList.length > 0">
              <div class="flex justify-between items-center cursor-pointer" @click="showDimensions = !showDimensions">
                <h2 class="font-bold text-lg flex items-center mb-0">
                  <UBadge color="black" variant="solid" class="mr-3">{{ productinfo.normalPropertyList.length + 1 }}
                  </UBadge>
                  PRINT ON DEMAND
                </h2>
                <UIcon :name="showDimensions ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                  class="w-5 h-5 text-gray-500 transition-all duration-300" />
              </div>
              <div :class="[
                'overflow-hidden transition-all duration-300 ease-in-out grid gap-4',
                showDimensions ? 'max-h-[500px] mt-4' : 'max-h-0'
              ]">
                <div class="flex flex-col md:flex-row md:items-start gap-12 relative justify-between">
                  <div class="flex-1 space-y-4">
                    <p class="font-semibold text-sm">
                      <span v-for="(item, index) in productinfo.printPropertyList">
                        {{ item.value }}{{ index < productinfo.printPropertyList.length ? ',' : '' }}</span>
                    </p>
                    <div class="text-primary border-b-2 w-fit border-primary py-1 font-semibold cursor-pointer">Design
                      Now</div>
                  </div>
                  <div class="w-full md:w-40 shrink-0 self-center">
                    <img v-show="designimage" :src="designimage" alt="Dimension guide" class="rounded-xl border" />
                  </div>
                </div>
              </div>
            </div>

            <div class="border-b border-b-[#C8C8C8] pb-6">
              <div class="w-full mx-auto bg-white py-6 sm:py-8 rounded-md">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span class="font-semibold text-base sm:text-lg">Quantity</span>
                  <div class="flex items-center rounded px-2">
                    <div class="border flex items-center bg-[#F8F8F8] rounded">
                      <button @click="decrement" class="text-gray-500 px-2 hover:text-black">−</button>
                      <input @input="onQuantityInput" v-model="quantity"
                        class="w-12 text-center outline-none border-0 py-1 bg-[#F8F8F8]" />
                      <button @click="increment" class="text-gray-500 px-2 hover:text-black">+</button>
                    </div>
                    <span class="ml-2 text-base sm:text-lg">Panels</span>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 sm:mt-8">
                  <span class="font-semibold text-base sm:text-lg">Total price</span>
                  <div class="flex items-center flex-wrap gap-2">
                    <span class="text-base sm:text-lg font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8">
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md" :loading="cartloding"
                    @click="addtocart" color="primary" variant="solid" size="xl">
                    Add to Cart
                  </UButton>
                  <UButton class="w-full sm:flex-1 flex items-center justify-center rounded-md" color="secondary"
                    variant="solid" size="xl" :loading="orderloding" @click="createorder">
                    Order Now
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#F8F8F8]">
        <div class="mx-auto mt-16">
          <!-- Tab Buttons -->
          <div class="text-4xl font-bold bg-white">
            <div class="max-row flex gap-4 justify-start">
              <div class="w-auto">
                <div
                  class="inline-block p-6 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base md:text-lg lg:text-xl"
                  :class="{ 'bg-[#F8F8F8]': tabindex === 1 }" @click="changetab(1)">
                  Basic Information
                </div>
              </div>
              <div class="w-auto" v-if="productinfo.printPropertyList.length > 0">
                <div
                  class="inline-block p-6 rounded-xl rounded-b-none cursor-pointer text-center text-sm sm:text-base md:text-lg lg:text-xl"
                  :class="{ 'bg-[#F8F8F8]': tabindex === 2 }" @click="changetab(2)">
                  Print Information
                </div>
              </div>
            </div>
          </div>

          <!-- Content Area -->
          <div v-show="tabindex == 1" class="mx-auto max-row p-6 rounded p-2">
            <div class="overflow-hidden" v-html="productinfo.erpProduct.remarks"></div>
          </div>
          <div v-show="tabindex == 2"
            class="mx-auto max-row p-6 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-y-6 gap-x-8 text-gray-800 bg-[#F8F8F8] py-16 rounded p-2">
            <div class="flex justify-between" v-for="Propertyitem in productinfo.printPropertyList">
              <span class="text-sm sm:text-base">{{ Propertyitem.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐产品部分 -->
      <div class="mt-12 pb-4 max-row" v-if="products.length > 0">
        <h1 class="text-3xl font-bold mb-8">Recommended products</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div v-for="(product, index) in products" :key="index" @click="checkdetail(product.id)"
            class="product-card rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
            <div class="relative h-80 overflow-hidden">
              <img :src="product.erpProduct.mainPic ?? '/images/empty.jpg'" :alt="product.erpProduct.productEnglishName"
                class="w-full h-full object-cover object-top">
            </div>
            <div class="mt-2">
              <h3 class="text-lg font-medium mb-2 line-clamp-2">{{ product.erpProduct.productEnglishName }}</h3>
              <p class="text-xl font-bold text-gray-900">${{ product.erpProduct.customPrice.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Faq />
    <div ref="bottomBarRef"
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-8 bg-white rounded-md shadow-lg sticky bottom-0 transition-all duration-300 ease-in-out"
      :class="{
        'opacity-100 translate-y-0 pointer-events-auto': !isBottomBarHidden,
        'opacity-0 translate-y-8 pointer-events-none': isBottomBarHidden
      }" v-show="isshow && !isLoading">
      <div>
        <h2 class="font-semibold text-base sm:text-lg text-gray-900">{{ productinfo.erpProduct.productEnglishName }}
        </h2>
        <p class="text-sm text-gray-500">Ordinary type sail / Rectangle</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <div class="flex items-center border border-gray-300 rounded px-2 py-1">
          <button class="text-gray-500 hover:text-gray-700" @click="decrement">-</button>
          <span class="mx-2 w-12 text-center">{{ quantity }}</span>
          <button class="text-gray-500 hover:text-gray-700" @click="increment">+</button>
        </div>
        <span class="text-sm text-gray-600">Panels</span>
        <span class="text-base sm:text-lg font-medium text-gray-800">${{ totalPrice.toFixed(2) }}</span>
        <UButton color="primary" size="md" @click="addtocart" class="rounded-lg">
          Add to Cart
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { message, Tooltip } from 'ant-design-vue';
import { useCartStore } from '@/stores/cart';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const lastpage = router.options.history.state.back;
const cart = useCartStore();

// 新增loading状态
const isLoading = ref(true);

// Swiper instance
const swiperInstance = ref(null);

// 其他现有refs
const skuprice = ref(0);
const cartloding = ref(false);
const orderloding = ref(false);
const orginproductinfo = ref({});
const productid = route.params.id[0] ?? '1912447337201045504';
const showDimensions = ref(true);
let specList = [];
let joinsku = [];
const designimage = ref('');
const productinfo = ref({
  erpProduct: {
    customPrice: 0,
    photoList: [],
    propertyList: [],
    catalogId: 0,
    mainPic: ''
  },
  printPropertyList: [],
  normalPropertyList: []
});
const relatedList = [];
const { getProductById, randomRecommendationProductByCatalogId, trialPriceCalculationBySpuV2, erpTryToCreateSku } = ProductAuth();
const { creatCart } = cartAuth();

const mainImage = ref('');
const quantity = ref(1);
const totalPrice = computed(() => quantity.value * skuprice.value);
const tabindex = ref(1);
const errorsize = ref('')
// Store the Swiper instance
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

// Handle slide change
const onSlideChange = () => {
  if (swiperInstance.value) {
    const activeIndex = swiperInstance.value.activeIndex;
    const slides = productinfo.value.erpProduct.photoList;

    if (activeIndex < slides.length) {
      mainImage.value = slides[activeIndex].url;
    } else {
      mainImage.value = slides[slides.length - 1]?.url || productinfo.value.erpProduct.mainPic;
    }
  }
};

// Navigate to previous main image
const prevMainImage = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev();
  }
};

// Navigate to next main image
const nextMainImage = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext();
  }
};

const changetab = (index) => {
  tabindex.value = index;
};

const increment = () => {
  quantity.value++;
};

const decrement = () => {
  if (quantity.value > 1) quantity.value--;
};

const selectproperty = (index, type) => {
  if (type.disabled) {
    return
  }
  productinfo.value.normalPropertyList.forEach((element, index1) => {

    if (index1 < index) {
      if (isUndefinedOrEmptyObject(element.selectedproperty)) {
        joinsku = joinsku.filter(item => element.selectedproperty.skuList.includes(item));
      }
    }
    if (index == 0) {
      joinsku = type.skuList
    }
  });
  if (!joinsku) {
    joinsku = []
  }
  if (productinfo.value.normalPropertyList[index + 1]) {

    let curskulist = joinsku.length > 0 ? joinsku.filter(item => type.skuList.includes(item)) : type.skuList || [];
    // let curskulist = type.skuList ? type.skuList : [];
    let nextProperty = productinfo.value.normalPropertyList[index + 1];
    if (nextProperty.isneedinput) {
      let nextdetailList = productinfo.value.normalPropertyList[index + 1].noneedinputlist;
      nextdetailList.forEach(element => {
        let skulist = element.skuList;
        let hasIntersection = skulist && skulist.some(item => curskulist.includes(item));
        element.isactive = hasIntersection;
        element.disabled = !hasIntersection;
      });

      let nextdetailList1 = productinfo.value.normalPropertyList[index + 1].needinputlist;
      nextdetailList1.forEach(element1 => {
        let skulist = element1.skuList;
        let hasIntersection = skulist && skulist.some(item => curskulist.includes(item));
        element1.isactive = hasIntersection;
        element1.disabled = !hasIntersection;
      });
    } else {
      let nextdetailList = productinfo.value.normalPropertyList[index + 1].detailList;
      nextdetailList.forEach(element => {
        let skulist = element.skuList;
        let hasIntersection = skulist && skulist.some(item => curskulist.includes(item));
        element.isactive = hasIntersection;
        element.disabled = !hasIntersection;
      });
    }
  }
  productinfo.value.normalPropertyList[index]['selectedproperty'] = type;
  productinfo.value.normalPropertyList[index + 1]['selectedproperty'] = {};
  // console.log(productinfo.value.normalPropertyList[index + 1])
  const skuLists = productinfo.value.normalPropertyList
    .map(property => property.selectedproperty?.skuList)
    .filter(list => Array.isArray(list) && list.length > 0);

  if (skuLists.length === 0) return;
  let innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)));
  let firstsku = innersku[0];
  if (firstsku) {
    const foundObject = specList.find(item => item.sku === firstsku);
    skuprice.value = foundObject.customPrice;
  }
};

const products = ref([]);

const opencartloding = () => {
  cartloding.value = true;
};

const openorderloding = () => {
  orderloding.value = true;
};

const closecartloding = () => {
  cartloding.value = false;
};

const closeorderloding = () => {
  orderloding.value = false;
};

const addtocart = async () => {
  try {
    if (!quantity.value || quantity.value <= 0) {
      message.error('Please enter quantity!');
      return;
    }
    let ischoose = true;
    let hasEmpty = false;
    let inputvalue = [];
    let needinputproperty;
    let selectproperlist = [];
    productinfo.value.normalPropertyList.forEach(element => {
      if (isUndefinedOrEmptyObject(element.selectedproperty)) {
        ischoose = false;
      }
      if (element.isneedinput && element.chooseindex == 2) {
        let needinputlist = element.needinputlist;
        needinputlist.forEach(item => {
          inputvalue = item.inputvalue;
          hasEmpty = inputvalue.some(item => item === "");
        });
        needinputproperty = element;
      }
      let detailitem = [{
        isSelect: true,
        isMissing: true,
        detailName: element.selectedproperty?.detailName,
        propertyId: element.selectedproperty?.propertyId
      }];
      selectproperlist.push({
        detailList: detailitem,
        specCode: element.specCode,
        propertyId: element.propertyId,
        propertyType: element.propertyType,
        propertyName: element.propertyName,
      });
    });
    if (hasEmpty) {
      message.error('No dimensions entered!');
      return;
    }
    if (!ischoose) {
      message.error('Please select properties!');
      return;
    }
    let selectsku;
    if (inputvalue.length > 0) {
      let target = selectproperlist.find(item => item.propertyId === needinputproperty.propertyId);
      if (target) {
        target.detailList = [{
          isSelect: true,
          isMissing: true,
          detailName: inputvalue.join("*"),
          propertyId: needinputproperty.propertyId
        }];
      }
      let variationList = productinfo.value.erpProduct.variationList;
      const targetProperty = productinfo.value.normalPropertyList.find(item => item.propertyNameShop === 'Shape');

      let detailName = ''
      if (targetProperty && targetProperty.selectedproperty) {
        detailName = targetProperty.selectedproperty.detailName;
      } else {
        return
      }
      let createData = {
        productId: productid,
        productStyle: productinfo.value.erpProduct.productStyle,
        propertyList: selectproperlist,
        shape: detailName,
        variationList: variationList ? variationList : []
      };
      for (let i = 0; i < inputvalue.length; i++) {
        createData[`edge${i + 1}`] = inputvalue[i] || 0;
      }

      try {
        openorderloding();
        let res = await erpTryToCreateSku(createData);
        selectsku = res.result.skuSpec.sku;
      } catch (e) {
        closeorderloding();
        const errormsg = JSON.parse(e.message || '{}');
        message.error(errormsg.enDesc || 'Create SKU failed');
        return; // 终止后续流程
      }

    } else {
      const skuLists = productinfo.value.normalPropertyList
        .map(property => property.selectedproperty?.skuList)
        .filter(list => Array.isArray(list) && list.length > 0);
      if (skuLists.length === 0) return;
      let innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)));
      if (innersku.length == 0) {
        message.error('Please select all properties');
        return;
      }
      selectsku = innersku[0];
      opencartloding();
    }
    let data = {
      productQuantity: quantity.value,
      productSku: selectsku,
    };
    let res = await creatCart(data);
    message.success('Add successful!');
    closecartloding();
    cart.refreshCart();
  } catch (error) {
    let errormsg = JSON.parse(error.message);
    closecartloding();
    message.error(errormsg.enDesc || 'failed, please try again');
  }
};

const onQuantityInput = (e) => {
  let val = parseInt(e.target.value.replace(/[^\d]/g, '')) || 1;
  if (val < 1) val = 1;
  if (val > 999) val = 999;
  quantity.value = val;
};
function isUndefinedOrEmptyObject(val) {
  return (
    val === undefined ||
    (typeof val === 'object' &&
      val !== null &&
      Object.keys(val).length === 0 &&
      val.constructor === Object)
  );
}

const createorder = async () => {
  try {
    if (!quantity.value || quantity.value <= 0) {
      message.error('Please enter quantity!');
      return;
    }
    let ischoose = true;
    let hasEmpty = false;
    let inputvalue = [];
    let needinputproperty;
    let selectproperlist = [];
    productinfo.value.normalPropertyList.forEach(element => {
      if (isUndefinedOrEmptyObject(element.selectedproperty)) {
        ischoose = false;
      }
      if (element.isneedinput && element.chooseindex == 2) {
        let needinputlist = element.needinputlist;
        needinputlist.forEach(item => {
          inputvalue = item.inputvalue;
          hasEmpty = inputvalue.some(item => item === "");
        });
        needinputproperty = element;
      }
      let detailitem = [{
        isSelect: true,
        isMissing: true,
        detailName: element.selectedproperty?.detailName,
        propertyId: element.selectedproperty?.propertyId
      }];
      selectproperlist.push({
        detailList: detailitem,
        specCode: element.specCode,
        propertyId: element.propertyId,
        propertyType: element.propertyType,
        propertyName: element.propertyName,
      });
    });
    if (hasEmpty) {
      message.error('No dimensions entered!');
      return;
    }
    if (!ischoose) {
      message.error('Please select properties!');
      return;
    }
    let selectsku;
    if (inputvalue.length > 0) {
      let target = selectproperlist.find(item => item.propertyId === needinputproperty.propertyId);
      if (target) {
        target.detailList = [{
          isSelect: true,
          isMissing: true,
          detailName: inputvalue.join("*"),
          propertyId: needinputproperty.propertyId
        }];
      }
      let variationList = productinfo.value.erpProduct.variationList;
      const targetProperty = productinfo.value.normalPropertyList.find(item => item.propertyNameShop === 'Shape');

      let detailName = ''
      if (targetProperty && targetProperty.selectedproperty) {
        detailName = targetProperty.selectedproperty.detailName;
      } else {
        return
      }
      let createData = {
        productId: productid,
        productStyle: productinfo.value.erpProduct.productStyle,
        propertyList: selectproperlist,
        shape: detailName,
        variationList: variationList ? variationList : []
      };
      for (let i = 0; i < inputvalue.length; i++) {
        createData[`edge${i + 1}`] = inputvalue[i] || 0;
      }
      try {
        openorderloding();
        let res = await erpTryToCreateSku(createData);
        selectsku = res.result.skuSpec.sku;
      } catch (e) {
        closeorderloding();
        const errormsg = JSON.parse(e.message || '{}');
        message.error(errormsg.enDesc || 'Create SKU failed');
        return; // 终止后续流程
      }

    } else {
      const skuLists = productinfo.value.normalPropertyList
        .map(property => property.selectedproperty?.skuList)
        .filter(list => Array.isArray(list) && list.length > 0);
      if (skuLists.length === 0) return;
      let innersku = skuLists.reduce((acc, list) => acc.filter(sku => list.includes(sku)));
      if (innersku.length == 0) {
        message.error('Please select all properties');
        return;
      }
      selectsku = innersku[0];
      openorderloding();
    }
    closeorderloding();
    router.push('/checkout?from=detail&sku=' + selectsku + '&number=' + quantity.value);
  } catch (error) {
    console.log(error)
    let errormsg = JSON.parse(error.message);
    closeorderloding();
    message.error(errormsg.enDesc || 'Failed');
  }
};

let lastname = null;
if (lastpage && lastpage.startsWith("/categories/")) {
  const match = lastpage.match(/^\/categories\/(.+?)\/\d+$/);
  if (match) {
    lastname = match[1];
  }
}
if (lastpage && lastpage.startsWith("/collections/")) {
  const match = lastpage.match(/^\/collections\/(.+?)\/\d+$/);
  if (match) {
    lastname = match[1];
  }
}
let breadcrumbLinks = [
  { label: "Home", to: "/" },
];
if (lastname) {
  breadcrumbLinks.push({
    label: lastname,
    to: lastpage
  });
}
breadcrumbLinks.push({ label: "Product Details", to: "/productinfo?id=" + productid });

const handleGetProudct = async () => {
  try {
    isLoading.value = true; // 开始加载
    let parmes = { id: productid, needPropData: true };
    let res = await getProductById(parmes);
    orginproductinfo.value = res.result;
    productinfo.value = res.result;
    skuprice.value = res.result.erpProduct.customPrice;
    specList = res.result.erpProduct.specList;
    productinfo.value.normalPropertyList.forEach(element => {
      let noneedinputlist = ref([]);
      let needinputlist = ref([]);
      element.detailList.forEach(item => {
        item.isactive = true;
        if (item.inputList) {
          let inputvalue = [];
          item.inputList.forEach(element => {
            inputvalue.push('');
          });
          item.inputvalue = inputvalue;
          element.isneedinput = true;
          needinputlist.value.push(item);
        } else {
          noneedinputlist.value.push(item);
        }
        element.needinputlist = needinputlist.value;
        element.noneedinputlist = noneedinputlist.value;
        element.chooseindex = 1;
        if (noneedinputlist.value.length == 0) {
          element.chooseindex = 2;
        }
      });
    });
    productinfo.value.normalPropertyList[0].showType = true;
    mainImage.value = productinfo.value.erpProduct.mainPic;
    await handleGetrelated();
  } catch (error) {
    message.error('Failed to load product data');
  } finally {
    isLoading.value = false; // 加载完成
  }
};
const handleSelectChange = (propertyIndex, selected) => {
  if (selected && selected.propertyDetailId) {
    selectproperty(propertyIndex, selected);
  }
};

const changeinputvalue = (element, index) => {
  element.chooseindex = index;
  let strresult = '';
  if (element.isneedinput) {
    let needinputlist = element.needinputlist;
    let inputvalue = [];
    needinputlist.forEach((item, zindex) => {
      if (zindex + 2 == element.chooseindex) {
        inputvalue = item.inputvalue;
        strresult = inputvalue.join("*");
      }
    });
    if (!element.selectedproperty) {
      element.selectedproperty = {};
    }
    element.selectedproperty.inputvalue = strresult;
    let hasEmpty = inputvalue.some(item => item === "");
    if (!hasEmpty) {
      getcustomprice(inputvalue);
    }
  }
};

const getcustomprice = async (inputvalue) => {

  const targetProperty = productinfo.value.normalPropertyList.find(item => item.propertyNameShop === 'Shape');
  let detailName = ''
  if (targetProperty && targetProperty.selectedproperty) {
    detailName = targetProperty.selectedproperty.detailName;
  } else {
    return
  }

  let parmes = { spu: productinfo.value.erpProduct.productStyle, shape: detailName };
  for (let i = 0; i < inputvalue.length; i++) {
    parmes[`side${i + 1}`] = inputvalue[i] || 0;
  }
  try {
    let res = await trialPriceCalculationBySpuV2(parmes);
    let customizedprice = res.result.sellingPrice;
    skuprice.value = customizedprice;
    errorsize.value = '';

  } catch (error) {
    let errormsg = JSON.parse(error.message);
    errorsize.value = errormsg.enDesc;
  }

};


const handleGetrelated = async () => {
  try {
    let parmes = {
      catalogId: productinfo.value.erpProduct.catalogId,
      size: 3
    };
    let res = await randomRecommendationProductByCatalogId(parmes);
    products.value = res.result;
  } catch (error) {
    console.error(error);
  }
};

const customFilter = (option, searchQuery) => {
  return option.detailName.toLowerCase().includes(searchQuery.toLowerCase());
};

const checkdetail = (id) => {
  router.push('/productinfo?id=' + id);
};

const changeshow = (index) => {
  productinfo.value.normalPropertyList.forEach((item, i) => {
    item.showType = i === index ? !item.showType : false;
  });
};

const isBottomBarHidden = ref(true);
const detailSectionRef = ref(null);
const bottomBarRef = ref(null);
const isshow = ref(true);

const handleScroll = () => {
  if (bottomBarRef.value) {
    const rect1 = detailSectionRef.value.getBoundingClientRect();
    const rect2 = bottomBarRef.value.getBoundingClientRect();
    if (rect2.top < 800 || rect1.top > 0) {
      isBottomBarHidden.value = true;
    } else {
      isBottomBarHidden.value = false;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleGetProudct().then(() => {
    if (swiperInstance.value && productinfo.value.erpProduct.photoList.length > 0) {
      const initialIndex = productinfo.value.erpProduct.photoList.findIndex(
        (item) => item.url === mainImage.value
      );
      if (initialIndex !== -1) {
        swiperInstance.value.slideTo(initialIndex);
      }
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate-1-lines {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;

  @supports not (aspect-ratio: 1/1) {
    position: relative;
    padding-bottom: 100%;

    &>* {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}

input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: #222;
  border-color: #222;
}

input[type="radio"]:checked::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input[type="radio"]:focus-visible {
  outline: 2px solid #222;
  background-color: #222;
  outline-offset: 2px;
}

input[type="radio"]:focus {
  outline: none;
  box-shadow: none;
  background-color: #222;
}

input[type="radio"]:checked:focus,
input[type="radio"]:checked:hover {
  background-color: #222;
}

[type='text']:focus {
  outline: none;
  box-shadow: none;
  border-color: rgb(56, 56, 56);
}

.custom-breadcrumb li:last-child span {
  color: #0C1013;
  font-weight: normal;
}

.isolated-content {
  all: initial;
}

.isolated-content * {
  all: unset;
}

.isolated-content p {
  margin: 1em 0;
  color: #333;
}

/* 骨架屏动画 */
@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }

  50% {
    background-color: #e0e0e0;
  }

  100% {
    background-color: #f0f0f0;
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.u-select-menu-popper {
  position: fixed !important;
  /* 改为 fixed 定位，脱离父容器 */
  z-index: 9999 !important;
  /* 确保在其他元素之上 */
  top: auto !important;
  bottom: auto !important;
}
</style>