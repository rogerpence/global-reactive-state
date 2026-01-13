<script lang="ts">
	import type { PageProps } from './$types';
	import { actionStore } from '$lib/actionStore.svelte';
	import { ActionTypes, type DownloadProductsCargo } from '$lib/actionTypes';

	const cargo: DownloadProductsCargo = {
		email: 'rp@asna.com',
		productId: '345'
	};

	function handleContactUs() {
		actionStore.trigger(ActionTypes.DOWNLOAD_PRODUCT, cargo);
	}

	let { data }: PageProps = $props();
</script>

<a href="/">Goto root</a><br />
<a href="/test1">Test 1</a><br />
<a href="/test2">Test 2</a><br />

This is page 2 -- download products page.

<button onclick={handleContactUs}>Click me</button>
