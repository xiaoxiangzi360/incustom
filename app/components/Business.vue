<template>
    <div class="relative h-[300px] md:h-[336px] w-full bg-cover bg-center bg-no-repeat px-32"
        style="background-image: url('/images/business.png');">
        <!-- 深色遮罩增强文字可读性 -->
        <div class="absolute inset-0 bg-gray-900/50"></div>

        <!-- 内容容器 - 改为居左对齐 -->
        <div class="relative z-10 flex flex-col justify-center h-full text-left max-row">
            <!-- 修改这里 -->
            <!-- 标题和描述 -->
            <div>
                <h2 class="text-2xl md:text-[26px] font-bold text-white">
                    Join Our Newsletter
                </h2>
                <p class="text-sm md:text-base text-white leading-relaxed mt-2">
                    Huge selection shading solutions to suit your spaces.
                    <br />
                    Continuous price negotiation and supply chain optimization for you.
                </p>
            </div>

            <!-- 订阅表单 -->
            <div class="mt-8 max-w-md">
                <div
                    class="relative flex items-center bg-white rounded shadow-md  focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                    <!-- 图标 -->
                    <div class="ml-3 flex items-center justify-center text-gray-600">
                        <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                    </div>

                    <!-- 输入框 -->
                    <input type="email" v-model="email" placeholder="Enter your email"
                        @keydown.enter.prevent="handleSubmit"
                        class="flex-1 min-w-0 bg-transparent outline-none px-3 py-2.5 text-gray-800 placeholder-gray-400 border-0 focus:border-0 focus:outline-none focus:ring-0"
                        required />

                    <!-- 订阅按钮 -->
                    <button :disabled="loading" @click="handleSubmit"
                        class="bg-bright hover:bg-secondary-600 text-white px-5 py-2.5 rounded transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ loading ? 'Subscribing...' : 'Subscribe' }}
                    </button>

                </div>

                <!-- 隐私政策 -->
                <p class="mt-4 text-xs text-white">
                    You can unsubscribe at any time. See our
                    <a href="#" class="text-white underline hover:text-blue-300 transition-colors">Privacy Policy</a>
                    for details.
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { message } from 'ant-design-vue';
import { ref } from 'vue';
const { createMarketingActivityEmailSubscribe } = ActivityAuth();

const email = ref('');
const loading = ref(false);

const handleSubmit = async () => {
    if (!email.value) {
        message.warning("Email is required.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        message.warning("Invalid email format.");
        return;
    }

    loading.value = true;
    try {
        const res = await createMarketingActivityEmailSubscribe({
            email: email.value,
        });
        message.success("Subscription successful!");
        email.value = ''; // 清空输入框
    } catch (error) {
        message.error("An error occurred while subscribing.");
    } finally {
        loading.value = false;
    }
};
</script>
