<script lang="ts">
	import type { PageProps } from './$types';

	import { actioner } from './exporter.svelte';

	// let numbers = $state([1, 2, 3]);

	// let total = $derived.by(() => {
	// 	let sum = 0;
	// 	for (const n of numbers) {
	// 		sum += n;
	// 	}
	// 	return sum;
	// });

	function changer() {
		actioner.changex();
	}

	let { data }: PageProps = $props();
</script>

<button onclick={changer}>Click me</button>

<div>
	{actioner.gog}
</div>
