import '../components/Hero.js'
import '../components/GameCarousel.js'
import { api } from '../services/api.js'

const Home = {
    render() {
        const container = document.createElement('div')
        container.className = 'home'

        const hero = document.createElement('hero-component')
        container.appendChild(hero)

        const carousel = document.createElement('game-carousel')
        container.appendChild(carousel)

        api.getTrendingGames()
            .then(games => {
                carousel.setCarouselData('Trending Now', games);
            })
            .catch(error => {
                console.error('Error fetching trending games:', error);
            });

        return container
    }
}

export default Home
