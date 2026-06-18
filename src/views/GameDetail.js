import { api, IMAGE_PROXY_URL } from '../services/api.js'

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
            
            // Breadcrumbs
            const breadcrumbs = document.createElement('div');
            breadcrumbs.className = 'game-detail__breadcrumbs';
            
            const bcHome = document.createElement('a');
            bcHome.href = '/';
            bcHome.className = 'game-detail__breadcrumb-link';
            bcHome.setAttribute('data-link', '');
            bcHome.textContent = 'All Games';

            breadcrumbs.appendChild(bcHome);
            breadcrumbs.appendChild(document.createTextNode(' > '));
            
            const bcGenre = document.createElement('span');
            bcGenre.textContent = game.genre;
            breadcrumbs.appendChild(bcGenre);
            
            breadcrumbs.appendChild(document.createTextNode(' > '));
            
            const bcTitle = document.createElement('span');
            bcTitle.textContent = game.title;
            breadcrumbs.appendChild(bcTitle);

            viewContainer.appendChild(breadcrumbs);

            // Main Title
            const titlePrimary = document.createElement('h1');
            titlePrimary.className = 'title-primary game-detail__title';
            titlePrimary.textContent = game.title;
            viewContainer.appendChild(titlePrimary);

            // Game Header Section
            const gameHeader = document.createElement('section');
            gameHeader.className = 'game-header';

            // Media
            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'game-header__media';
            
            const mainImg = document.createElement('img');
            mainImg.src = `${IMAGE_PROXY_URL}${game.thumbnail}`;
            mainImg.alt = game.title;
            mainImg.className = 'game-header__image';
            mediaDiv.appendChild(mainImg);
            
            gameHeader.appendChild(mediaDiv);

            // Info Aside
            const infoAside = document.createElement('aside');
            infoAside.className = 'game-header__info';

            const descP = document.createElement('p');
            descP.className = 'game-header__desc';
            descP.textContent = game.short_description;
            infoAside.appendChild(descP);

            const metaDiv = document.createElement('div');
            metaDiv.className = 'game-header__meta';

            const metaItems = [
                { label: 'Status:', value: game.status, highlight: true },
                { label: 'Release Date:', value: game.release_date },
                { label: 'Developer:', value: game.developer },
                { label: 'Publisher:', value: game.publisher },
                { label: 'Platform:', value: game.platform }
            ];

            metaItems.forEach(item => {
                const row = document.createElement('div');
                row.className = 'game-header__meta-row';
                
                const label = document.createElement('span');
                label.className = 'game-header__meta-label';
                label.textContent = item.label;
                
                const val = document.createElement('span');
                val.className = 'game-header__meta-value';
                if (item.highlight) val.classList.add('game-header__meta-value--highlight');
                val.textContent = item.value;

                row.appendChild(label);
                row.appendChild(val);
                metaDiv.appendChild(row);
            });

            infoAside.appendChild(metaDiv);

            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'game-header__tags';
            
            [game.genre, game.platform.split(',')[0].trim()].forEach(tagText => {
                const tag = document.createElement('span');
                tag.className = 'game-header__tag';
                tag.textContent = tagText;
                tagsDiv.appendChild(tag);
            });

            infoAside.appendChild(tagsDiv);
            gameHeader.appendChild(infoAside);
            viewContainer.appendChild(gameHeader);

            // Purchase Box
            const purchaseBox = document.createElement('section');
            purchaseBox.className = 'purchase-box';

            const pBoxInfo = document.createElement('div');
            pBoxInfo.className = 'purchase-box__info';

            const pBoxTitle = document.createElement('h2');
            pBoxTitle.className = 'purchase-box__title';
            pBoxTitle.textContent = `Play ${game.title}`;

            const pBoxPlatform = document.createElement('span');
            pBoxPlatform.className = 'purchase-box__platform';
            
            const pBoxIcon = document.createElement('i');
            pBoxIcon.className = game.platform.toLowerCase().includes('windows') ? 'fab fa-windows' : 'fas fa-desktop';
            
            pBoxPlatform.appendChild(pBoxIcon);
            pBoxPlatform.appendChild(document.createTextNode(` ${game.platform.split(',')[0].trim()}`));

            pBoxInfo.appendChild(pBoxTitle);
            pBoxInfo.appendChild(pBoxPlatform);

            const pBoxAction = document.createElement('div');
            pBoxAction.className = 'purchase-box__action';

            const pBoxPrice = document.createElement('span');
            pBoxPrice.className = 'purchase-box__price';
            pBoxPrice.textContent = 'Free';

            const playBtn = document.createElement('a');
            playBtn.href = game.game_url;
            playBtn.className = 'button button--mint';
            playBtn.target = '_blank';
            playBtn.rel = 'noopener noreferrer';
            playBtn.textContent = 'Play Now';

            pBoxAction.appendChild(pBoxPrice);
            pBoxAction.appendChild(playBtn);

            purchaseBox.appendChild(pBoxInfo);
            purchaseBox.appendChild(pBoxAction);
            viewContainer.appendChild(purchaseBox);

            // About Section
            const aboutSec = document.createElement('section');
            aboutSec.className = 'about';

            const aboutTitle = document.createElement('h2');
            aboutTitle.className = 'title-secondary about__title';
            aboutTitle.textContent = 'About This Game';

            const aboutContent = document.createElement('div');
            aboutContent.className = 'about__content';
            
            const formattedDesc = game.description.split('\r\n\r\n');
            formattedDesc.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                aboutContent.appendChild(p);
            });

            aboutSec.appendChild(aboutTitle);
            aboutSec.appendChild(aboutContent);
            viewContainer.appendChild(aboutSec);

            // System Requirements
            if (game.minimum_system_requirements) {
                const sysSec = document.createElement('section');
                sysSec.className = 'sys-req';

                const sysTitle = document.createElement('h2');
                sysTitle.className = 'title-secondary sys-req__title';
                sysTitle.textContent = 'System Requirements';

                const sysGrid = document.createElement('div');
                sysGrid.className = 'sys-req__grid';

                const sysBox = document.createElement('div');
                sysBox.className = 'sys-req__box';

                const sysBoxTitle = document.createElement('h3');
                sysBoxTitle.className = 'sys-req__box-title';
                sysBoxTitle.textContent = 'Minimum';

                const sysList = document.createElement('ul');
                sysList.className = 'sys-req__list';

                const reqMapping = [
                    { key: 'os', label: 'OS:' },
                    { key: 'processor', label: 'Processor:' },
                    { key: 'memory', label: 'Memory:' },
                    { key: 'graphics', label: 'Graphics:' },
                    { key: 'storage', label: 'Storage:' }
                ];

                reqMapping.forEach(req => {
                    if (game.minimum_system_requirements[req.key]) {
                        const li = document.createElement('li');
                        li.className = 'sys-req__item';

                        const spanLabel = document.createElement('span');
                        spanLabel.className = 'sys-req__label';
                        spanLabel.textContent = req.label;

                        const spanValue = document.createElement('span');
                        spanValue.className = 'sys-req__value';
                        spanValue.textContent = game.minimum_system_requirements[req.key];

                        li.appendChild(spanLabel);
                        li.appendChild(spanValue);
                        sysList.appendChild(li);
                    }
                });

                sysBox.appendChild(sysBoxTitle);
                sysBox.appendChild(sysList);
                sysGrid.appendChild(sysBox);
                sysSec.appendChild(sysTitle);
                sysSec.appendChild(sysGrid);
                viewContainer.appendChild(sysSec);
            }

            // Screenshots
            if (game.screenshots && game.screenshots.length > 0) {
                const screenSec = document.createElement('section');
                screenSec.className = 'screenshots';

                const screenTitle = document.createElement('h2');
                screenTitle.className = 'title-secondary screenshots__title';
                screenTitle.textContent = 'Screenshots';

                const screenGrid = document.createElement('div');
                screenGrid.className = 'screenshots__grid';

                game.screenshots.forEach(screenshot => {
                    const img = document.createElement('img');
                    img.src = `${IMAGE_PROXY_URL}${screenshot.image}`;
                    img.className = 'screenshots__image';
                    img.loading = 'lazy';
                    screenGrid.appendChild(img);
                });

                screenSec.appendChild(screenTitle);
                screenSec.appendChild(screenGrid);
                viewContainer.appendChild(screenSec);
            }

        } catch (error) {
            console.error('Error loading game details:', error);
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Error loading game details.';
            viewContainer.appendChild(errorMsg);
        }
    }
}

export default GameDetail;
