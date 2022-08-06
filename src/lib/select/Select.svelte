<script lang="ts">
	export let options;
	export let value;
	import { capitalize } from '../../utils';
</script>

<select bind:value class="select ml-6 block w-[200px]">
	<option selected value={null}>Todos</option>
	{#each options as row}
		<option value={row}>{capitalize(row)}</option>
	{/each}
</select>
