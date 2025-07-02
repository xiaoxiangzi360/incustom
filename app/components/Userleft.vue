<script setup>
const route = useRoute()

const isActive = (path) => route.path === path
</script>

<template>
    <aside class="w-60 bg-white p-6 space-y-6">
        <ul class="space-y-4">
            <li>
                <NuxtLink to="/myorders"
                    :class="isActive('/myorders') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-black'">
                    Order
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/favorites"
                    :class="isActive('/favorites') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-black'">
                    My Favorites
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/userinfo"
                    :class="isActive('/userinfo') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-black'">
                    Account setting
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>
