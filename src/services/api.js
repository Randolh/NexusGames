const BASE_URL = 'https://free-to-play-games-database.p.rapidapi.com/api'
export const IMAGE_PROXY_URL = 'https://wsrv.nl/?url='

export const api = {
    async request(endpoint, options = {}) {
        try {
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
                throw new Error(`Error HTTP: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    },

    getGames(params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const endpoint = queryString ? `/games?${queryString}` : '/games'
        return this.request(endpoint)
    },

    getGameDetails(id) {
        if (!id) throw new Error('Se requiere el ID del juego')
        return this.request(`/game?id=${id}`)
    },


    getNewReleases() {
        return this.request('/games?sort-by=release-date')
    },

    getTrendingGames() {
        return this.request('/games?sort-by=popularity')
    },

    getGamesByPlatform(platform) {
        return this.request(`/games?platform=${platform}`)
    },

    getGamesByCategory(category) {
        return this.request(`/games?category=${category}`)
    },

    async getRandomRecommendation() {
        try {
            const games = await this.getTrendingGames()

            if (!games || games.length === 0) {
                throw new Error('No se pudieron cargar los juegos para elegir uno al azar.')
            }

            const randomIndex = Math.floor(Math.random() * games.length)

            return games[randomIndex]
        } catch (error) {
            console.error('Error al obtener el juego aleatorio:', error)
            throw error
        }
    }
}