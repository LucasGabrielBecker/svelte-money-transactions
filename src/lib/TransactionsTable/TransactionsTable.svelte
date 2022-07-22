<script lang="ts">
	import { type Transaction, Events } from '../../types/transaction';
	import { createEventDispatcher } from 'svelte';
	import Cell from './Cell.svelte';
	import { IconDetails } from '../Icons';
	import { Button } from '../button';
	export let transactions: Transaction[];
	export let statusFilter: string;

	const dispatch = createEventDispatcher();

	const handleSeeDetails = (transaction: Transaction) => {
		dispatch(Events.TRANSACTION_DETAILS, {
			data: transaction
		});
	};

	$: data = statusFilter ? transactions.filter((t) => t.status == statusFilter) : transactions;

	let columns = ['Titulo', 'Descrição', 'Status', 'Valor'];

	let rowStyle =
		'pl-8 py-4 flex w-[400px] border-b-[1px] border-gray-400 hover:bg-gray-200 transition-all';
</script>

<div class="flex items-center ">
	{#each columns as c}
		<Cell label={c} header={true} />
	{/each}
</div>

{#each data as transaction}
	<div class="flex w-full">
		<Cell label={transaction.title} />
		<Cell label={transaction.description} />
		<Cell label={transaction.status} />
		<Cell label={`R$ ${transaction.amount}`} />

		<Button icon={<IconDetails />} label={null} />
	</div>
{/each}
