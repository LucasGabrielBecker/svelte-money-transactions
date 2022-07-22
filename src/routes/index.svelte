<script lang="ts">
	import Modal from '$lib/modal/Modal.svelte';
	import Input from '$lib/input/Input.svelte';
	import {Select} from '$lib/select'
	import TransactionsTable from '../lib/TransactionsTable/TransactionsTable.svelte';
	import type { Transaction } from '../types/transaction';
	import {isModalVisible} from "../store/modal.store"
	
	 let showModal: boolean = false;
	let transactions = getTransactions();
	let statusFilter: string = '';
	let search: string;

	let selectedRow: Transaction;
	const handleShowDetails = (event: { detail: Transaction }) => {
		selectedRow = event.detail;
		showModal = true;
	};
	async function getTransactions(): Promise<Transaction[]> {
		const res = await fetch('https://warren-transactions-api.herokuapp.com/api/transactions');
		const data = await res.json();
		return data;
	}

</script>

<div class="">
	<Modal show={showModal} data={selectedRow} />

	{#await transactions}
		<img
			src="/Rock_On_R-Angle_A1.png"
			class="hover:scale-125 transition-all mr-2 lg:mr-4"
			alt="hand logo"
			width="100px"
		/>
	{:then result}
	<div class="flex flex-col md:flex-row items-center mb-12 sticky top-0 bg-white">
		<img
			src="/Rock_On_R-Angle_A1.png"
			class="hover:scale-125 transition-all mr-4"
			alt="hand logo"
			width="100px"
		/>
		<Input placeholder="Titulo/Descrição" on:keyup={(event) => (search = event.currentTarget.value)} />
		<Select bind:value={statusFilter} options={[...new Set(result.map((t) => t.status))]}/>
	</div>

		<TransactionsTable
			transactions={search
				? result.filter((t) =>  t.title.toLowerCase().startsWith(search) || t.description.toLowerCase().startsWith(search))
				: result}
				{statusFilter}
			on:TRANSACTION_DETAILS={handleShowDetails}
		/>

	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<!-- <button on:click={() => (showModal = !showModal)}>show modal</button> -->
