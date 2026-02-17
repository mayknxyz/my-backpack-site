<script lang="ts">
import type { Tool } from "../../data/tools";

interface Props {
	closedSrc: string;
	openSrc: string;
	tools: Tool[];
}

let { closedSrc, openSrc, tools }: Props = $props();

let isOpen = $state(false);
let isTouchDevice = $state(false);

function handleMouseEnter() {
	if (!isTouchDevice) isOpen = true;
}

function handleMouseLeave() {
	if (!isTouchDevice) isOpen = false;
}

function handleTouchStart() {
	isTouchDevice = true;
	isOpen = !isOpen;
}

function handleKeyDown(e: KeyboardEvent) {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		isOpen = !isOpen;
	}
	if (e.key === "Escape" && isOpen) {
		isOpen = false;
	}
}
</script>

<div
	class="backpack-revealer"
	role="group"
	aria-label="My Backpack — hover or activate to explore tools"
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	ontouchstart={handleTouchStart}
>
	<button
		class="backpack-toggle"
		aria-expanded={isOpen}
		aria-controls="backpack-tools"
		onkeydown={handleKeyDown}
		type="button"
	>
		<img
			src={closedSrc}
			alt=""
			width="320"
			height="438"
			class="backpack-closed"
			class:is-open={isOpen}
			loading="eager"
			fetchpriority="high"
		/>
		<img
			src={openSrc}
			alt=""
			width="320"
			height="438"
			class="backpack-open"
			class:is-open={isOpen}
			loading="eager"
		/>
		<span class="sr-only">
			{isOpen ? "Close backpack" : "Open backpack to see tools"}
		</span>
	</button>

	<nav
		id="backpack-tools"
		class="tool-items"
		class:is-open={isOpen}
		aria-label="Tools in my backpack"
	>
		{#each tools as tool, i}
			<a
				href={tool.url}
				class="tool-pill"
				style:--i={i}
				style:--total={tools.length}
				tabindex={isOpen ? 0 : -1}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span class="tool-emoji" aria-hidden="true">{tool.emoji}</span>
				<span class="tool-name">{tool.name}</span>
			</a>
		{/each}
	</nav>
</div>

<style>
	.backpack-revealer {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
	}

	.backpack-toggle {
		position: relative;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: inline-block;
		outline: none;
	}

	.backpack-toggle:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
		border-radius: var(--radius-md);
	}

	.backpack-closed {
		display: block;
		transition: opacity 400ms ease-out;
		animation: breathe 4s ease-in-out infinite;
	}

	.backpack-closed.is-open {
		opacity: 0;
		animation: none;
	}

	.backpack-open {
		position: absolute;
		inset: 0;
		display: block;
		opacity: 0;
		scale: 1;
		transition:
			opacity 400ms ease-out,
			scale 400ms ease-out;
	}

	.backpack-open.is-open {
		opacity: 1;
		scale: 1.02;
	}

	@keyframes breathe {
		0%,
		100% {
			scale: 1;
		}
		50% {
			scale: 1.005;
		}
	}

	/* Tool items — positioned above the backpack opening */
	.tool-items {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		position: absolute;
		bottom: 75%;
		left: 50%;
		translate: -50% 0;
		width: max-content;
		max-width: 280px;
		pointer-events: none;
		z-index: 10;
	}

	.tool-items.is-open {
		pointer-events: auto;
	}

	/* Individual tool pill */
	.tool-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		background: var(--color-surface-alt);
		color: var(--color-on-surface);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-soft);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		white-space: nowrap;

		/* Start state: hidden, shifted down, slightly smaller */
		opacity: 0;
		translate: 0 20px;
		scale: 0.8;
		transition:
			opacity 350ms ease-out,
			translate 350ms ease-out,
			scale 350ms ease-out,
			background-color 150ms ease,
			box-shadow 150ms ease;
		/* Staggered delay based on index */
		transition-delay: calc(var(--i) * 80ms + 200ms);
	}

	.tool-items.is-open .tool-pill {
		opacity: 1;
		translate: 0 0;
		scale: 1;
	}

	/* Reverse stagger on close — last item disappears first */
	.tool-items:not(.is-open) .tool-pill {
		transition-delay: calc((var(--total) - 1 - var(--i)) * 50ms);
	}

	.tool-pill:hover,
	.tool-pill:focus-visible {
		background: var(--color-primary);
		color: white;
		box-shadow: var(--shadow-lifted);
		translate: 0 -2px;
		scale: 1.03;
	}

	.tool-pill:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.tool-emoji {
		font-size: 1.125rem;
		line-height: 1;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	/* Reduced motion: instant transitions, no animation */
	@media (prefers-reduced-motion: reduce) {
		.backpack-closed,
		.backpack-open,
		.tool-pill {
			transition-duration: 0.01ms !important;
			transition-delay: 0ms !important;
			animation: none !important;
		}
	}
</style>
