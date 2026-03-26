<script lang="ts">
	import type { PageProps } from './$types';
	import { actionStore } from '$lib/actionStore.svelte';
	import { ActionTypes, type EmailToastCargo } from '$lib/actionTypes';

	const userEmail = 'rp@asna.com';

	const downloadEmailCargo: EmailToastCargo = {
		title: 'Download link on its way',
		email: userEmail,
		message: `A download link was emailed to ${userEmail}. It may take a minute or two to arrive. Please don't forget to check your spam folder.`,
		persona: 'DOWNLOAD'
	};

	const contactUsEmailCargo: EmailToastCargo = {
		title: "Thank you! We'll contact you soon",
		email: userEmail,
		message: `Your email from ${userEmail} was sent to ASNA. We'll contact you soon. Thank you!`,
		persona: 'CONTACT_US'
	};

	function showDownloadEmailToast() {
		actionStore.trigger(ActionTypes.TOAST_EMAIL, downloadEmailCargo);
	}

	function showContactUsEmailToast() {
		actionStore.trigger(ActionTypes.TOAST_EMAIL, contactUsEmailCargo);
	}

	let { data }: PageProps = $props();
</script>

<a href="/">Goto root</a><br />

This is page 2 -- download products page.

<br />
<button onclick={showDownloadEmailToast}>Show download email toast</button>
<br />
<button onclick={showContactUsEmailToast}>Show contact us email toast</button>
