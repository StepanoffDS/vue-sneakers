<script setup>
import { ref, watch, provide, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина Start */
const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const drawerOpen = ref(false)
const openDrawer = () => {
	drawerOpen.value = true
}
const closeDrawer = () => {
	drawerOpen.value = false
}

const addToCart = (item) => {
	cart.value.push(item)
	item.isAdded = true
}

const removeFromCart = (item) => {
	cart.value.splice(cart.value.indexOf(item), 1)
	item.isAdded = false
}

watch(
	cart,
	() => {
		localStorage.setItem('cart', JSON.stringify(cart.value))
	},
	{
		deep: true
	}
)
provide('cart', {
	cart,
	openDrawer,
	closeDrawer,
	addToCart,
	removeFromCart
})

/* Корзина End */
</script>

<template>
	<Drawer v-if="drawerOpen" :total-price="totalPrice" :vatPrice="vatPrice" />
	<div class="bg-white w-4/5 m-auto min-h-screen rounded-xl shadow-xl mt-14">
		<Header :total-price="totalPrice" @open-drawer="openDrawer" />

		<main class="py-11">
			<div class="container">
				<router-view></router-view>
				<Home />
			</div>
		</main>
	</div>
</template>

<style></style>
