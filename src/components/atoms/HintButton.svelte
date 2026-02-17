<script lang="ts">
interface Props {
	text: string;
	mobileText?: string;
	side?: "left" | "right";
}

let { text, mobileText, side = "right" }: Props = $props();

let isExpanded = $state(false);
let isTouchDevice = $state(false);

function open() {
	if (!isTouchDevice) isExpanded = true;
}

function close() {
	if (!isTouchDevice) isExpanded = false;
}

function handleTouchStart() {
	isTouchDevice = true;
	isExpanded = !isExpanded;
}
</script>

<button
	class="hint-btn"
	class:is-expanded={isExpanded}
	class:side-left={side === "left"}
	class:side-right={side === "right"}
	onmouseenter={open}
	onmouseleave={close}
	onfocus={open}
	onblur={close}
	ontouchstart={handleTouchStart}
	type="button"
	aria-label={isExpanded ? "Close hint" : "Show hint"}
>
	<span class="hint-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"/><path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"/></svg></span>
	{#if mobileText}
		<span class="hint-text mobile-text">{mobileText}</span>
		<span class="hint-text desktop-text">{text}</span>
	{:else}
		<span class="hint-text">{text}</span>
	{/if}
</button>

<style>
	.hint-btn {
		position: fixed;
		bottom: 1.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0;
		height: 2.5rem;
		padding: 0;
		background: transparent;
		border: 1px solid oklch(1 0 0 / 0.2);
		border-radius: 9999px;
		color: var(--color-on-surface);
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		transition: width 400ms ease-out;
		width: 2.5rem;
		max-width: fit-content;
		z-index: 50;
	}

	.side-right {
		right: 1.5rem;
		flex-direction: row-reverse;
		display: none;
	}

	@media (min-width: 768px) {
		.side-right {
			display: inline-flex;
		}
	}

	.side-left {
		left: 1.5rem;
	}

	.hint-btn.is-expanded {
		width: calc(100vw - 3rem);
	}

	@media (min-width: 768px) {
		.hint-btn.is-expanded {
			width: calc(50vw - 2.5rem);
		}
	}

	.hint-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
		height: 2.5rem;
		font-size: 1rem;
		font-weight: 600;
		color: oklch(0.6 0 0);
		flex-shrink: 0;
	}

	.hint-text {
		font-size: 0.8rem;
		color: oklch(0.6 0 0);
		opacity: 0;
		transition: opacity 300ms ease-out 100ms;
	}

	.side-left .hint-text {
		padding-right: 1rem;
	}

	.side-right .hint-text {
		padding-left: 1rem;
	}

	.desktop-text {
		display: none;
	}

	@media (min-width: 768px) {
		.mobile-text {
			display: none;
		}
		.desktop-text {
			display: inline;
		}
	}

	.hint-btn.is-expanded .hint-text {
		opacity: 1;
	}

	.hint-btn:not(.is-expanded) .hint-text {
		transition: opacity 150ms ease-out;
	}

	.hint-btn:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.hint-btn,
		.hint-text {
			transition-duration: 0.01ms !important;
		}
	}
</style>
