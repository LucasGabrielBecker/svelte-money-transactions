<script lang="ts">
	import { type Transaction, Events } from '../../types/transaction';
	import { createEventDispatcher } from 'svelte';
	import Cell from './Cell.svelte';
	import { IconDetails } from '../Icons';
	import { Button } from '../button';
	import {isModalVisible} from '../../store/modal.store'


	export let transactions: Transaction[];
	export let statusFilter: string;

	const dispatch = createEventDispatcher();

	$: data = statusFilter ? transactions.filter(t => t.status === statusFilter) : transactions

	const handleSeeDetails = (transaction: Transaction) => {
		dispatch(Events.TRANSACTION_DETAILS,transaction);
	};


	let columns = ['Titulo', 'Descrição', 'Status', 'Valor'];
</script>
<div class="md:px-8">
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

		<Button icon={IconDetails} on:click={() => handleSeeDetails(transaction)}/>
	</div>
{/each}
</div>
