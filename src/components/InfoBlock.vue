<script setup>
import { inject } from 'vue'

defineProps({
	title: String,
	description: String,
	imageUrl: String
})
const { closeDrawer } = inject('cart')
</script>
<template>
	<div class="flex flex-col items-center text-center my-auto">
		<img class="w-32" :src="imageUrl" :alt="title" />
		<h2 class="mt-4 font-semibold text-2xl">{{ title }}</h2>
		<p class="mt-2 text-gray-400 text-base w-72">{{ description }}</p>
		<button @click="closeDrawer" class="relative btn-primary w-60 mt-10">
			<svg
				class="absolute top-1/2 -translate-y-1/2 left-7 rotate-180"
				width="16"
				height="14"
				viewBox="0 0 16 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 7H14.7143"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M8.71436 1L14.7144 7L8.71436 13"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			Вернуться назад
		</button>
	</div>
</template>
