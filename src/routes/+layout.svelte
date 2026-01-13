<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate } from '$app/navigation';
	/**
	 * Importing actionStore and ActionTypes
	 */
	import { actionStore } from '$lib/actionStore.svelte';
	import { ActionTypes } from '$lib/actionTypes';

	let { children } = $props();

	// $effect(() => {
	// 	$inspect(actionStore.action?.type);
	// });

	afterNavigate(() => {
		// This function runs after a navigation to a new page has completed.
		// It calls the reset function from our central store.
		actionStore.dispose();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- If any action exists, show its name. -->
{#if actionStore.action}
	<div>{actionStore.action.type}</div>
{/if}

{@render children()}

<!-- Cargo-specific markdown examples -->

<!-- The 'if' block now acts as a type guard for actionStore.action.cargo -->
{#if actionStore.action?.type === ActionTypes.CONTACT_US}
	<h2>Contact us</h2>
	<div data-contact-us>
		<div>
			<!-- TypeScript now knows this is ContactUsCargo -->
			{actionStore.action.cargo.email}
		</div>
		<div>
			{actionStore.action.cargo.subject}
		</div>
	</div>
{/if}

{#if actionStore.action?.type === ActionTypes.DOWNLOAD_PRODUCT}
	<h2>Download Products</h2>
	<div data-contact-us>
		<div>
			<!-- TypeScript now knows this is DownloadProductsCargo -->
			{actionStore.action.cargo.email}
		</div>
		<div>
			{actionStore.action.cargo.productId}
		</div>
	</div>
{/if}
