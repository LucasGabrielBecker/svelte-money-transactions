<script lang="ts">
  export let options;
  export let value
  import {capitalize} from '../../utils'
  </script>

<select
    bind:value={value}
    class="px-8 w-[180px] py-2 mt-2 md:mt-0 ml-4 border-[1px] border-gray-400 rounded-md outline-none text-gray-700 h-[48px]"
		>
		<option selected value={null}>Todos</option>
			{#each options as row}
				<option value={row}>{capitalize(row)}</option>
			{/each}
</select>