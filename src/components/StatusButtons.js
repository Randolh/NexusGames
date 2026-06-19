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

        const statusOptions = [
            { id: 'playing', label: 'Jugando', icon: 'fas fa-gamepad' },
            { id: 'pending', label: 'Pendiente', icon: 'fas fa-bookmark' },
            { id: 'finished', label: 'Finalizado', icon: 'fas fa-check' }
        ];
        
        statusOptions.forEach(status => {
            const btn = document.createElement('button');
            btn.className = 'card__overlay-btn';
            btn.title = status.label;
            
            const icon = document.createElement('i');
            icon.className = status.icon;
            btn.appendChild(icon);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const originalIcon = icon.className;
                icon.className = 'fas fa-check-circle';
                btn.style.backgroundColor = 'var(--color-mint)';
                btn.style.color = '#000';
                
                // TODO: Save status to local storage or API using this.game.id
                
                setTimeout(() => {
                    icon.className = originalIcon;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 1000);
            });
            this.appendChild(btn);
        });
    }
}

customElements.define('status-buttons', StatusButtons);
export default StatusButtons;
