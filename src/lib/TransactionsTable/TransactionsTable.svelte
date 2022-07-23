<script lang="ts">
	import type { Transaction } from '../../types/transaction';
	import Cell from './Cell.svelte';
	import { IconDetails, EyeIcon } from '../Icons';
	import { Button } from '../button';
	import Modal from '../modal/Modal.svelte';
	import { openModal } from 'svelte-modals';

	function handleClick(id: string) {
		openModal(Modal, { id });
	}

	export let transactions: Transaction[];
	export let statusFilter: string;

	$: data = statusFilter ? transactions.filter((t) => t.status === statusFilter) : transactions;

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
			<Cell label={`R$ ${transaction.amount}`}>
				<Button icon={EyeIcon} on:click={() => handleClick(transaction.id)} />
			</Cell>
		</div>
	{/each}
</div>
