import test from 'node:test';
import assert from 'node:assert/strict';

import { createTranslator, detectPreferredLocale, getInitialLocale, loadSavedLocale, saveLocalePreference } from '../js/i18n.js';

test('detectPreferredLocale keeps Traditional Chinese locales', () => {
    assert.equal(detectPreferredLocale(['zh-TW']), 'zh-TW');
    assert.equal(detectPreferredLocale(['zh-HK']), 'zh-TW');
});

test('detectPreferredLocale maps Simplified Chinese locales', () => {
    assert.equal(detectPreferredLocale(['zh-CN']), 'zh-CN');
    assert.equal(detectPreferredLocale(['zh-SG']), 'zh-CN');
});

test('detectPreferredLocale maps English locales and falls back to English', () => {
    assert.equal(detectPreferredLocale(['en-US']), 'en');
    assert.equal(detectPreferredLocale(['fr-FR']), 'en');
});

test('detectPreferredLocale prefers the first supported browser language', () => {
    assert.equal(detectPreferredLocale(['fr-FR', 'zh-CN', 'en-US']), 'zh-CN');
});

test('createTranslator returns localized values and interpolates variables', () => {
    const tw = createTranslator('zh-TW');
    const cn = createTranslator('zh-CN');
    const en = createTranslator('en');

    assert.equal(tw('ui.startGame'), '開始遊戲');
    assert.equal(cn('ui.startGame'), '开始游戏');
    assert.equal(en('ui.startGame'), 'Start Game');
    assert.equal(en('log.moneyAwarded', { amount: 120 }), 'Victory! You gained $120');
});

test('createTranslator falls back to English when locale or key is missing', () => {
    const fallback = createTranslator('fr-FR');

    assert.equal(fallback('ui.startGame'), 'Start Game');
    assert.equal(fallback('missing.key'), 'missing.key');
});

test('saved locale preference is loaded only when supported', () => {
    const storage = new Map([['sanguopai_locale', 'zh-CN']]);
    const fakeStorage = {
        getItem(key) {
            return storage.has(key) ? storage.get(key) : null;
        }
    };

    assert.equal(loadSavedLocale(fakeStorage), 'zh-CN');

    storage.set('sanguopai_locale', 'fr-FR');
    assert.equal(loadSavedLocale(fakeStorage), null);
});

test('saveLocalePreference persists supported locales and ignores unsupported ones', () => {
    const writes = [];
    const fakeStorage = {
        setItem(key, value) {
            writes.push([key, value]);
        }
    };

    saveLocalePreference(fakeStorage, 'zh-TW');
    saveLocalePreference(fakeStorage, 'fr-FR');

    assert.deepEqual(writes, [['sanguopai_locale', 'zh-TW']]);
});

test('getInitialLocale prefers saved locale over browser locale', () => {
    const fakeStorage = {
        getItem() {
            return 'zh-TW';
        }
    };

    assert.equal(getInitialLocale({
        storage: fakeStorage,
        languages: ['en-US', 'zh-CN']
    }), 'zh-TW');
});

test('getInitialLocale falls back to browser locale when no saved locale exists', () => {
    const fakeStorage = {
        getItem() {
            return null;
        }
    };

    assert.equal(getInitialLocale({
        storage: fakeStorage,
        languages: ['zh-CN', 'en-US']
    }), 'zh-CN');
});
