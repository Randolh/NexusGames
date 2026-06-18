class GameAboutSection extends HTMLElement {
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
        if (!this.game) return;

        const aboutSec = document.createElement('section');
        aboutSec.className = 'about';

        const aboutTitle = document.createElement('h2');
        aboutTitle.className = 'title-secondary about__title';
        aboutTitle.textContent = 'About This Game';

        const aboutContent = document.createElement('div');
        aboutContent.className = 'about__content';
        
        const formattedDesc = this.game.description.split('\r\n\r\n');
        formattedDesc.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            aboutContent.appendChild(p);
        });

        aboutSec.appendChild(aboutTitle);
        aboutSec.appendChild(aboutContent);
        this.appendChild(aboutSec);
    }
}

customElements.define('game-about-section', GameAboutSection);
export { GameAboutSection };
