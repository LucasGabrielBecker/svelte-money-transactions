<script lang="ts">
	export let placeholder: string = 'Digite aqui';
</script>

<input
	type="text"
	data-testid="input"
	on:keyup
	autocapitalize="sentences"
	{placeholder}
	class="input input-bordered w-full max-w-xs"
/>
