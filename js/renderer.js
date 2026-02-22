import game from './game_ui.js';

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    game.init();
});

// Responsive scaling logic
function rescaleGame() {
    const container = document.getElementById('game-container');
    const wrapper = document.getElementById('game-wrapper');
    if (!container || !wrapper) return;

    const baseWidth = 1280;
    const baseHeight = 720;

    // Determine the scale factor that fits both width and height constraints of the window
    const scaleX = window.innerWidth / baseWidth;
    const scaleY = window.innerHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Cap scale at 1x

    // Apply scale using CSS transform
    container.style.transform = `scale(${scale})`;
    // We let flexbox center it and scale handles the fit.
}

// Attach scaling listeners
window.addEventListener('resize', rescaleGame);
// Initial scale on load
document.addEventListener('DOMContentLoaded', rescaleGame);

console.log('Renderer and Game UI bridged via ESM');
export default game;
