<script setup>
import { ref, inject, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import CardList from './../components/CardList.vue'

const items = ref([])

const { cart, addToCart, removeFromCart } = inject('cart')

const filters = reactive({
	sortBy: 'title',
	searchQuery: ''
})

const onClickAddPlus = (item) => {
	if (!item.isAdded) {
		addToCart(item)
	} else {
		removeFromCart(item)
	}
}

const onChangeSelect = (e) => {
	filters.sortBy = e.target.value
}

const onChangeSearchInput = debounce((e) => {
	filters.searchQuery = e.target.value
}, 300)

const addToFavorite = async (item) => {
	try {
		if (!item.isFavorite) {
			const obj = {
				parentId: item.id,
				item
			}
			item.isFavorite = true
			const { data } = await axios.post(`https://5fbd7661362267a5.mokky.dev/favorites`, obj)
			item.favoriteId = data.id
		} else {
			item.isFavorite = false
			await axios.delete('https://5fbd7661362267a5.mokky.dev/favorites/' + item.favoriteId)
			item.favoriteId = null
		}
	} catch (error) {
		console.log(error)
	}
}

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get(`https://5fbd7661362267a5.mokky.dev/favorites`)
		items.value = items.value.map((item) => {
			const favorite = favorites.find((favorite) => favorite.parentId === item.id)

			if (!favorite) {
				return item
			}

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id
			}
		})
	} catch (error) {
		console.log(error)
	}
}

const fetchItems = async () => {
	try {
		const params = {
			sortBy: filters.sortBy
		}
		if (filters.searchQuery) {
			params.title = `*${filters.searchQuery}*`
		}
		const { data } = await axios.get(`https://5fbd7661362267a5.mokky.dev/items`, { params })
		items.value = data.map((obj) => ({
			...obj,
			isFavorite: false,
			favoriteId: null,
			isAdded: false
		}))
	} catch (error) {
		console.log(error)
	}
}

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	cart.value = localCart ? JSON.parse(localCart) : []

	await fetchItems()
	await fetchFavorites()

	items.value = items.value.map((item) => ({
		...item,
		isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
	}))
})

watch(cart, () => {
	items.value = items.value.map((item) => ({
		...item,
		isAdded: false
	}))
})

watch(filters, fetchItems)
</script>
<template>
	<div class="flex justify-between items-center gap-5 my-10">
		<h2 class="text-4xl font-bold">Все кроссовки</h2>
		<select
			class="ml-auto border border-gray-200 rounded-xl py-2 px-4 outline-none focus:border-gray-400"
			@change="onChangeSelect"
		>
			<option value="title">По умолчанию</option>
			<option value="price">По возростанию цены</option>
			<option value="-price">По убыванию цены</option>
		</select>
		<div class="relative">
			<svg
				class="absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
					stroke="#E4E4E4"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>

			<input
				@input="onChangeSearchInput"
				type="text"
				placeholder="Поиск..."
				class="border border-gray-200 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-gray-400"
			/>
		</div>
	</div>
	<CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
</template>
