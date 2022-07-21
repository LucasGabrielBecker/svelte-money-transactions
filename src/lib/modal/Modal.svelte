<script lang="ts">
	import { fade } from 'svelte/transition';
	export let show: boolean = false;

	const toggle = () => {
		show = !show;
	};
</script>

<div
	in:fade
	out:fade
	data-testid="modal"
	class:hidden={!show}
	class="absolute top-0 w-full h-full flex justify-center items-center"
>
	{#if show}
		<div
			data-testid="modal-content"
			class="relative text-lg font-bold w-[600px] h-[600px] rounded-lg bg-green-600 flex justify-center items-center"
		>
			<button
				data-testid="modal-close-button"
				on:click={toggle}
				class="absolute top-4 right-4 p-2 hover:scale-125 transition-all">X</button
			>
			Hello modal
		</div>
	{/if}
</div>
