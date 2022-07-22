<script lang="ts">
	export let icon: HTMLOrSVGElement | null = null;
	export let label: string | null;
</script>

<div>
	{#if icon}
		<slot name="icon" />
	{/if}
	<button on:click>
		{#if label}
			{label}
		{/if}
	</button>
</div>
