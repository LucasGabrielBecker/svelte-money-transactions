<script>
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="w-full px-12 py-4">
	<img
		src="/Rock_On_R-Angle_A1.png"
		class="hover:scale-125 transition-all"
		alt="hand logo"
		width="100px"
	/>
</div>
<slot />

<style>
	:global(body) {
		height: 100vh;
		width: 100%;
		padding: 0;
		margin: 0;
		font-family: 'Poppins', sans-serif;
	}
</style>
