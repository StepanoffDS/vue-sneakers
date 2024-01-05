<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
	totalPrice: Number,
	vatPrice: Number
})

const { cart, closeDrawer } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
	try {
		isCreating.value = true
		const { data } = await axios.post('https://5fbd7661362267a5.mokky.dev/orders', {
			items: cart.value,
			totalPrice: props.totalPrice.value
		})
		cart.value = []
		orderId.value = data.id
	} catch (error) {
		console.log(error)
	} finally {
		isCreating.value = false
	}
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
<template>
	<div class="fixed inset-0 bg-black z-10 opacity-70"></div>
	<div class="fixed flex flex-col right-0 top-0 w-96 h-full z-20 bg-white p-8">
		<DrawerHead />
		<div v-if="!totalPrice || orderId" class="flex flex-col items-center text-center my-auto">
			<InfoBlock
				v-if="orderId"
				title="Заказ оформлен!"
				:description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
				image-url="/order-success-icon.png"
			/>
			<InfoBlock
				v-if="!totalPrice && !orderId"
				title="Корзина пустая"
				description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
				image-url="/package-icon.png"
			/>
		</div>
		<CartItemList />
		<div v-if="totalPrice" class="flex flex-col gap-4 mb-5 mt-auto">
			<div class="flex gap-2">
				<span>Итого: </span>
				<div class="flex-1 border-b border-dashed"></div>
				<span class="font-semibold">{{ totalPrice }} руб.</span>
			</div>
			<div class="flex gap-2">
				<span>Налог 5%: </span>
				<div class="flex-1 border-b border-dashed"></div>
				<span class="font-semibold">{{ vatPrice }} руб.</span>
			</div>
			<button :disabled="cartButtonDisabled" @click="createOrder" class="btn-primary w-full">
				Оформить заказ
			</button>
		</div>
	</div>
</template>
<!-- class="bg-lime-400 text-white w-full rounded-2xl py-4 cursor-pointer transition hover:bg-lime-500 active:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed" -->
