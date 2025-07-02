<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="w-[480px] bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
            <!-- Success Icon -->
            <div class="success-icon-wrapper mb-6" ref="iconWrapper">
                <i class="fas fa-check-circle text-6xl text-green-500"></i>
            </div>

            <!-- Status Text -->
            <h1 class="text-2xl font-medium text-gray-900 mb-8">Payment Successful</h1>

            <!-- Payment Amount -->
            <div class="w-full text-center mb-8">
                <div class="text-sm text-gray-500 mb-2">Amount Paid</div>
                <div class="text-4xl font-semibold text-gray-900">{{ currency }} {{ amount }}</div>
            </div>

            <!-- Transaction Info -->
            <div class="w-full space-y-4 mb-8">
                <div class="flex justify-between items-center">
                    <span class="text-gray-500">Order No.</span>
                    <span class="text-gray-900">{{ orderNo }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-500">Payment Time</span>
                    <span class="text-gray-900">{{ payTime }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-500">Payment Method</span>
                    <span class="text-gray-900">{{ payMethod }}</span>
                </div>
            </div>

            <!-- Button Group -->
            <div class="w-full space-y-4">
                <button
                    class="w-full py-3 bg-green-500 text-white font-medium !rounded-button hover:bg-green-600 transition-colors whitespace-nowrap"
                    @click="handleComplete">
                    Done
                </button>
                <button
                    class="w-full py-3 border border-gray-300 text-gray-700 font-medium !rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap"
                    @click="handleViewOrder">
                    View Order Details
                </button>
                <button
                    class="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors !rounded-button whitespace-nowrap"
                    @click="handleBackHome">
                    Back to Homepage
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute();

definePageMeta({
    layout: 'blank',
    name: 'Paysuccess',
    title: 'Paysuccess',
    description: 'INcustom Paysuccess',
});
import { ref, onMounted } from 'vue';

const amount = route.query.totalAmount;
const payTime = route.query.createTime;
const payMethod = route.query.paymentMethod;
const iconWrapper = ref<HTMLElement | null>(null);
const orderNo = route.query.orderNo;
const currency = route.query.currency;

const handleComplete = () => {

    router.push('/myorders')

};

const handleViewOrder = () => {
    console.log('View Order Details');
    router.push('/')
};

const handleBackHome = () => {
    console.log('Back to Homepage');
    router.push('/')
};

onMounted(() => {
    if (iconWrapper.value) {
        iconWrapper.value.classList.add('animate-success');
    }
});
</script>

<style scoped>
.success-icon-wrapper {
    animation: scale-up 0.4s ease-out;
}

@keyframes scale-up {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-success {
    animation: bounce 1s ease;
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-20px);
    }

    60% {
        transform: translateY(-10px);
    }
}
</style>
