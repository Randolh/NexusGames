import { IMAGE_PROXY_URL } from '../services/api.js';
import './StatusButtons.js';

class GameCard extends HTMLElement {
    constructor() {
        super();
        this.game = null;
        this.videoError = false;
        this.videoElement = null;
    }

    setGame(gameData) {
        this.game = gameData;
        this.render();
    }

    connectedCallback() {
        this.style.display = 'contents';
        this.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('mouseenter', this.handleMouseEnter);
        this.removeEventListener('mouseleave', this.handleMouseLeave);
        this.cleanupVideo();
    }

    handleMouseEnter() {
        if (!this.game || this.videoError) return;

        const wrapper = this.querySelector('.card__image-wrapper');
        if (!wrapper) return;

        // Lazy load video
        this.videoElement = document.createElement('video');
        this.videoElement.className = 'card__video';
        this.videoElement.src = `https://www.freetogame.com/g/${this.game.id}/videoplayback.webm`;
        this.videoElement.muted = true;
        this.videoElement.loop = true;
        this.videoElement.playsInline = true;

        this.videoElement.addEventListener('error', () => {
            this.videoError = true;
            this.cleanupVideo();
        });

        wrapper.appendChild(this.videoElement);

        this.videoElement.play()
            .then(() => {
                if (this.videoElement) {
                    this.videoElement.style.opacity = '1';
                }
            })
            .catch(() => {
                this.videoError = true;
                this.cleanupVideo();
            });
    }

    handleMouseLeave() {
        this.cleanupVideo();
    }

    cleanupVideo() {
        if (this.videoElement) {
            this.videoElement.pause();
            this.videoElement.removeAttribute('src');
            this.videoElement.load();
            this.videoElement.remove();
            this.videoElement = null;
        }
    }

    render() {
        if (!this.game) return;

        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        const article = document.createElement('article');
        article.className = 'card';

        // Image wrapper
        const imageWrapper = document.createElement('a');
        imageWrapper.href = `#/game/${this.game.id}`;
        imageWrapper.className = 'card__image-wrapper';
        imageWrapper.setAttribute('data-link', '');

        const img = document.createElement('img');
        img.src = `${IMAGE_PROXY_URL}${this.game.thumbnail}`;
        img.alt = this.game.title;
        img.className = 'card__image';
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'card__overlay';

        const statusBtnsComponent = document.createElement('status-buttons');
        statusBtnsComponent.setGame(this.game);
        overlay.appendChild(statusBtnsComponent);

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(overlay);

        // Content
        const content = document.createElement('div');
        content.className = 'card__content';

        const titleLink = document.createElement('a');
        titleLink.href = `#/game/${this.game.id}`;
        titleLink.className = 'card__title-link';
        titleLink.setAttribute('data-link', '');

        const title = document.createElement('h3');
        title.className = 'card__title';
        title.textContent = this.game.title;
        titleLink.appendChild(title);

        const tags = document.createElement('div');
        tags.className = 'card__tags';

        const genreTag = document.createElement('span');
        genreTag.className = 'card__tag';
        genreTag.textContent = this.game.genre || 'N/A';

        const platformTag = document.createElement('span');
        platformTag.className = 'card__tag';
        platformTag.textContent = this.game.platform ? this.game.platform.split(',')[0].trim() : 'PC';

        tags.appendChild(genreTag);
        tags.appendChild(platformTag);

        const footer = document.createElement('div');
        footer.className = 'card__footer';

        const price = document.createElement('span');
        price.className = 'card__price';
        price.textContent = 'Free';

        const actionBtn = document.createElement('a');
        actionBtn.href = `#/game/${this.game.id}`;
        actionBtn.className = 'card__action';
        actionBtn.setAttribute('aria-label', 'Play Game');
        actionBtn.setAttribute('data-link', '');

        const playIcon = document.createElement('i');
        playIcon.className = 'fas fa-play';
        actionBtn.appendChild(playIcon);

        footer.appendChild(price);
        footer.appendChild(actionBtn);

        content.appendChild(titleLink);
        content.appendChild(tags);
        content.appendChild(footer);

        article.appendChild(imageWrapper);
        article.appendChild(content);

        this.appendChild(article);
    }
}

customElements.define('game-card', GameCard);
export default GameCard;
