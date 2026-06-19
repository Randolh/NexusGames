import { LibraryManager } from '../services/storage.js';

class StatusButtons extends HTMLElement {
    constructor() {
        super();
        this.game = null;
    }

    setGame(game) {
        this.game = game;
        this.render();
    }

    connectedCallback() {
        if (this.game) {
            this.render();
        }
    }

    render() {
        this.style.display = 'contents';
        
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        if (!this.game) return;

        const currentStatus = LibraryManager.getGameStatus(this.game.id);

        const statusOptions = [
            { id: 'playing', label: 'Playing', icon: 'fas fa-gamepad' },
            { id: 'pending', label: 'Pending', icon: 'fas fa-bookmark' },
            { id: 'finished', label: 'Finished', icon: 'fas fa-check' }
        ];
        
        statusOptions.forEach(status => {
            const btn = document.createElement('button');
            btn.className = 'card__overlay-btn';
            btn.title = status.label;
            
            const icon = document.createElement('i');
            icon.className = status.icon;
            btn.appendChild(icon);

            if (currentStatus === status.id) {
                btn.style.backgroundColor = 'var(--color-mint)';
                btn.style.color = '#000';
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isCurrentlyActive = LibraryManager.getGameStatus(this.game.id) === status.id;
                
                if (isCurrentlyActive) {
                    LibraryManager.removeGame(this.game.id);
                } else {
                    LibraryManager.saveGame(this.game, status.id);
                }
                icon.className = 'fas fa-check-circle';
                btn.style.backgroundColor = 'var(--color-mint)';
                btn.style.color = '#000';
                
                setTimeout(() => {
                    this.render();
                }, 800);
            });
            this.appendChild(btn);
        });
    }
}

customElements.define('status-buttons', StatusButtons);
export default StatusButtons;
