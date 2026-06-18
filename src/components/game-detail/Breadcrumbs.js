class GameBreadcrumbs extends HTMLElement {
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

        const breadcrumbs = document.createElement('div');
        breadcrumbs.className = 'game-detail__breadcrumbs';
        
        const bcHome = document.createElement('a');
        bcHome.href = '#/';
        bcHome.className = 'game-detail__breadcrumb-link';
        bcHome.setAttribute('data-link', '');
        bcHome.textContent = 'All Games';

        breadcrumbs.appendChild(bcHome);
        breadcrumbs.appendChild(document.createTextNode(' > '));
        
        const bcGenre = document.createElement('span');
        bcGenre.textContent = this.game.genre;
        breadcrumbs.appendChild(bcGenre);
        
        breadcrumbs.appendChild(document.createTextNode(' > '));
        
        const bcTitle = document.createElement('span');
        bcTitle.textContent = this.game.title;
        breadcrumbs.appendChild(bcTitle);

        this.appendChild(breadcrumbs);
    }
}

customElements.define('game-breadcrumbs', GameBreadcrumbs);
export { GameBreadcrumbs };
