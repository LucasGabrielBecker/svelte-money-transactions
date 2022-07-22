<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Transaction } from '../../types/transaction';
	export let show: boolean = false;

	export let data: Transaction;

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
</script>

{#if show}
	<div
		in:fade
		out:fade
		data-testid="modal"
		class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.3)] w-full h-full flex justify-center items-center"
	>
		<div
			data-testid="modal-content"
			class="relative text-lg font-bold w-[600px] h-[600px] rounded-lg  flex justify-center items-center"
		>
			<button
				data-testid="modal-close-button"
				on:click={toggle}
				class="absolute top-4 right-4 p-2 hover:scale-125 transition-all">X</button
			>

			<div class="flex flex-col w-full justify-center bg-white p-24">
				{modalType[data.title]}

				<div class="flex flex-col relative bg-white border border-gray-800">
					<div class={` w-8 h-8 rounded-full bg-green-700 ${statusInfoPosition[data.title]}`} />
				</div>
				<div class="flex  mt-12 justify-between">
					<span>Solicitada</span>
					<span>Processando</span>
					<span>Concluida</span>
				</div>
			</div>
		</div>
	</div>
{/if}
