<template>
    <div class="relative h-[300px] md:h-[336px] w-full bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/business.png');">
        <!-- 深色遮罩增强文字可读性 -->
        <div class="absolute inset-0 bg-gray-900/50"></div>

        <!-- 内容容器 - 改为居左对齐 -->
        <div class="relative z-10 flex flex-col justify-center h-full text-left max-w-[1440px] mx-auto">
            <!-- 修改这里 -->
            <!-- 标题和描述 -->
            <div class="space-y-3">
                <h2 class="text-2xl md:text-4xl font-bold text-primary">
                    Create the Perfect Space — One Tip at a Time
                </h2>
                <p class="text-sm md:text-base text-white leading-relaxed">
                    Join the incustom list for outdoor styling ideas, exclusive offers, <br />and pro tips on shade,
                    privacy,
                    and
                    comfort — right to your inbox.
                </p>
            </div>

            <!-- 订阅表单 -->
            <div class="mt-8 max-w-md">
                <div
                    class="relative flex items-center bg-white rounded-full shadow-md p-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                    <!-- 图标 -->
                    <div class="ml-3 flex items-center justify-center text-gray-600">
                        <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                    </div>

                    <!-- 输入框 -->
                    <input type="email" placeholder="Enter your email"
                        class="flex-1 min-w-0 bg-transparent outline-none px-3 py-2.5 text-gray-800 placeholder-gray-400 border-0 focus:border-0 focus:outline-none focus:ring-0"
                        required />

                    <!-- 订阅按钮 -->
                    <button
                        class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap">
                        Subscribe
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