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

        const carouselDiscover = document.createElement('game-carousel')
        container.appendChild(carouselDiscover)

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

        api.getGames()
            .then(games => {
                carouselDiscover.setCarouselData('Discover more games...', games, true);
            })
            .catch(error => {
                console.error('Error fetching discover games:', error);
            });

        return container
    }
}

export default Home
