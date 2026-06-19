import { api } from '../services/api.js';
import '../components/home/GameCarousel.js';

const SearchResults = {
    render(params) {
        const container = document.createElement('div');
        container.className = 'search-results';

        const header = document.createElement('div');
        header.className = 'search-results__header';
        
        const title = document.createElement('h1');
        title.className = 'title-primary';
        header.appendChild(title);
        
        container.appendChild(header);

        // Get query from URL
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const query = urlParams.get('q') || '';
        
        title.textContent = `Search Results for "${query}"`;

        if (!query) {
            const empty = document.createElement('div');
            empty.className = 'library__empty';
            empty.innerHTML = '<i class="fas fa-search library__empty-icon"></i><p>Please enter a search term.</p>';
            container.appendChild(empty);
            return container;
        }

        // Loading state
        const loading = document.createElement('div');
        loading.className = 'loading-spinner';
        loading.textContent = 'Searching...';
        container.appendChild(loading);

        const fetchResults = async () => {
            try {
                const results = await api.searchGames(query);
                if (container.contains(loading)) container.removeChild(loading);

                if (results.length === 0) {
                    const empty = document.createElement('div');
                    empty.className = 'library__empty';
                    empty.innerHTML = '<i class="fas fa-ghost library__empty-icon"></i><p>No games found matching your search.</p>';
                    container.appendChild(empty);
                } else {
                    const carousel = document.createElement('game-carousel');
                    container.appendChild(carousel);
                    carousel.setCarouselData(`${results.length} games found`, results);
                }
            } catch (error) {
                if (container.contains(loading)) container.removeChild(loading);
                const errorMsg = document.createElement('div');
                errorMsg.className = 'library__empty';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-triangle library__empty-icon"></i><p>Error performing search.</p>';
                container.appendChild(errorMsg);
            }
        };

        fetchResults();

        return container;
    }
};

export default SearchResults;
