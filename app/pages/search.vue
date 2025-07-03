<template>
    <div class="bg-white">
        <div class="max-row py-6">


            <!-- Main Content -->
            <div class="container mx-auto px-6 mt-12">
                <!-- Filters -->
                <div class="sticky [top:122px] bg-white z-10 flex justify-between items-center mb-8 py-4">
                    <div class="flex gap-6">

                    </div>
                    <div class="relative flex items-center" v-show="products.length != 0">
                        <span class="mr-4 text-sm">Sort</span>
                        <USelect size="xs" v-model="selectedsort" :options="sortarray" />
                    </div>
                </div>

                <!-- Product Grid with Loading -->
                <div class="relative min-h-[200px]">
                    <!-- Loading Layer -->
                    <div v-if="loading"
                        class="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center space-y-4">
                        <svg class="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        <div class="text-gray-500 text-sm">Loading products...</div>
                    </div>

                    <!-- Skeleton 卡片 -->
                    <div v-if="loading" class="grid grid-cols-4 gap-6 mb-12">
                        <div v-for="n in 4" :key="n" class="bg-white rounded-lg shadow p-4">
                            <div class="h-48 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Product List -->
                    <div v-show="products.length > 0 && !loading" class="grid grid-cols-4 gap-6 mb-12">
                        <div @click="checkdetail(product.id)" v-for="(product, index) in products" :key="index"
                            class="bg-white rounded-lg cursor-pointer">
                            <div class="aspect-square overflow-hidden rounded-t-lg">
                                <img :src="product.productMainPic ?? '/images/empty.jpg'"
                                    :alt="product.productEnglishName" class="w-full h-full object-cover object-center"
                                    style="aspect-ratio: 1 / 1;" />
                            </div>
                            <div>
                                <h3 class="text-sm mb-2 text-customblack mt-3 line-clamp-2 cursor-default"
                                    :title="product.productEnglishName">
                                    {{ product.productEnglishName }}
                                </h3>

                                <p class="text-[#AEAEAE] mb-2 text-sm">{{ product.size }}</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-base font-semibold">
                                        ${{ product.customPriceStr }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-12" v-show="products.length === 0 && !loading">
                        <div class="flex flex-col items-center text-center space-y-4 text-gray-200 text-sm">
                            <img src="/empty.png" alt="Empty" class="w-32 h-32" />
                            <div>
                                <div class="mt-2">No results for “{{ keyword }}”</div>
                                <div class="mt-2">Try checking your spelling or use more general terms</div>
                                <div class="mt-2">Check each product page for other buying options.</div>
                            </div>
                        </div>
                    </div>

                    <div class="text-customblack text-xl" v-show="recommendproducts.length > 0 && !loading">New Product
                    </div>
                    <div v-show="recommendproducts.length > 0 && !loading" class="grid grid-cols-5 gap-4 mb-12 mt-4">
                        <div @click="checkdetail(product.id)" v-for="(product, index) in recommendproducts" :key="index"
                            class="bg-white rounded-lg cursor-pointer">
                            <div class="aspect-square overflow-hidden rounded-t-lg">
                                <img :src="product.productMainPic ?? '/images/empty.jpg'"
                                    :alt="product.productEnglishName" class="w-full h-full object-cover object-center"
                                    style="aspect-ratio: 1 / 1;" />
                            </div>
                            <div>
                                <h3 class="text-sm mb-2 text-customblack mt-3 line-clamp-2 cursor-default"
                                    :title="product.productEnglishName">
                                    {{ product.productEnglishName }}
                                </h3>

                                <p class="text-[#AEAEAE] mb-2 text-sm">{{ product.size }}</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-base font-semibold">
                                        ${{ product.customPriceStr }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const sortarray = [
    'Price Low to High',
    'Price High to Low',
]

const sortarraymapping = {
    'Price Low to High': {
        value: 'customPrice',
        sort: 'asc'
    },
    'Price High to Low': {
        value: 'customPrice',
        sort: 'desc'
    },
}

const selectedsort = ref(sortarray[0])
const selected = ref('')
const products = ref([])
const loading = ref(false)
const recommendproducts = ref([])
const { getproductSearch, productSearchRecommendation } = ProductAuth()
const route = useRoute()
const router = useRouter()
const keyword = route.query.query;

const handleChange = (value) => {
    selected.value = selected.value === value ? '' : value
    getlistlist()
}

watch(selectedsort, () => {
    getlistlist()
})

const getlistlist = async () => {
    loading.value = true
    try {
        const parmes = {
            keyword: keyword,
            pageNum: 1,
            pageSize: 12,
        }
        if (selectedsort.value) {
            parmes['sortKey'] = sortarraymapping[selectedsort.value].value
            parmes['sortOrder'] = sortarraymapping[selectedsort.value].sort
        }

        const res = await getproductSearch(parmes)
        products.value = res.result.list
        if (res.result.list.length == 0) {
            getproductSearchRecommendation()
        }
    } catch (error) {
        console.error('Load product list failed:', error)
        getproductSearchRecommendation()

    } finally {
        loading.value = false
    }
}
const getproductSearchRecommendation = async () => {
    try {
        const parmes = {
            lastPublishTime: 0
        }
        const res = await productSearchRecommendation(parmes)
        recommendproducts.value = res.result.list
    } catch (error) {
        console.error('Load product list failed:', error)
    } finally {
        loading.value = false
    }
}
getlistlist()

const checkdetail = (id) => {
    router.push('/productdetail/' + id)
}
</script>

<style scoped>
.container {
    max-width: 1440px;
}

select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>
