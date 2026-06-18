import { IMAGE_PROXY_URL } from '../../services/api.js';

class GameScreenshots extends HTMLElement {
    constructor() {
        super();
        this.game = null;
    }

    setGame(game) {
        this.game = game;
        this.render();
    }

    render() {
        this.style.display = 'contents';
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        if (!this.game || !this.game.screenshots || this.game.screenshots.length === 0) return;

        const screenSec = document.createElement('section');
        screenSec.className = 'screenshots';

        const screenTitle = document.createElement('h2');
        screenTitle.className = 'title-secondary screenshots__title';
        screenTitle.textContent = 'Screenshots';

        const screenGrid = document.createElement('div');
        screenGrid.className = 'screenshots__grid';

        this.game.screenshots.forEach(screenshot => {
            const img = document.createElement('img');
            img.src = `${IMAGE_PROXY_URL}${screenshot.image}`;
            img.className = 'screenshots__image';
            img.loading = 'lazy';
            screenGrid.appendChild(img);
        });

        screenSec.appendChild(screenTitle);
        screenSec.appendChild(screenGrid);
        
        this.appendChild(screenSec);
    }
}

customElements.define('game-screenshots', GameScreenshots);
export { GameScreenshots };
