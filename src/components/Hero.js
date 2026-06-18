import { api, IMAGE_PROXY_URL } from "../services/api.js"

class HeroComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.style.display = 'contents';

        try {
            const game = await api.getRandomRecommendation();
            
            const section = document.createElement('section');
            section.className = 'hero hero--enter';
            this.appendChild(section);
            
            this.render(game, section);
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    section.classList.add('hero--enter-active');
                });
            });
            
        } catch (error) {
            console.error('Error fetching game for hero:', error);
        }
    }

    render(game, section) {
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }
        
        const container = document.createElement('div')
        container.className = 'hero__container'

        const imageWrapper = document.createElement('div')
        imageWrapper.className = 'hero__image-wrapper'
        
        const img = document.createElement('img')
        img.src = IMAGE_PROXY_URL + game.thumbnail
        img.alt = game.title
        img.className = 'hero__image'

        const video = document.createElement('video')
        video.src = `https://www.freetogame.com/g/${game.id}/videoplayback.webm`
        video.className = 'hero__image'
        video.style.opacity = '0'
        video.style.zIndex = '2'
        video.style.pointerEvents = 'none'
        video.muted = true
        video.loop = true
        video.playsInline = true
        
        let videoError = false;
        video.addEventListener('error', () => {
            videoError = true;
        });
        
        imageWrapper.appendChild(img)
        imageWrapper.appendChild(video)

        container.addEventListener('mouseenter', () => {
            if (videoError) return;
            video.style.opacity = '1'
            video.play().catch(e => {
                videoError = true;
                video.style.opacity = '0';
            })
        })

        container.addEventListener('mouseleave', () => {
            if (videoError) return;
            video.style.opacity = '0'
            video.pause()
            video.currentTime = 0
        })

        // Content
        const content = document.createElement('div')
        content.className = 'hero__content'

        const tag = document.createElement('span')
        tag.className = 'hero__tag'
        tag.textContent = 'Free to Play'

        const title = document.createElement('h1')
        title.className = 'title-primary hero__title'
        title.textContent = game.title

        const desc = document.createElement('p')
        desc.className = 'hero__desc'
        desc.textContent = game.short_description

        const priceBox = document.createElement('div')
        priceBox.className = 'hero__price-box'

        const price = document.createElement('span')
        price.className = 'hero__price'
        price.textContent = 'Free'

        const playBtn = document.createElement('a')
        playBtn.href = `/game/${game.id}`
        playBtn.className = 'button button--mint'
        playBtn.setAttribute('data-link', '')
        playBtn.textContent = 'Play Now'

        priceBox.appendChild(price)
        priceBox.appendChild(playBtn)

        content.appendChild(tag)
        content.appendChild(title)
        content.appendChild(desc)
        content.appendChild(priceBox)

        container.appendChild(imageWrapper)
        container.appendChild(content)

        section.appendChild(container)
    }
}

customElements.define('hero-component', HeroComponent);

export default HeroComponent;
