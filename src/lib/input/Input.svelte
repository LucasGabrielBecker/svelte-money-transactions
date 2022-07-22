<script lang="ts">
	export let placeholder: string = 'Digite aqui';
	export let onChange: any;
</script>

<input
	type="text"
	data-testid="input"
	on:change={(e) => onChange(e.currentTarget.value)}
	autocapitalize="sentences"
	{placeholder}
	class="h-[48px] ml-4 outline-none rounded-md px-6 py-2 border border-gray-600 focus:border-2 focus:border-gray-400"
/>
