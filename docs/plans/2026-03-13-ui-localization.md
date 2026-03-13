# UI Localization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Traditional Chinese, Simplified Chinese, and English UI localization, with automatic browser language detection and matching UI at startup.

**Architecture:** Introduce a small standalone `i18n` module that owns locale detection, translation lookup, interpolation, and document-level language metadata. Keep gameplay data untouched and localize interface strings in `game_ui.js` and `index.html` through a single translator instance. Verify locale mapping and fallback behavior with isolated `node --test` tests before wiring it into UI rendering.

**Tech Stack:** Vanilla JavaScript ES modules, Vite, Node built-in test runner (`node --test`)

### Task 1: Add test coverage for locale detection

**Files:**
- Create: `tests/i18n.test.js`
- Create: `js/i18n.js`

**Step 1: Write the failing test**

Add tests for:
- `zh-TW` resolves to `zh-TW`
- `zh-CN` resolves to `zh-CN`
- `en-US` resolves to `en`
- unsupported locales fall back to `en`
- `navigator.languages` style arrays prefer the first supported locale

**Step 2: Run test to verify it fails**

Run: `node --test tests/i18n.test.js`

Expected: FAIL because `js/i18n.js` does not exist yet.

**Step 3: Write minimal implementation**

Implement locale normalization and detection helpers in `js/i18n.js`.

**Step 4: Run test to verify it passes**

Run: `node --test tests/i18n.test.js`

Expected: PASS

### Task 2: Add translation lookup and fallback tests

**Files:**
- Modify: `tests/i18n.test.js`
- Modify: `js/i18n.js`

**Step 1: Write the failing test**

Add tests for:
- translating a known key in all 3 languages
- variable interpolation
- missing key fallback behavior

**Step 2: Run test to verify it fails**

Run: `node --test tests/i18n.test.js`

Expected: FAIL because translation lookup is incomplete.

**Step 3: Write minimal implementation**

Add translation dictionaries and a `createTranslator(locale)` helper.

**Step 4: Run test to verify it passes**

Run: `node --test tests/i18n.test.js`

Expected: PASS

### Task 3: Wire localization into browser startup

**Files:**
- Modify: `js/game_ui.js`
- Modify: `index.html`

**Step 1: Write the failing test**

No extra automated DOM test. Reuse the existing i18n tests as coverage for the shared logic.

**Step 2: Write minimal implementation**

In `js/game_ui.js`:
- detect locale from browser state
- create a translator once in `GameState`
- expose helpers for translated labels and interpolated log messages
- set `document.documentElement.lang`
- localize title screen, battle screen, modals, buttons, alerts, logs, and settlement UI

In `index.html`:
- keep static content minimal and compatible with JS-driven title/description updates

**Step 3: Run targeted verification**

Run:
- `node --test tests/i18n.test.js`
- `npm run build`

Expected:
- tests pass
- build succeeds

### Task 4: Document language behavior

**Files:**
- Modify: `README.md`

**Step 1: Write the change**

Add a short note that the browser auto-selects `繁體中文` / `简体中文` / `English` based on system or browser language, with English fallback.

**Step 2: Run targeted verification**

Run: `npm run build`

Expected: PASS
