<script context="module">
	export async function load({ fetch }) {
		const res = await fetch(Env.BACKEND_URL);
		return {
			props: {
				data: await res.json()
			}
		};
	}
</script>

<script lang="ts">
	import Input from '$lib/input/Input.svelte';
	import { Select } from '$lib/select';
	import { Spinner } from '$lib/spinner';
	import TransactionsTable from '../lib/TransactionsTable/TransactionsTable.svelte';
	import type { Transaction } from '../types/transaction';
	import { Env } from '../env';

	let statusFilter: string = '';
	let search: string;
	export let data: Transaction[];
</script>

<div class="">
	{#if data}
		<div class="flex flex-col md:flex-row items-center mb-12 sticky top-0 bg-[#181a1b]">
			<img
				src="/Rock_On_R-Angle_A1.png"
				class="hover:scale-125 transition-all mr-4"
				alt="hand logo"
				width="100px"
			/>
			<Input
				placeholder="Titulo/Descrição"
				on:keyup={(event) => (search = event.currentTarget.value)}
			/>
			<Select bind:value={statusFilter} options={[...new Set(data.map((t) => t.status))]} />
		</div>

		<TransactionsTable
			transactions={search
				? data.filter(
						(t) =>
							t.title.toLowerCase().startsWith(search) ||
							t.description.toLowerCase().startsWith(search)
				  )
				: data}
			{statusFilter}
		/>
	{:else}
		<img
			src="/Rock_On_R-Angle_A1.png"
			class="hover:scale-125 transition-all mr-2 lg:mr-4"
			alt="hand logo"
			width="100px"
		/>
		<Spinner />
	{/if}
</div>

<!-- <button on:click={() => (showModal = !showModal)}>show modal</button> -->
