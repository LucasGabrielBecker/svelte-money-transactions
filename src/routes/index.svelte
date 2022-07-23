<script lang="ts">
	import Modal from '$lib/modal/Modal.svelte';
	import Input from '$lib/input/Input.svelte';
	import { Select } from '$lib/select';
	import { Spinner } from '$lib/spinner';
	import TransactionsTable from '../lib/TransactionsTable/TransactionsTable.svelte';
	import type { Transaction } from '../types/transaction';
	import { Env } from '../env';

	let transactions = getTransactions();
	let statusFilter: string = '';
	let search: string;

	async function getTransactions(): Promise<Transaction[]> {
		const res = await fetch(Env.BACKEND_URL);
		const data = await res.json();
		return data;
	}
</script>

<div class="">
	{#await transactions}
		<img
			src="/Rock_On_R-Angle_A1.png"
			class="hover:scale-125 transition-all mr-2 lg:mr-4"
			alt="hand logo"
			width="100px"
		/>
		<Spinner />
	{:then result}
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
			<Select bind:value={statusFilter} options={[...new Set(result.map((t) => t.status))]} />
		</div>

		<TransactionsTable
			transactions={search
				? result.filter(
						(t) =>
							t.title.toLowerCase().startsWith(search) ||
							t.description.toLowerCase().startsWith(search)
				  )
				: result}
			{statusFilter}
		/>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<!-- <button on:click={() => (showModal = !showModal)}>show modal</button> -->
