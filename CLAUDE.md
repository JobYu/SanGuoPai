# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SanGuoPai (三國派) is a web-based roguelike card game combining Three Kingdoms theme with Blackjack mechanics. Players recruit generals, use schemes (錦囊), collect relics (寶物), and battle through historical campaigns by playing 21-point blackjack rounds.

**Core damage formula**: `(base_damage + additive_bonuses) × total_multiplier`
- `base_damage = player_points × (10 + (21 - player_points)) + player_points`
- General skills provide additive or multiplicative bonuses based on conditions
- Faction bonuses (魏/蜀/吳/群) activate when 3+ generals from same faction are equipped

## Development Commands

```bash
npm run dev       # Start Vite dev server (default: http://localhost:3000)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

## Architecture

### Entry Points
- `index.html` - Main HTML, loads `js/renderer.js` as module
- `js/renderer.js` - Initializes game, handles responsive scaling (1280x720 base)
- `js/game_ui.js` - Core GameState class with all game logic and UI rendering

### Engine Modules (`js/engine/`)
- `blackjack.js` - Card, Deck, Hand classes with standard 21-point logic
- `ai.js` - AIEngine with three tendencies: 莽撞 (reckless), 穩健 (steady), 狡詐 (cunning)
- `combat.js` - CombatEngine.calculateDamage() for final damage computation

### Data Management
- `js/data_manager.js` - DataManager singleton, uses `fetch()` to load JSON from `public/data/`
  - `generals.json` - Playable characters with skills
  - `enemies.json` - Battle opponents with AI settings
  - `schemes.json` - One-time use items (錦囊)
  - `relics.json` - Passive items (寶物)

### Game State Flow
The `GameState` class manages:
- Screen transitions: LOADING → START → BATTLE → SETTLEMENT → REWARD → next BATTLE
- Player actions: Hit (要牌), Play Hand (出牌), Discard (棄牌), use Schemes
- Enemy AI turn with async delays for visual pacing
- Victory conditions: reduce enemy morale to zero

### Key Game Mechanics

**General Skills Structure** (in `generals.json`):
```json
{
  "skill_trigger": "結算時",
  "skill_effects": [
    { "type": "加法", "value": 60, "condition": null },
    { "type": "乘法", "value": 1.5, "condition": "玩家點數 ≥ 17 且 ≤ 20" }
  ]
}
```

**Common trigger conditions**: `結算時`, `達成 21 點時`, `爆牌時`
**Common effect conditions**: `玩家未要牌`, `玩家要牌次數 ≥ 2`, `手牌中至少 2 張同花色`, `敵將點數 ≥ 17`

**Faction Bonuses** (3+ generals from same faction):
- 魏 (Wei): +1 discard per battle
- 蜀 (Shu): 20% discount on scheme purchases
- 吳 (Wu): 1.1x multiplier when hand has 3+ cards of same suit
- 群 (Qun): Random ±10 variance on 50 base additive damage

### Asset Naming Conventions
Character avatars: `./assets/avatars/{id}_sexy_pixel.png`
- Special case: `lu_bu` → `lu_bu_boss_sexy_pixel.png`
- `GameState.getCharacterImage(id)` handles path resolution

## Important Implementation Notes

1. **Browser compatibility**: All data loading uses `fetch()` - game must be served (dev server or web host), not opened via `file://`
2. **Global game instance**: `window.game` is exposed for HTML onclick handlers
3. **Responsive scaling**: CSS transform scales 1280x720 game container to fit viewport
4. **Leaderboard persistence**: Uses `localStorage` with key `sanguopai_leaderboard`
5. **Language**: UI is in Traditional Chinese (zh-TW)

## Adding New Content

**New General**: Add to `public/data/generals.json` with:
- `id`, `name`, `faction` (魏/蜀/吳/群), `rarity` (Common/Uncommon/Rare/Legendary)
- `skill_name`, `skill_trigger`, `skill_effects` array, `flavour` text
- Add avatar image to `public/assets/avatars/{id}_sexy_pixel.png`

**New Enemy**: Add to `public/data/enemies.json` with:
- `id`, `name`, `stage_index`, `morale`, `flavour`
- `ai_tendency` (莽撞/穩健/狡詐), `ai_stand_threshold` (usually 17)

**New Scheme/Relic**: Add to respective JSON files with `id`, `name`, `type` (active/passive), `description`
