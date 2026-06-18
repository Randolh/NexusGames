import { api } from '../services/api.js';
import '../components/game-detail/Breadcrumbs.js';
import '../components/game-detail/GameHeader.js';
import '../components/game-detail/PurchaseBox.js';
import '../components/game-detail/AboutSection.js';
import '../components/game-detail/SystemReqs.js';
import '../components/game-detail/Screenshots.js';

const GameDetail = {
    render(params) {
        const container = document.createElement('div');
        container.className = 'game-detail';
        container.id = 'game-detail-container';
        return container;
    },

    async mount(container, params) {
        const viewContainer = container.querySelector('#game-detail-container');
        if (!viewContainer) return;

        try {
            const game = await api.getGameDetails(params.id);
            
            // Clear any previous loading/skeleton states
            viewContainer.replaceChildren();

            // Append custom web components
            const breadcrumbs = document.createElement('game-breadcrumbs');
            breadcrumbs.setGame(game);
            viewContainer.appendChild(breadcrumbs);

            const titlePrimary = document.createElement('h1');
            titlePrimary.className = 'title-primary game-detail__title';
            titlePrimary.textContent = game.title;
            viewContainer.appendChild(titlePrimary);

            const gameHeader = document.createElement('game-header-section');
            gameHeader.setGame(game);
            viewContainer.appendChild(gameHeader);

            const purchaseBox = document.createElement('game-purchase-box');
            purchaseBox.setGame(game);
            viewContainer.appendChild(purchaseBox);

            const aboutSec = document.createElement('game-about-section');
            aboutSec.setGame(game);
            viewContainer.appendChild(aboutSec);

            const sysReqs = document.createElement('game-system-reqs');
            sysReqs.setGame(game);
            viewContainer.appendChild(sysReqs);

            const screenshots = document.createElement('game-screenshots');
            screenshots.setGame(game);
            viewContainer.appendChild(screenshots);

        } catch (error) {
            console.error('Error loading game details:', error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Error loading game details.';
            viewContainer.appendChild(errorMsg);
        }
    }
}

export default GameDetail;
