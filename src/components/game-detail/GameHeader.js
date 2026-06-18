import { IMAGE_PROXY_URL } from '../../services/api.js';

class GameHeader extends HTMLElement {
    constructor() {
        super();
        this.game = null;
        this.videoError = false;
        this.videoElement = null;
    }

    setGame(game) {
        this.game = game;
        this.render();
    }

    render() {
        this.cleanupVideo();
        this.videoError = false;
        this.style.display = 'contents';
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        if (!this.game) return;

        const gameHeader = document.createElement('section');
        gameHeader.className = 'game-header';

        // Media
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'game-header__media';
        
        const mainImg = document.createElement('img');
        mainImg.src = `${IMAGE_PROXY_URL}${this.game.thumbnail}`;
        mainImg.alt = this.game.title;
        mainImg.className = 'game-header__image';
        mediaDiv.appendChild(mainImg);
        
        mediaDiv.addEventListener('mouseenter', () => this.handleMouseEnter(mediaDiv));
        mediaDiv.addEventListener('mouseleave', () => this.handleMouseLeave());
        
        gameHeader.appendChild(mediaDiv);

        // Info Aside
        const infoAside = document.createElement('aside');
        infoAside.className = 'game-header__info';

        const descP = document.createElement('p');
        descP.className = 'game-header__desc';
        descP.textContent = this.game.short_description;
        infoAside.appendChild(descP);

        const metaDiv = document.createElement('div');
        metaDiv.className = 'game-header__meta';

        const metaItems = [
            { label: 'Status:', value: this.game.status, highlight: true },
            { label: 'Release Date:', value: this.game.release_date },
            { label: 'Developer:', value: this.game.developer },
            { label: 'Publisher:', value: this.game.publisher },
            { label: 'Platform:', value: this.game.platform }
        ];

        metaItems.forEach(item => {
            const row = document.createElement('div');
            row.className = 'game-header__meta-row';
            
            const label = document.createElement('span');
            label.className = 'game-header__meta-label';
            label.textContent = item.label;
            
            const val = document.createElement('span');
            val.className = 'game-header__meta-value';
            if (item.highlight) val.classList.add('game-header__meta-value--highlight');
            val.textContent = item.value;

            row.appendChild(label);
            row.appendChild(val);
            metaDiv.appendChild(row);
        });

        infoAside.appendChild(metaDiv);

        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'game-header__tags';
        
        [this.game.genre, this.game.platform.split(',')[0].trim()].forEach(tagText => {
            const tag = document.createElement('span');
            tag.className = 'game-header__tag';
            tag.textContent = tagText;
            tagsDiv.appendChild(tag);
        });

        infoAside.appendChild(tagsDiv);
        gameHeader.appendChild(infoAside);
        
        this.appendChild(gameHeader);
    }

    handleMouseEnter(mediaDiv) {
        if (!this.game || this.videoError) return;

        this.videoElement = document.createElement('video');
        this.videoElement.className = 'game-header__video';
        this.videoElement.src = `https://www.freetogame.com/g/${this.game.id}/videoplayback.webm`;
        this.videoElement.muted = true;
        this.videoElement.loop = true;
        this.videoElement.playsInline = true;
        
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.top = '0';
        this.videoElement.style.left = '0';
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
        this.videoElement.style.objectFit = 'cover';
        this.videoElement.style.zIndex = '2';
        this.videoElement.style.opacity = '0';
        this.videoElement.style.transition = 'opacity 0.3s ease';

        this.videoElement.addEventListener('error', () => {
            this.videoError = true;
            this.cleanupVideo();
        });

        mediaDiv.appendChild(this.videoElement);

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
}

customElements.define('game-header-section', GameHeader);
export { GameHeader };
