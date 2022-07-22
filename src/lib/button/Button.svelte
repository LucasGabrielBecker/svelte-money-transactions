<script lang="ts">
	export let icon: HTMLOrSVGElement | null = null;
	export let label: string | null;
</script>

	<button on:click >
		{#if icon}
			<svelte:component this={icon}/>
		{/if}
		{#if label}
			{label}
		{/if}
	</button>
