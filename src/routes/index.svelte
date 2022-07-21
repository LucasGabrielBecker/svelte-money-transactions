<script lang="ts">
	import Modal from '../lib/modal/Modal.svelte';

	let showModal: boolean = false;
	let search: string;
</script>

<div class="flex px-32">
	<input
		bind:value={search}
		placeholder="Pesquise pelo titulo"
		class="px-4 py-2 border border-gray-400 rounded-lg"
	/>
</div>
<Modal show={showModal} />
<button on:click={() => (showModal = !showModal)}>show modal</button>
