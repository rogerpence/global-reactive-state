<script lang="ts">
	import type { PageProps } from './$types';
	import { actionStore } from '$lib/actionStore.svelte';
	import { ActionTypes, type DownloadProductsCargo } from '$lib/actionTypes';

	function handleContactUs() {
		actionStore.trigger(ActionTypes.CONTACT_US, {
			email: 'test@example.com',
			subject: 'From the contact page'
		});
	}

	const cargo: DownloadProductsCargo = {
		email: 'rp@asna.com',
		productId: '345'
	};

	function handleDownloadProduct() {
		actionStore.trigger(ActionTypes.DOWNLOAD_PRODUCT, cargo);
	}

	let { data }: PageProps = $props();

	// export const ActionTypesxx = {
	// 	CONTACT_US: 'CONTACT_USdd',
	// 	DOWNLOAD_PRODUCT: 'DOWNLOAD_PRODUCT'
	// } as const;

	// const tester = [ActionTypesxx.CONTACT_US];
	// console.log(tester);
</script>

<a href="/">Goto root</a><br />
<a href="/test1">Test 1</a><br />
<a href="/test2">Test 2</a><br />

This is page 1 -- contact us page

<div><button onclick={handleContactUs}>Contact Us</button></div>
<div><button onclick={handleDownloadProduct}>Download Products</button></div>
