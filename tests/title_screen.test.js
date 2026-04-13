import test from 'node:test';
import assert from 'node:assert/strict';

const storage = new Map();
globalThis.localStorage = {
    getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
        storage.set(key, value);
    }
};
Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { languages: ['zh-TW', 'en-US'] }
});

const { GameState } = await import('../js/game_ui.js');

test('renderTitleHTML uses hero art layout, centered masthead, and floating locale switcher', () => {
    const game = new GameState();

    const html = game.renderTitleHTML();

    assert.match(html, /title-hero-art/);
    assert.match(html, /title-language-panel/);
    assert.match(html, /title-copy/);
    assert.match(html, /title-actions/);
    assert.match(html, /title-actions[\s\S]*開始遊戲/);
    assert.match(html, /diao_chan_sexy_pixel_3\.png/);
    assert.match(html, /<div class="title-copy">[\s\S]*<div class="title-language-panel">[\s\S]*<select[\s\S]*title-language-select[\s\S]*<\/div>[\s\S]*<div class="title-hint">[\s\S]*<\/div>\s*<\/div>/);
    assert.doesNotMatch(html, /If you do not choose one manually, the UI follows your browser language\./);
    assert.doesNotMatch(html, /若未手動選擇，將自動依瀏覽器語言顯示。/);
});
