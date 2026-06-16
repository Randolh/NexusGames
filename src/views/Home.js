import Hero from '../components/Hero.js'

const Home = {
    render() {
        const container = document.createElement('div')
        container.className = 'home'

        container.appendChild(Hero())

        return container
    }
}

export default Home
