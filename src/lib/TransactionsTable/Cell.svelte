<script lang="ts">
	export let label: string;
	export let header: boolean = false;
</script>

<div
	data-testid="cell"
	class={`pl-10 py-4 flex w-[400px] border-b-[1px] text-white border-gray-400 transition-all items-center justify-between ${
		header && 'bg-gray-600 font-bold'
	}`}
>
	{#if label}
		{label}
	{/if}
	<slot />
</div>
