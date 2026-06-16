const BASE_URL = 'https://www.freetogame.com/api'

export const api = {
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    },

    getGames() {
        return this.request('/games')
    }
}
