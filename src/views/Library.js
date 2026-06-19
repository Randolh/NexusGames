import { LibraryManager } from '../services/storage.js';
import '../components/GameCard.js';

const Library = {
    render() {
        const container = document.createElement('div');
        container.className = 'library';

        const header = document.createElement('div');
        header.className = 'library__header';
        
        const title = document.createElement('h1');
        title.className = 'title-primary library__title';
        title.textContent = 'Mi Biblioteca';
        header.appendChild(title);

        const filterNav = document.createElement('nav');
        filterNav.className = 'library__filters';

        const filters = [
            { id: 'all', label: 'Todos' },
            { id: 'playing', label: 'Jugando' },
            { id: 'pending', label: 'Pendiente' },
            { id: 'finished', label: 'Finalizado' }
        ];

        let currentFilter = 'all';
        const grid = document.createElement('div');
        grid.className = 'library__grid';

        const renderGrid = () => {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }

            const libraryData = LibraryManager.getLibrary();
            const games = Object.values(libraryData);
            
            const filteredGames = currentFilter === 'all' 
                ? games 
                : games.filter(game => game.status === currentFilter);

            if (filteredGames.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'library__empty';
                
                const icon = document.createElement('i');
                icon.className = 'fas fa-ghost library__empty-icon';
                
                const text = document.createElement('p');
                text.textContent = 'No hay juegos en esta categoría.';
                
                emptyState.appendChild(icon);
                emptyState.appendChild(text);
                
                grid.appendChild(emptyState);
                return;
            }

            filteredGames.forEach(game => {
                const card = document.createElement('game-card');
                card.setGame(game);
                grid.appendChild(card);
            });
        };

        filters.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = `library__filter-btn ${filter.id === currentFilter ? 'library__filter-btn--active' : ''}`;
            btn.textContent = filter.label;
            
            btn.addEventListener('click', () => {
                currentFilter = filter.id;
                
                // Update active class
                filterNav.querySelectorAll('.library__filter-btn').forEach(b => {
                    b.classList.remove('library__filter-btn--active');
                });
                btn.classList.add('library__filter-btn--active');
                
                renderGrid();
            });
            
            filterNav.appendChild(btn);
        });

        container.appendChild(header);
        container.appendChild(filterNav);
        container.appendChild(grid);

        // Initial render
        renderGrid();

        return container;
    }
};

export default Library;
