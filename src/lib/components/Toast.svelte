<script lang="ts">
	import { type EmailToastCargo } from '$lib/actionTypes';

	let popover: HTMLDivElement;
	// let closeBtn: HTMLButtonElement;
	// let progressContainer: HTMLDivElement;
	// let progressBar: HTMLDivElement;

	// interface Props {
	// 	message: string;
	// }

	// let { message } = $props();

	let message: string;

	//message = 'ROGER';

	let openPopover: HTMLButtonElement;

	export const showPopover = () => {
		openPopover.click();
	};

	export const setData = (data: EmailToastCargo) => {
		message = data.message;
	};

	const buttonClicked = (e) => {
		openPopover.click();
	};

	const closePopover = () => {
		popover.hidePopover();
	};
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
	<p>{message}</p>
</div>
