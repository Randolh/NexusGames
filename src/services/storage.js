const STORAGE_KEY = 'nexus_library';

export const LibraryManager = {
    // Retrieve library from local storage
    getLibrary() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },

    // Check the current status of a specific game
    getGameStatus(gameId) {
        const library = this.getLibrary();
        return library[gameId] ? library[gameId].status : null;
    },

    // Save or update a game with a specific status
    saveGame(game, status) {
        const library = this.getLibrary();
        library[game.id] = {
            id: game.id,
            title: game.title,
            thumbnail: game.thumbnail,
            genre: game.genre,
            platform: game.platform,
            status: status,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
    },

    // Remove a game entirely from the library
    removeGame(gameId) {
        const library = this.getLibrary();
        if (library[gameId]) {
            delete library[gameId];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
        }
    },

    // Get all games matching a specific status
    getGamesByStatus(status) {
        const library = this.getLibrary();
        return Object.values(library).filter(game => game.status === status);
    }
};
