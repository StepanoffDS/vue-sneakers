<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from './../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
	try {
		const { data } = await axios.get('https://5fbd7661362267a5.mokky.dev/favorites')
		favorites.value = data.map((obj) => obj.item)
	} catch (error) {
		console.log(error)
	}
})
</script>
<template>
	<h2 class="text-4xl font-bold my-10">Мои закладки</h2>
	<CardList :items="favorites" is-favorites />
</template>
