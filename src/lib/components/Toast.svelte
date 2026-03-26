<script lang="ts">
	import { onMount } from 'svelte';
	import { type EmailToastCargo, type ToastPersona } from '$lib/actionTypes';

	let popover: HTMLDivElement;
	let currentData: EmailToastCargo;

	let openPopover: HTMLButtonElement;

	export const showPopover = () => {
		openPopover.click();
	};

	export const setData = (data: EmailToastCargo) => {
		currentData = data;
	};

	const closePopover = () => {
		popover.hidePopover();
	};

	onMount(() => {
		popover.addEventListener('beforetoggle', (event: ToggleEvent) => {
			if (event.oldState == 'closed') {
				// popover is going to be opened
				console.log('popover is opening');
			}
		});
	});
</script>

<!-- 
    This button opens the popover without JavaScript. It doesn't get 
    explicitly clicked--this component "clicks" the button with its clicked() method. 
    Therefore, this button is hidden from view and takes no space in the DOM.
 -->

<button
	bind:this={openPopover}
	style="position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0"
	id="myPopoverTrigger"
	popovertarget="myPopover"
>
	I am invisible! But I need to be here.
</button>

<div bind:this={popover} id="myPopover" class="my-popover" popover>
	<button onclick={closePopover}>Close</button>
	<h2>{currentData?.title}</h2>
	<p>{currentData?.message}</p>
</div>
