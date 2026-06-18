class GamePurchaseBox extends HTMLElement {
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

        const purchaseBox = document.createElement('section');
        purchaseBox.className = 'purchase-box';

        const pBoxInfo = document.createElement('div');
        pBoxInfo.className = 'purchase-box__info';

        const pBoxTitle = document.createElement('h2');
        pBoxTitle.className = 'purchase-box__title';
        pBoxTitle.textContent = `Play ${this.game.title}`;

        const pBoxPlatform = document.createElement('span');
        pBoxPlatform.className = 'purchase-box__platform';
        
        const pBoxIcon = document.createElement('i');
        pBoxIcon.className = this.game.platform.toLowerCase().includes('windows') ? 'fab fa-windows' : 'fas fa-desktop';
        
        pBoxPlatform.appendChild(pBoxIcon);
        pBoxPlatform.appendChild(document.createTextNode(` ${this.game.platform.split(',')[0].trim()}`));

        pBoxInfo.appendChild(pBoxTitle);
        pBoxInfo.appendChild(pBoxPlatform);

        const pBoxAction = document.createElement('div');
        pBoxAction.className = 'purchase-box__action';

        const pBoxPrice = document.createElement('span');
        pBoxPrice.className = 'purchase-box__price';
        pBoxPrice.textContent = 'Free';

        const playBtn = document.createElement('a');
        playBtn.href = this.game.game_url;
        playBtn.className = 'button button--mint';
        playBtn.target = '_blank';
        playBtn.rel = 'noopener noreferrer';
        playBtn.textContent = 'Play Now';

        pBoxAction.appendChild(pBoxPrice);
        pBoxAction.appendChild(playBtn);

        purchaseBox.appendChild(pBoxInfo);
        purchaseBox.appendChild(pBoxAction);

        this.appendChild(purchaseBox);
    }
}

customElements.define('game-purchase-box', GamePurchaseBox);
export { GamePurchaseBox };
