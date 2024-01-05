<script setup>
defineProps({
	id: Number,
	title: String,
	imageUrl: String,
	price: Number,
	isFavorite: Boolean,
	isAdded: Boolean,
	onClickFavorite: Function,
	onClickAdd: Function
})
</script>
<template>
	<div
		class="flex flex-col relative bg-white border border-gray-200 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
	>
		<img
			v-if="onClickFavorite"
			@click="onClickFavorite"
			:src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
			alt="like"
			class="absolute left-8 top-8"
		/>
		<img class="mx-auto max-h-36" :src="imageUrl" alt="Sneakers" />
		<p class="mt-2 mb-5">{{ title }}</p>
		<div class="flex justify-between mt-auto">
			<div class="flex flex-col">
				<span class="font-medium text-gray-400">Цена:</span>
				<b>{{ price }} руб.</b>
			</div>
			<img
				v-if="onClickAdd"
				@click="onClickAdd"
				:src="isAdded ? '/checked.svg' : '/plus.svg'"
				alt="Add to cart"
			/>
		</div>
	</div>
</template>
