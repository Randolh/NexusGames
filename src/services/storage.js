const STORAGE_KEY = 'nexus_library';

export const LibraryManager = {
    getLibrary() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    },

    getGameStatus(gameId) {
        const library = this.getLibrary();
        return library[gameId] ? library[gameId].status : null;
    },

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

    removeGame(gameId) {
        const library = this.getLibrary();
        if (library[gameId]) {
            delete library[gameId];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
        }
    },

    getGamesByStatus(status) {
        const library = this.getLibrary();
        return Object.values(library).filter(game => game.status === status);
    }
};
