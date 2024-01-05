<script setup>
const emit = defineEmits(['onClickRemove'])
defineProps({
	id: Number,
	title: String,
	imageUrl: String,
	price: Number
})
</script>
<template>
	<div class="flex items-start gap-3 p-4 border border-gray-200 rounded-2xl">
		<img class="w-16 h-16" :src="imageUrl" alt="Sneakers" />

		<div class="flex flex-col gap-2 text-sm">
			<p>{{ title }}</p>
			<b>{{ price }} руб.</b>
		</div>
		<img
			@click="emit('onClickRemove')"
			class="ml-auto cursor-pointer opacity-50 hover:opacity-100 transition"
			src="/close.svg"
			alt="Close"
		/>
	</div>
</template>
