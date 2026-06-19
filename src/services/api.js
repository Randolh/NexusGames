const BASE_URL = 'https://free-to-play-games-database.p.rapidapi.com/api'
export const IMAGE_PROXY_URL = 'https://wsrv.nl/?url='

const categories = [
    'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'
]

export const api = {
    // Generic method to handle API requests and caching
    async request(endpoint, options = {}) {
        try {
            const isGetRequest = !options.method || options.method.toUpperCase() === 'GET';
            const cacheKey = `nexus_api_${endpoint}`;

            if (isGetRequest) {
                const cachedData = sessionStorage.getItem(cacheKey);
                if (cachedData) {
                    return JSON.parse(cachedData);
                }
            }

            const url = `${BASE_URL}${endpoint}`;
            const response = await fetch(url, {
                ...options,
                headers: {
                    'x-rapidapi-key': '93735f4200msh8c7508e07aec214p1d5ecajsn090365aa4de6',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (isGetRequest) {
                try {
                    sessionStorage.setItem(cacheKey, JSON.stringify(data));
                } catch (e) {
                    console.warn('SessionStorage quota exceeded or unavailable', e);
                }
            }

            return data;
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    },

    // Get a list of games, optionally filtered by params
    getGames(params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const endpoint = queryString ? `/games?${queryString}` : '/games'
        return this.request(endpoint)
    },

    // Search games by title locally
    async searchGames(query) {
        if (!query) return [];
        const games = await this.getGames();
        const lowerQuery = query.toLowerCase();
        return games.filter(game => game.title.toLowerCase().includes(lowerQuery));
    },

    getGameDetails(id) {
        // Fetch detailed info for a specific game
        if (!id) throw new Error('Game ID is required');
        return this.request(`/game?id=${id}`);
    },


    // Fetch latest released games
    getNewReleases() {
        return this.request('/games?sort-by=release-date')
    },

    // Fetch currently trending games
    getTrendingGames() {
        return this.request('/games?sort-by=popularity')
    },

    // Filter games by platform
    getGamesByPlatform(platform) {
        return this.request(`/games?platform=${platform}`)
    },

    // Filter games by category
    getGamesByCategory(category) {
        return this.request(`/games?category=${category}`)
    },

    async getRandomRecommendation() {
        try {
            // Fetch trending games to pick a random one
            const games = await this.getTrendingGames();

            if (!games || games.length === 0) {
                throw new Error('Could not load games to pick a random recommendation.');
            }

            const randomIndex = Math.floor(Math.random() * games.length);

            return games[randomIndex];
        } catch (error) {
            console.error('Error fetching random game:', error);
            throw error;
        }
    }
}