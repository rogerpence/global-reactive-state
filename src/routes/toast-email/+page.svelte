<script lang="ts">
	import type { PageProps } from './$types';
	import { actionStore } from '$lib/actionStore.svelte';
	import { ActionTypes, type EmailToastCargo } from '$lib/actionTypes';

	const cargo: EmailToastCargo = {
		email: 'rp@asna.com',
		message: 'Your email was sent to ASNA.com. Thank you very much'
	};

	function showEmailToast() {
		actionStore.trigger(ActionTypes.TOAST_EMAIL, cargo);
	}

	let { data }: PageProps = $props();
</script>

<a href="/">Goto root</a><br />

This is page 2 -- download products page.

<button onclick={showEmailToast}>Show email toast</button>

