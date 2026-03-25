<script lang="ts">
	let popover: HTMLDivElement;
	let closeBtn: HTMLButtonElement;
	let progressContainer: HTMLDivElement;
	let progressBar: HTMLDivElement;
</script>

<div
	id="pop"
	bind:this={popover}
	popover
	role="dialog"
	aria-modal="true"
	aria-labelledby="pop-title"
>
	<div class="popover-content">
		<h2 id="pop-title">Special Toast Message</h2>
		<p>This is a bold, editorial popover. Click outside or the button below to close.</p>
		<button bind:this={closeBtn} class="close-popover-btn" aria-label="Close popover">×</button>
		<div bind:this={progressContainer} id="popover-progress" class="popover-progress" hidden>
			<div bind:this={progressBar} class="popover-progress-bar"></div>
		</div>
	</div>
</div>
