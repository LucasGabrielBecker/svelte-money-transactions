<script lang="ts">
	import { fade } from 'svelte/transition';
	import {onMount} from 'svelte'
	import type { Transaction } from '../../types/transaction';
	import { writable } from 'svelte/store';
	
	export let show: boolean = false;
	export let data: Transaction;


	const progress = writable(0);

	const toggle = () => {
		show = !show;
	};

	const modalType = {
		Resgate: 'Resgate',
		Depósito: 'Depósito',
		'Movimentação Interna': 'Movimentação Interna'
	};

	const statusInfoPosition = {
		Depósito: 'absolute right-2',
		Resgate: 'absolute left-2',
		'Movimentação Interna': 'transform translate-x-6/12'
	};

	onMount(() => {

	data && data.title === 'Resgate' && progress.set(0.1)
	data && data.title === 'Depósito' && progress.set(0.5)
	data && data.title === 'Movimentação Interna' && progress.set(1)
	})
</script>

{#if show}
	<div
		in:fade
		out:fade
		data-testid="modal"
		class="absolute z-[900] text-gray-800 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.3)] flex justify-center items-center"
	>
		<div
			data-testid="modal-content"
			class="relative text-lg font-bold w-[600px] h-[600px] bg-white rounded-lg  flex justify-center items-center"
		>
			<button
				data-testid="modal-close-button"
				on:click={toggle}
				class="absolute top-4 right-4 p-2 hover:scale-125 transition-all">X</button
			>

			<div class="flex flex-col items-center w-full justify-center p-24">
				{modalType[data.title]}
				<div class="flex w-full mt-12 justify-between">
					<span>Solicitada</span>
					<span>Processando</span>
					<span>Concluida</span>
				</div>

				<div class="w-full mb-4 mt-12">
						<div class="border-b-2 border-gray-700 flex flex-col text-gray-700">
							<p>Transferindo de
						</div>
						<p class="text-gray-500 font-sm">{data.from}</p>
				</div>

					<div class="w-full">
						<div class="border-b-2 border-gray-700 flex flex-col text-gray-700">
							<p>Transferindo para
						</div>
						<p class="text-gray-500 font-sm">{data.to}</p>
				</div>


			</div>
		</div>
	</div>
{/if}

<style>
	progress {
		display: block;
		width: 100%;
	}
	</style>