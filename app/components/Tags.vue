<template>

    <div class="max-row  my-2 md:my-16">
        <div class="grid grid-cols-1 md:grid-cols-4 bg-white py-6 rounded-xl">
            <div v-for="(feature, index) in features" :key="index" class="flex items-center gap-4 px-6 py-2"
                :class="{ 'md:border-l md:border-gray-100': index !== 0 }">
                <NuxtImg class="w-12 h-12 md:w-16 md:h-16" :src="feature.icon" />
                <span class="text-blackcolor text-sm md:text-lg break-words">
                    {{ feature.title }}
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
const features = [
    { icon: '/images/service1.png', title: 'Delivery within 48-72 hours' },
    { icon: '/images/service2.png', title: 'From manufacturer to consumer' },
    { icon: '/images/service3.png', title: 'Assistance with project design' },
    { icon: '/images/service4.png', title: '24/7 After-sale service' }
];


</script>
