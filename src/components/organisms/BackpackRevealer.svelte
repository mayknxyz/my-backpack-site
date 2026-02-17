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

function handleClick() {
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

let keyBuffer = $state("");
let keyTimer: ReturnType<typeof setTimeout>;

const shortcuts: Record<string, string> = {};
for (const tool of tools) {
	shortcuts[tool.shortCode] = tool.url;
}

function handleGlobalKeyDown(e: KeyboardEvent) {
	if (
		e.target instanceof HTMLInputElement ||
		e.target instanceof HTMLTextAreaElement
	)
		return;
	if (e.metaKey || e.ctrlKey || e.altKey) return;

	clearTimeout(keyTimer);
	keyBuffer += e.key.toLowerCase();

	const match = shortcuts[keyBuffer];
	if (match) {
		keyBuffer = "";
		window.open(match, "_blank", "noopener,noreferrer");
		return;
	}

	keyTimer = setTimeout(() => {
		keyBuffer = "";
	}, 500);
}

$effect(() => {
	window.addEventListener("keydown", handleGlobalKeyDown);
	return () => window.removeEventListener("keydown", handleGlobalKeyDown);
});
</script>

<div
	class="backpack-revealer"
	role="group"
	aria-label="My Backpack — hover or activate to explore tools"
	onclick={handleClick}
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
			loading="lazy"
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
				<span class="tool-icon" aria-hidden="true">{@html tool.icon}</span>
				<span class="tool-name">{tool.name}<span class="tool-short-code">[{tool.shortCode}]</span></span>
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
		transition: opacity 2400ms ease-out;
		animation: breathe 4s ease-in-out infinite;
	}

	.backpack-closed.is-open {
		opacity: 0;
		animation: none;
		transition: opacity 800ms ease-out;
	}

	.backpack-open {
		position: absolute;
		inset: 0;
		display: block;
		opacity: 0;
		scale: 1;
		transition:
			opacity 2400ms ease-out,
			scale 2400ms ease-out;
	}

	.backpack-open.is-open {
		opacity: 1;
		scale: 1.02;
		transition:
			opacity 800ms ease-out,
			scale 800ms ease-out;
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
		flex-wrap: nowrap;
		justify-content: center;
		gap: 1.25rem;
		position: absolute;
		bottom: 110%;
		left: 50%;
		translate: -50% 65%;
		width: max-content;
		pointer-events: none;
		z-index: 10;
		transition: translate 800ms ease-out;
		will-change: translate;
	}

	.tool-items.is-open {
		translate: -50% 0;
		pointer-events: auto;
	}

	/* Individual tool pill */
	.tool-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.375rem 0.75rem;
		background: transparent;
		color: var(--color-on-surface);
		border: 1px solid oklch(1 0 0 / 0.2);
		border-radius: var(--radius-md);
		box-shadow: 0 2px 8px oklch(1 0 0 / 0.15);
		text-decoration: none;
		font-size: 0.5rem;
		font-weight: 400;
		white-space: nowrap;

		/* Start state: hidden, slightly smaller */
		opacity: 0;
		scale: 0.8;
		transition:
			opacity 700ms ease-out,
			scale 700ms ease-out,
			font-size 800ms ease-out,
			border-color 150ms ease;
		/* Staggered delay based on index */
		transition-delay: calc(var(--i) * 80ms + 200ms);
	}

	.tool-items.is-open .tool-pill {
		opacity: 1;
		scale: 1;
		font-size: clamp(0.85rem, 3vw, 1.5rem);
	}

	/* Reverse stagger on close — last item disappears first, faster */
	.tool-items:not(.is-open) .tool-pill {
		transition:
			opacity 300ms ease-out,
			scale 300ms ease-out,
			font-size 300ms ease-out,
			border-color 150ms ease;
		transition-delay: calc((var(--total) - 1 - var(--i)) * 50ms);
	}

	.tool-pill:hover,
	.tool-pill:focus-visible {
		background: transparent;
		color: white;
		border-color: var(--color-primary);
		translate: 0 -2px;
		scale: 1.03;
	}

	.tool-pill:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.tool-icon {
		display: inline-flex;
		width: 1em;
		height: 1em;
		color: oklch(0.6 0 0);
	}

	.tool-icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.tool-short-code {
		color: oklch(0.6 0 0);
		font-size: 0.5em;
		margin-left: 0.25em;
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
		.tool-items,
		.tool-pill {
			transition-duration: 0.01ms !important;
			transition-delay: 0ms !important;
			animation: none !important;
		}
	}
</style>
