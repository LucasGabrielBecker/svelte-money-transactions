<script lang="ts">
	import Modal from '$lib/modal/Modal.svelte';
	import Input from '$lib/input/Input.svelte';
	import TransactionsTable from '../lib/TransactionsTable/TransactionsTable.svelte';
	import type { Transaction } from '../types/transaction';

	let showModal: boolean = false;
	let transactions = getTransactions();
	let statusFilter: string = '';
	let search: string;

	let selectedRow: Transaction;
	const handleShowDetails = (event: { detail: Transaction }) => {
		selectedRow = event.detail.data;
		showModal = true;
	};
	async function getTransactions(): Promise<Transaction[]> {
		const res = await fetch('https://warren-transactions-api.herokuapp.com/api/transactions');
		const data = await res.json();
		return data;
	}

	const capitalize = ([firstLetter, ...rest]: string) => firstLetter.toUpperCase() + rest.join('');
</script>

<div class="px-32">
	<Modal show={showModal} data={selectedRow} />

	<div class="flex items-center mb-12 sticky top-0 bg-white">
		<img
			src="/Rock_On_R-Angle_A1.png"
			class="hover:scale-125 transition-all"
			alt="hand logo"
			width="100px"
		/>

		<Input onChange={(value) => (search = value)} />
	</div>

	{#await transactions}
		<p>Getting data...</p>
	{:then result}
		<select
			bind:value={statusFilter}
			class="px-8 py-2 border-2 border-blue-200 rounded-md outline-none"
		>
			{#each [...new Set(result.map((t) => t.status))] as row}
				<option value={row}>{capitalize(row)}</option>
			{/each}
		</select>
		<TransactionsTable
			transactions={search
				? result.filter((t) => t.title.toLowerCase().startsWith(search))
				: result}
			{statusFilter}
			on:TRANSACTION_DETAILS={handleShowDetails}
		/>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<!-- <button on:click={() => (showModal = !showModal)}>show modal</button> -->
