import { router } from './router.js'
import Header from './components/Header.js'
import Home from './views/Home.js'

// Define routes
const routes = {
    '/': Home,
}

const appContainer = document.getElementById('app')

const renderLayout = () => {
    appContainer.replaceChildren()
    
    appContainer.appendChild(Header())
    
    const mainContent = document.createElement('main')
    mainContent.id = 'main-content'
}

const initApp = () => {
    renderLayout()
    
    const mainContent = document.getElementById('main-content')
    router.init(routes, mainContent)
}

document.addEventListener('DOMContentLoaded', initApp)
