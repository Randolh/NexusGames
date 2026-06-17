import '../components/Hero.js'

const Home = {
    render() {
        const container = document.createElement('div')
        container.className = 'home'

        const hero = document.createElement('hero-component')
        container.appendChild(hero)

        return container
    }
}

export default Home
