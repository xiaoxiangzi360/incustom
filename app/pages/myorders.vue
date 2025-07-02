<template>
    <div class="bg-white">
        <div class="flex min-h-screen text-sm max-row">
            <!-- Sidebar -->
            <Userleft />
            <!-- Main Content -->
            <main class="flex-1 p-8 space-y-6 bg-white">
                <div class="flex rounded">
                    <div class="px-3 py-2 text-sm">
                        Order number
                    </div>
                    <UInput v-model="ordervalue" />
                    <div @click="searchordernumber()"
                        class="flex justify-center items-center bg-primary text-white ml-2 px-3 rounded-lg cursor-pointer">
                        search
                    </div>
                </div>
                <section>
                    <UTabs v-model="selected" :items="tabs" @change="onChange" :ui="{
                        container: 'w-full', list: {
                            tab: {
                                active: 'text-primary font-bold border-b-2 border-sky-400', inactive: 'text-gray-500', background: 'bg-transparent',
                                rounded: ''
                            },
                            background: 'bg-transparent'
                        }
                    }" />
                    <div v-if="orders.length > 0" class="container mx-auto px-4 py-4">
                        <div class="bg-white rounded-lg shadow-sm">
                            <!-- Table Header -->
                            <div class="grid grid-cols-12 px-6 py-4 border-b text-sm font-medium text-gray-600">
                                <div class="col-span-6">Product</div>
                                <div class="col-span-3 text-center">Total($)</div>
                                <div class="col-span-3 text-right">Actions</div>
                            </div>

                            <!-- Order Items -->
                            <div class="divide-y">
                                <div v-for="order in orders" :key="order.id" class="px-6 py-4">
                                    <div class="flex flex-col space-y-4">
                                        <!-- Order Header -->
                                        <div class="flex items-center text-sm text-gray-500">
                                            <span class="flex">Order Number: <span class="text-[#AEAEAE] mx-2">{{
                                                order.orderNumber }}</span>
                                                <UTooltip text="Copy the order number" :popper="{ arrow: true }">
                                                    <UIcon @click="copyToClipboard(order.orderNumber)"
                                                        name="i-ri:file-copy-2-line"
                                                        class="w-5 h-5 mx-1 cursor-pointer" />
                                                </UTooltip>
                                            </span>
                                            <span class="mx-2">{{ formatTimestamp(order.createDate) }}</span>
                                            <span class="text-blue-500 cursor-pointer hover:underline">{{
                                                getOrderStatus(order.status) }}</span>
                                            <a href="#" class="ml-auto text-blue-500 hover:underline">Order Detail</a>
                                        </div>

                                        <!-- Product Info -->
                                        <div class="flex items-center grid grid-cols-12">
                                            <div class="col-span-6">
                                                <div class="gap-4 items-center my-4"
                                                    v-for="(item, index) in displayedItems(order)"
                                                    :key="item.productSku">
                                                    <div>
                                                        <div class="flex items-center space-x-4">
                                                            <div
                                                                class="w-28 aspect-square overflow-hidden rounded-lg bg-white flex items-center justify-center">
                                                                <img :src="item.productImage" :alt="item.productName"
                                                                    class="max-w-full max-h-full object-contain" />
                                                            </div>
                                                            <div>
                                                                <Tooltip color="white"
                                                                    :overlayInnerStyle="{ color: '#333' }"
                                                                    :title="item.productName"
                                                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                                    <div
                                                                        class="font-medium text-customblack truncate-1-lines">
                                                                        {{ item.productName }}</div>
                                                                </Tooltip>
                                                                <Tooltip color="white"
                                                                    :overlayInnerStyle="{ color: '#333' }"
                                                                    :title="item.productSku"
                                                                    :overlayStyle="{ maxWidth: '300px', whiteSpace: 'pre-line', wordBreak: 'break-word' }">
                                                                    <p
                                                                        class="text-sm text-[#AEAEAE] my-2 truncate-1-lines">
                                                                        {{ item.productSku }}
                                                                    </p>
                                                                </Tooltip>
                                                                <p class="text-sm text-customblack">Price*Qty：${{
                                                                    item.priceOrdered }}×{{ item.qtyOrdered }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Show More/Show Less Button -->
                                                <div v-if="order.orderItemList.length > 3" class="mt-2">
                                                    <button @click="toggleShowMore(order.id)"
                                                        class="text-blue-500 hover:underline text-sm">
                                                        {{ showMore[order.id] ? 'Show Less' : 'Show More' }}
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-span-3">
                                                <div class="text-center">
                                                    <span class="font-medium">${{ order.paymentAmount }}</span>
                                                </div>
                                            </div>
                                            <div class="col-span-3">
                                                <div class="flex flex-col items-end space-y-2">
                                                    <UButton class="w-28 flex justify-center items-center"
                                                        @click="gotopay(order.orderNumber)" v-if="order.status == 500">
                                                        Pay
                                                    </UButton>
                                                    <!-- <UButton color="white" v-if="order.status == 500" variant="solid"
                                                        class="w-28 flex justify-center items-center">Edit
                                                    </UButton> -->
                                                    <UButton color="white" v-if="order.status <= 1000"
                                                        @click="setCancleOrder(order.id)" variant="solid"
                                                        class="w-28 flex justify-center items-center">
                                                        Cancel
                                                    </UButton>
                                                    <UButton class="w-28 flex justify-center items-center"
                                                        v-if="order.status == 2500">
                                                        Write a review
                                                    </UButton>
                                                    <UButton class="w-28 flex justify-center items-center"
                                                        v-if="order.status == 2000">
                                                        View Tracks
                                                    </UButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="orders.length == 0"
                        class="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
                        <p class="text-gray-400 text-sm">
                            There is no historical order, you can go to buy the products you like!
                        </p>
                        <NuxtLink to="/"
                            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors mt-8">
                            Go shopping
                        </NuxtLink>
                    </div>
                </section>
                <div class="flex justify-end mt-6">
                    <UPagination v-model="page" :page-count="pageSize" :total="ordercount"
                        :prev-button="{ icon: 'i-material-symbols:chevron-left' }"
                        :next-button="{ icon: 'i-material-symbols:chevron-right' }" />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { formatTimestamp } from '~/utils/format';
import { message, Modal, Tooltip } from 'ant-design-vue';
const { createPayment } = PayAuth();
const { cancleOrder } = OrderAuth();
import { useUI } from '#imports';
import { useRouter } from 'vue-router'

const router = useRouter()
const { confirm } = useUI();

const orders = ref([]);
const tabs = ref([]);
const payarr = [500];
const canclearr = [500];
const selected = ref(tabs.value[0]);
const page = ref(1);
const status = ref([]);
const pageSize = ref(5);
const ordervalue = ref('');
const ordercount = ref(0);
const showMore = ref({}); // Tracks which orders show all SKUs
const { getOrderlists, groupUserOrderStatusCount } = OrderAuth();

const setCancleOrder = async (id) => {
    Modal.confirm({
        title: 'Confirm',
        content: `Confirm Cancel This Order`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
            const params = { id };
            const res = await cancleOrder(params);
            message.success('Cancel successful');
            getOrderlist();
            getOrderstatuslist()
        },
        onCancel() { },
    });
};

const getOrderlist = async () => {
    try {
        let params = {
            needCount: true,
            pageNum: page.value,
            pageSize: pageSize.value,
        };
        if (ordervalue.value) {
            params.orderNumber = ordervalue.value;
        }
        if (status.value && status.value.length > 0) {
            params.statusList = status.value;
        }
        let res = await getOrderlists(params);
        let lists = res.result.list;
        orders.value = lists;
        ordercount.value = res.result.total;
    } catch (error) { }
};

const getOrderstatuslist = async () => {
    try {
        let res = await groupUserOrderStatusCount();
        let getttabs = res.result;
        tabs.value = getttabs.map(item => ({
            label: item.statusEnName + (item.count > 0 ? '(' + item.count + ')' : ''),
            value: item.statusList,
            count: item.count,
        }));
        // let newItems = {
        //     label: 'All',
        //     value: '',
        //     count: '',
        // };
        // tabs.value.unshift(newItems);
    } catch (error) { }
};

const gotopay = async (orderNumber) => {
    // let payparmes = {
    //     payType: 'paypal',
    //     createSource: 'orderPay',
    //     bindIdList: [id],
    // };
    // let res = await createPayment(payparmes);
    // let payPalResult = res.result.payPalResult;
    // let payPalOrder = payPalResult.payPalOrder;
    // let links = payPalOrder.links;
    // const payerActionHref = links.find(item => item.rel === "payer-action")?.href;
    // window.open(payerActionHref, '_blank');
    router.push('/checkout?from=order&orderNo=' + orderNumber)

};

getOrderlist();
getOrderstatuslist();

function getOrderStatus(status) {
    switch (status) {
        case 0:
            return 'none';
        case 500:
            return 'unpaid';
        case 1000:
            return 'pending Confirm';
        case 1500:
            return 'awaiting Shipment';
        case 2000:
            return 'shipped';
        case 2500:
            return 'delivered';
        case 3000:
            return 'cancelled';
        default:
            return 'unknown';
    }
}

function onChange(index) {
    let item = tabs.value[index];
    status.value = item.value;
    console.log(status.value)

    getOrderlist();
}

function searchordernumber() {
    getOrderlist();
}

const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            message.success('Copy completed');
        } else {
            const input = document.createElement('textarea');
            input.value = text;
            input.readOnly = true;
            input.style.position = 'absolute';
            input.style.left = '-9999px';
            document.body.appendChild(input);
            input.select();
            const result = document.execCommand('copy');
            document.body.removeChild(input);
            if (result) {
                message.success('Copy successful');
            } else {
                throw new Error('Copy failed');
            }
        }
    } catch (err) {
        message.error('Copy failed');
        console.error('Copy failed:', err);
    }
};

// Function to determine displayed items for an order
const displayedItems = (order) => {
    if (showMore.value[order.id]) {
        return order.orderItemList;
    }
    return order.orderItemList.slice(0, 2);
};

// Toggle show more/less for an order
const toggleShowMore = (orderId) => {
    showMore.value[orderId] = !showMore.value[orderId];
};

watch(() => page.value, (newvalue, oldvalue) => {

    if (newvalue) {
        page.value
        getOrderlist();

    }
});
</script>
<style scoped>
input,
select {
    border: 1px solid #d1d5db;
}

input::placeholder,
select::placeholder {
    color: #AEAEAE !important;
}

.truncate-1-lines {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
