# Feature Specification: Reveal Tool Links on Backpack Hover

**Feature Branch**: `003-reveal-tool-links`
**Created**: 2026-02-17
**Status**: Draft
**GitHub Issue**: [#3](https://github.com/mayknxyz/my-backpack-site/issues/3)

## Overview

The landing page has a backpack image that already transitions between closed and open states on hover. We want to extend this so that opening the backpack reveals links to other tools/sites — the metaphor being "open the backpack to see what's inside."

## Problem

The backpack landing page currently only shows a static logo with no way to discover or navigate to the tools it represents. Users have no visible path to the actual tools/sites.

## User Scenarios

### User Story 1 - Desktop Discovery (Priority: P1)

A visitor hovers over the backpack to explore the site and sees the available tools emerge from the opened backpack.

**Acceptance Scenarios**:

1. **Given** the landing page is loaded, **When** the user hovers over the backpack image, **Then** the backpack opens and tool links animate upward as pills with staggered timing
2. **Given** the backpack is open, **When** the user moves the mouse away, **Then** the pills animate back down (reverse stagger) and the backpack closes
3. **Given** the backpack is open, **When** the user clicks a tool pill, **Then** the tool opens in a new tab

### User Story 2 - Mobile Discovery (Priority: P1)

A mobile visitor taps the backpack to toggle it open/closed.

**Acceptance Scenarios**:

1. **Given** the landing page is loaded on a touch device, **When** the user taps the backpack, **Then** the backpack opens and tool pills appear
2. **Given** the backpack is open, **When** the user taps the backpack again, **Then** the pills disappear and the backpack closes

### User Story 3 - Keyboard Navigation (Priority: P1)

A keyboard user navigates to the backpack and activates it to discover tools.

**Acceptance Scenarios**:

1. **Given** the backpack is focused, **When** the user presses Enter or Space, **Then** the backpack opens and tool pills appear
2. **Given** the backpack is open, **When** the user presses Tab, **Then** focus moves through each tool link
3. **Given** the backpack is open, **When** the user presses Escape, **Then** the backpack closes

## Requirements

### Functional Requirements

- **FR-001**: Hovering (desktop) or tapping (mobile) the backpack reveals tool links as animated pills floating above the backpack opening
- **FR-002**: Tool pills show emoji + name and link to external sites in new tabs
- **FR-003**: Staggered entrance animation — items "emerge" from the backpack; reverse stagger on close
- **FR-004**: Keyboard accessible — Enter/Space to toggle, Tab through links, Escape to close
- **FR-005**: `aria-expanded` on toggle, `tabindex` toggled on links, screen reader announcements
- **FR-006**: Respects `prefers-reduced-motion` (instant transitions)
- **FR-007**: Works with light and dark mode theme tokens
- **FR-008**: Implemented as a Svelte 5 island with `client:visible` directive
- **FR-009**: Tool data centralized in `src/data/tools.ts` using TypeScript `satisfies` pattern

### Tools Data

| Name | URL | Emoji |
|------|-----|-------|
| My Kit | https://mykit.mikenavales.xyz | 🧰 |
| My Buddy | https://mybuddy.mikenavales.xyz | 🤖 |

## Success Criteria

- **SC-001**: Backpack opens on hover/tap/keyboard and reveals tool pills with staggered animation
- **SC-002**: Tool links navigate to correct URLs in new tabs
- **SC-003**: Full keyboard navigation works (Enter/Space/Tab/Escape)
- **SC-004**: Screen readers announce expanded state and tool navigation
- **SC-005**: Animations disabled under `prefers-reduced-motion`
- **SC-006**: Visual appearance correct in both light and dark mode
- **SC-007**: `bun run build` succeeds with no errors
- **SC-008**: `bun run lint` passes Biome checks
