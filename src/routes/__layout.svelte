<script lang="ts">
	import '../app.css';
	import { Modals, closeModal } from 'svelte-modals';
	let scroll: number = 0;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<slot />

<svelte:window bind:scrollY={scroll} />
<img
	src="/sphere.png"
	width="200"
	class="absolute top-2 right-2 opacity-20"
	style:transform={`translateY(${scroll * 1.2}px`}
	style:scale={scroll * 0.4}
	alt="sphere"
/>
<Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<style>
	:global(body) {
		height: 100vh;
		width: 100%;
		padding: 0;
		margin: 0;
		background-color: #181a1b;
		color: #d5d5d5;
		font-family: 'Poppins', sans-serif;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
