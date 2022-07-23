<script lang="ts">
	export let label: string;
	export let header: boolean = false;
</script>

<div
	class={`pl-10 py-4 flex w-[400px] border-b-[1px] border-gray-400 transition-all items-center justify-between ${
		header && 'bg-gray-600 font-bold text-white'
	}`}
>
	{label}
	<slot />
</div>
