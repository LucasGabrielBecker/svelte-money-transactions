<script lang="ts">
	export let placeholder: string = 'Digite aqui';
</script>

<input
	type="text"
	data-testid="input"
	on:keyup
	autocapitalize="sentences"
	{placeholder}
	class="h-[48px] w-[180px] md:w-[200px] ml-4 outline-none rounded-md px-6 py-2 border bg-slate-800  focus:border-2"
/>
