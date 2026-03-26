<script lang="ts">
	import { onMount } from 'svelte';
	import { type EmailToastCargo, type ToastPersona } from '$lib/actionTypes';

	const AUTO_CLOSE_SECONDS = 0; // Change this value for different auto-close durations
	const PROGRESS_REFRESH_MS = 30; // Milliseconds between progress bar updates

	let popover: HTMLDivElement;
	let currentData: EmailToastCargo;

	let openPopover: HTMLButtonElement;

	let autoCloseTimer: ReturnType<typeof setInterval> | null = null;
	let progressTimer: ReturnType<typeof setInterval> | null = null;
	let progressStart: number | null = null;

	export const showPopover = () => {
		openPopover.click();
	};

	export const setData = (data: EmailToastCargo) => {
		currentData = data;
	};

	const closePopover = () => {
		popover.hidePopover();
	};

	function clearAutoCloseTimer() {
		if (autoCloseTimer) {
			clearTimeout(autoCloseTimer);
			autoCloseTimer = null;
		}
		if (progressTimer) {
			clearInterval(progressTimer);
			progressTimer = null;
		}
		// if (progressBar) {
		//     progressBar.style.width = "100%";
		// }
		// if (progressContainer) {
		//     progressContainer.hidden = true;
		// }
	}

	function startAutoClose() {
		clearAutoCloseTimer();
		if (AUTO_CLOSE_SECONDS > 0) {
			//if (progressContainer) progressContainer.hidden = false;

			progressStart = Date.now();
			// progressBar.style.width = "100%";

			progressTimer = setInterval(() => {
				const elapsed = (Date.now() - progressStart!) / 1000;
				const percent = Math.max(0, 1 - elapsed / AUTO_CLOSE_SECONDS);
				// progressBar.style.width = percent * 100 + "%";
			}, PROGRESS_REFRESH_MS);

			autoCloseTimer = setTimeout(() => {
				popover.hidePopover();
			}, AUTO_CLOSE_SECONDS * 1000);
		} else {
			//if (progressContainer) progressContainer.hidden = true;
		}
	}

	onMount(() => {
		popover.addEventListener('beforetoggle', (event: ToggleEvent) => {
			if (event.oldState == 'closed') {
				// popover is going to be opened
				startAutoClose();
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
	<div id="popover-progress" class="popover-progress" hidden>
		<div class="popover-progress-bar"></div>
	</div>
</div>
