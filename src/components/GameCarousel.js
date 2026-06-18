import './GameCard.js';

class GameCarousel extends HTMLElement {
    constructor() {
        super();
        this.games = [];
        this._carouselTitle = 'Featured Games';
        this.currentPage = 0;
        this.itemsPerPage = 8;
        this.isTransitioning = false;
    }

    setCarouselData(title, games) {
        this._carouselTitle = title;
        this.games = games.slice(0, 32);
        this.currentPage = 0;
        
        this.render();
    }

    get totalPages() {
        return Math.ceil(this.games.length / this.itemsPerPage);
    }

    nextPage() {
        if (this.isTransitioning || this.currentPage >= this.totalPages - 1) return;
        this.currentPage++;
        this.updateGrid();
    }

    prevPage() {
        if (this.isTransitioning || this.currentPage <= 0) return;
        this.currentPage--;
        this.updateGrid();
    }

    updateGrid() {
        this.isTransitioning = true;
        const grid = this.querySelector('.carousel__grid');
        const prevBtn = this.querySelector('.js-prev');
        const nextBtn = this.querySelector('.js-next');
        
        // Update button states
        prevBtn.disabled = this.currentPage === 0;
        nextBtn.disabled = this.currentPage >= this.totalPages - 1;

        // Fade out
        grid.classList.add('carousel__grid--fading');
        
        setTimeout(() => {
            // Clear grid
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }

            // Render new page
            const startIndex = this.currentPage * this.itemsPerPage;
            const pageGames = this.games.slice(startIndex, startIndex + this.itemsPerPage);
            
            pageGames.forEach(game => {
                const card = document.createElement('game-card');
                card.setGame(game);
                grid.appendChild(card);
            });

            grid.classList.remove('carousel__grid--fading');
            this.isTransitioning = false;
        }, 300);
    }

    render() {
        this.style.display = 'contents';
        
        // Clear previous content
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        if (!this.games || this.games.length === 0) return;

        const section = document.createElement('section');
        section.className = 'carousel carousel--enter';

        const header = document.createElement('div');
        header.className = 'carousel__header';
        
        const h2 = document.createElement('h2');
        h2.className = 'title-secondary';
        h2.textContent = this._carouselTitle;
        
        const nav = document.createElement('div');
        nav.className = 'carousel__nav';
        
        const btnPrev = document.createElement('button');
        btnPrev.className = 'carousel__nav-button js-prev';
        const iconPrev = document.createElement('i');
        iconPrev.className = 'fas fa-chevron-left';
        btnPrev.appendChild(iconPrev);
        btnPrev.disabled = true;
        btnPrev.addEventListener('click', this.prevPage.bind(this));
        
        const btnNext = document.createElement('button');
        btnNext.className = 'carousel__nav-button js-next';
        const iconNext = document.createElement('i');
        iconNext.className = 'fas fa-chevron-right';
        btnNext.appendChild(iconNext);
        btnNext.disabled = this.totalPages <= 1;
        btnNext.addEventListener('click', this.nextPage.bind(this));

        nav.appendChild(btnPrev);
        nav.appendChild(btnNext);
        header.appendChild(h2);
        header.appendChild(nav);

        const grid = document.createElement('div');
        grid.className = 'carousel__grid';

        const initialGames = this.games.slice(0, this.itemsPerPage);
        initialGames.forEach(game => {
            const card = document.createElement('game-card');
            card.setGame(game);
            grid.appendChild(card);
        });

        section.appendChild(header);
        section.appendChild(grid);
        this.appendChild(section);

        // Trigger the enter animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                section.classList.add('carousel--enter-active');
            });
        });
    }
}

customElements.define('game-carousel', GameCarousel);
export default GameCarousel;
