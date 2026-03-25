<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import '../style.css';
	/**
	 * Importing actionStore and ActionTypes
	 */
	import { actionStore } from '$lib/actionStore.svelte';
	import { ActionTypes } from '$lib/actionTypes';
	import { dev } from '$app/environment';
	import Toast from '$lib/components/Toast.svelte';

	/**
	 * There currently isn't any children passed to
	 * +layout.svelte.
	 */
	let { children } = $props();

	//let showStuff = $state(false);

	// This is an alternative to the $derived below.
	// $effect(() => {
	// 	if (actionStore.action) {
	// 		//console.log('testing');
	// 		//console.log(JSON.stringify(actionStore.action, null, 4));
	// 		showStuff = true;
	// 	}
	// });

	// !! is a JavaScript idiom to explicitly convert values to true or false, ensuring showStuff
	// is always a boolean rather than the actual object or undefined.

	let toast: ReturnType<typeof Toast>;

	let actionAvailable = $derived(!!actionStore.action);

	$effect(() => {
		if (actionAvailable && actionStore.action?.type == ActionTypes.TOAST_EMAIL) {
			//const x = actionStore.action.cargo.message;
			toast.setData(actionStore.action.cargo);
			toast.showPopover(); // do something
			actionStore.dispose();
		}
	});

	afterNavigate(() => {
		// This function runs after a navigation to a new page has completed.
		// It calls the reset function from our central store.
		actionStore.dispose();
	});
</script>

<!-- <link rel="icon" type="image/svg+xml" href="%sveltekit.assets%/favicon.svg" /> -->

<!-- {#if actionAvailable} -->
<pre>
	{JSON.stringify(actionStore.action?.cargo, null, 4)}
</pre>
<!-- {/if} -->

<svelte:head>
	{#if dev}
		<link rel="icon" type="image/svg+xml" href="/asna-red-favicon.svg" />
	{:else}
		<link rel="icon" type="image/svg+xml" href="/asna-blue-favicon.svg" />
	{/if}
</svelte:head>

<!-- {#if actionStore.action?.type === ActionTypes.TOAST_EMAIL} -->
<Toast bind:this={toast} />
<!-- {/if} -->

<div>
	Action available: {actionAvailable}
</div>

<!-- If any action exists, show its name. -->
{#if actionAvailable}
	<h1>{actionStore?.action?.type}-----?</h1>
{/if}

{#if actionStore.action}
	<div>{actionStore.action.type}</div>
	<!-- <div>
		<pre>
			{JSON.stringify(actionStore.action, null, 4)}
		</pre>
	</div> -->
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
