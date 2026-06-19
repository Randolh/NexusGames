import { api } from '../services/api.js';
import { debounce } from '../utils/debounce.js';

class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.query = '';
        
        // Debounce search input
        this.handleInput = debounce(this.performSearch.bind(this), 500);
    }

    connectedCallback() {
        this.render();
    }

    performSearch(e) {
        this.query = e.target.value.trim();
        
        if (this.query.length > 0) {
            // Navegar directamente a la página de resultados mientras escribe
            window.location.hash = `/search?q=${encodeURIComponent(this.query)}`;
        } else if (window.location.hash.startsWith('#/search')) {
            // Si borra todo y está en la página de búsqueda, mostrar vacío
            window.location.hash = `/search?q=`;
        }
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        const input = this.querySelector('.search__input');
        const query = input.value.trim();
        if (query) {
            window.location.hash = `/search?q=${encodeURIComponent(query)}`;
        }
    }

    render() {
        this.style.display = 'contents';
        this.innerHTML = '';

        const container = document.createElement('form');
        container.className = 'search';
        container.addEventListener('submit', this.handleSearchSubmit.bind(this));
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'search__input';
        input.placeholder = 'Search games...';
        
        // Si ya estamos en una búsqueda, rellenar el input
        if (window.location.hash.startsWith('#/search')) {
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            const q = urlParams.get('q');
            if (q) input.value = q;
        }

        input.addEventListener('input', this.handleInput);
        
        const btn = document.createElement('button');
        btn.className = 'search__button';
        btn.type = 'submit';
        btn.setAttribute('aria-label', 'Search');
        const icon = document.createElement('i');
        icon.className = 'fas fa-search';
        btn.appendChild(icon);
        
        container.appendChild(input);
        container.appendChild(btn);

        this.appendChild(container);
    }
}

customElements.define('search-bar', SearchBar);
export default SearchBar;
