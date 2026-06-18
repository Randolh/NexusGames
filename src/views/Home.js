import '../components/Hero.js'
import '../components/GameCarousel.js'
import { api } from '../services/api.js'

const Home = {
    render() {
        const container = document.createElement('div')
        container.className = 'home'

        const hero = document.createElement('hero-component')
        container.appendChild(hero)

        const carouselNewReleases = document.createElement('game-carousel')
        container.appendChild(carouselNewReleases)


        const carouselTrending = document.createElement('game-carousel')
        container.appendChild(carouselTrending)

        api.getNewReleases()
            .then(games => {
                carouselNewReleases.setCarouselData('New Releases', games);
            })
            .catch(error => {
                console.error('Error fetching new releases:', error);
            });

        api.getTrendingGames()
            .then(games => {
                carouselTrending.setCarouselData('Trending Now', games);
            })
            .catch(error => {
                console.error('Error fetching trending games:', error);
            });

        return container
    }
}

export default Home
