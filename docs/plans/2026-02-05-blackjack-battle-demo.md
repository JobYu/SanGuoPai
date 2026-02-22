# 2026-02-05-blackjack-battle-demo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a playable 21-point battle demo where players select a general and fight an enemy using blackjack rules and unique skills.

**Architecture:** 
- SPA (Single Page Application) using Vanilla JavaScript, HTML, and CSS.
- State-based game loop (INITIAL, PLAYER_TURN, ENEMY_TURN, SETTLEMENT).
- Data-driven design using `generals.json` and `enemies.json`.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6+).

---

### Task 1: Project Setup & Data Loading
**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `js/main.js`
- Create: `js/data.js`

**Steps:**
1. Create `index.html` with selection/battle screen placeholders.
2. Setup `style.css` with a "SanGuo" aesthetic (red, black, wood-like textures).
3. Implement `js/data.js` to load `data/generals.json` and `data/enemies.json`.

### Task 2: Core Blackjack Logic
**Files:**
- Create: `js/blackjack.js`

**Steps:**
1. Create a `Deck` class with `shuffle()` and `draw()` methods.
2. Create a `Hand` class to calculate points (handling Aces correctly: 1 or 11).

### Task 3: State Machine & Battle Flow
**Files:**
- Modify: `js/main.js`

**Steps:**
1. Define a state machine: `INIT`, `SELECT_GENERAL`, `DEAL`, `PLAYER_TURN`, `ENEMY_TURN`, `RESULT`.
2. Implement transition logic for each state.

### Task 4: UI Development
**Files:**
- Create: `js/ui.js`

**Steps:**
1. Implement `renderSelection()` to show generals.
2. Implement `renderBattle()` to show cards, HP, and action buttons.
3. Add hover effects and animations for a "premium" feel.

### Task 5: Combat & Skills
**Files:**
- Create: `js/combat.js`

**Steps:**
1. Implement `calculateDamage()` using `(Base + Additive) * Multiplier`.
2. Implement a basic skill resolver that checks `skill_trigger` and `condition`.

### Task 6: Final Verification
**Steps:**
1. Test "Zhang Jiao" skill: verify +20 damage on settlement.
2. Test "Cheng Yuanzhi" AI: verify it stands at 18.
3. Verify win/loss conditions and HP depletion.
