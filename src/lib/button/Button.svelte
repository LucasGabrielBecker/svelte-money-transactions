<script lang="ts">
	export let icon: HTMLOrSVGElement | null = null;
	export let label: string | null;
</script>

<button
	on:click
	class="border border-gray-300 hover:bg-gray-600 hover:scale-110 px-4 rounded-lg transition-all"
>
	{#if icon}
		<svelte:component this={icon} />
	{/if}
	{#if label}
		{label}
	{/if}
</button>
