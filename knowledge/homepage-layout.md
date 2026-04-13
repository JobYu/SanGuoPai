# homepage-layout

---

### [2026-03-14] Homepage hero layout moved locale switcher and added female character backdrop

- **情境／問題**：The SanGuoPai home screen placed the language selector at the top, which pulled attention away from the start flow. The title and start button also needed a cleaner centered hero composition, and the homepage lacked a strong visual background.
- **做法**：Refactored GameState.renderTitleHTML() to render a centered title-copy stack, moved the locale picker into a floating bottom-right panel, and added a dedicated title hero art layer using the existing diao_chan_sexy_pixel_3.png asset. Expanded style.css with home-screen-specific layout classes, responsive rules, and supporting backdrop/glow treatment. Added a Node regression test for renderTitleHTML() and exported GameState behind a browser guard so the UI module can be imported in tests.
- **結果**：Verified with node --test tests/*.test.js, npm run build, and a live browser preview at http://127.0.0.1:4173 with screenshots captured to /tmp/sanguopai-home.png and /tmp/sanguopai-home-clean.png showing the centered masthead, right-side female art, and bottom-right locale control.
- **注意事項**：game_ui.js now guards window-only bootstrap code with typeof window !== undefined and exports GameState for UI regression tests. For this homepage composition, the hero art itself is applied from CSS, while the HTML exposes a data-hero marker so tests can assert which asset is being used.

---

### [2026-03-14] Homepage regression rules now lock centered locale control and non-overlapping hint

- **情境／問題**：After the first homepage pass, two obvious regressions were caught in real-browser review: the tip text overlapped the Start Game button, and the language selector still sat off to the side with an explanatory hint that distracted from the hero layout.
- **做法**：Moved the title hint fully back into the centered content flow so it cannot float over the CTA, relocated the language selector into the title-copy stack beneath the main button, and removed the browser-language helper sentence entirely. Strengthened tests/title_screen.test.js so homepage regressions now assert the hero asset marker, title-copy structure, centered language panel placement within title-copy, and absence of the old helper copy in Traditional Chinese and English.
- **結果**：Verified with node --test tests/*.test.js, npm run build, and a fresh Chrome preview screenshot at /tmp/sanguopai-home-centered-language.png showing the CTA unobstructed and the locale selector centered under the button.
- **注意事項**：For SanGuoPai homepage changes, visual QA must explicitly check four points: title and button remain centered, locale selector stays centered in the hero stack, no browser-language helper copy is rendered, and tip text must not overlap the CTA. These constraints are now part of the project knowledge and backed by tests.
