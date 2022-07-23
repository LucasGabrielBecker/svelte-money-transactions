<script lang="ts">
	import type { Transaction } from '../../types/transaction';
	import { closeModal } from 'svelte-modals';
	import { Env } from '../../env';
	import Spinner from '../spinner/Spinner.svelte';
	import { tweened } from 'svelte/motion';
	export let id: string, isOpen: boolean;

	const progress = tweened(0.05);

	let transaction = getTransaction();
	const localStorageKey = 'transaction_data';

	async function getTransaction(): Promise<Transaction> {
		const barStatuses = new Map();
		barStatuses.set('created', 0.05);
		barStatuses.set('processing', 0.5);
		barStatuses.set('processed', 1);
		let existentData = window.sessionStorage.getItem(localStorageKey);
		existentData = existentData ? JSON.parse(existentData) : null;

		if (existentData && existentData[id]) {
			const cachedTransaction = existentData[id] as unknown as Transaction;
			const result = barStatuses.get(cachedTransaction.status);
			progress.set(result);

			return cachedTransaction;
		}

		const res = await fetch(`${Env.BACKEND_URL}/${id}`);
		const data: Transaction = await res.json();
		window.sessionStorage.setItem(
			localStorageKey,
			JSON.stringify(existentData ? { ...existentData, [id]: data } : { [id]: data })
		);
		const result = barStatuses.get(data.status);
		progress.set(result);
		return data;
	}
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents text-gray-700">
			{#await transaction}
				<Spinner />
			{:then result}
				<div class="flex flex-col justify-center w-full px-12">
					<div class="mb-6 text-gray-900 text-center text-xl font-bold">{result.title}</div>

					<progress value={$progress} />
					<div class="flex justify-between text-gray-700 text-sm mb-16">
						<span>Solicitada</span>
						<span>Processando</span>
						<span>Concluida</span>
					</div>

					<div class="border-b-2 border-gray-700 text-lg font-bold text-gray-900">
						Transferindo de
					</div>
					<div class="text-sm flex justify-between text-gray-500 mt-2">
						<span>{result.from}</span>
						<span class="font-bold">R$ {result.amount}</span>
					</div>

					<div class="border-b-2 border-gray-700 text-lg font-bold text-gray-900 mt-12">Para</div>
					<div class="text-sm flex justify-between text-gray-500  mt-2">
						<span>{result.from}</span>
						<span class="font-bold">R$ {result.amount}</span>
					</div>
				</div>
			{:catch error}
				{error.message && error.message}
			{/await}

			<div class="actions">
				<button on:click={closeModal}>OK</button>
			</div>
		</div>
	</div>
{/if}

<style>
	progress {
		display: block;
		width: 100%;
		border-radius: 15px;
		margin-bottom: 20px;
	}
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 600px;
		border-radius: 6px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	.actions {
		margin-top: 32px;
		display: flex;
		justify-content: flex-end;
	}
</style>
