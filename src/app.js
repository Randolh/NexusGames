import { router } from './router.js'
import Header from './components/Header.js'
import Home from './views/Home.js'
import GameDetail from './views/GameDetail.js'
import Library from './views/Library.js'

import SearchResults from './views/SearchResults.js'

// Define routes
const routes = {
    '/': Home,
    '/game/:id': GameDetail,
    '/library': Library,
    '/search': SearchResults
}

const appContainer = document.getElementById('app')

const renderLayout = () => {
    appContainer.replaceChildren()
    
    appContainer.appendChild(Header())
    
    const mainContent = document.createElement('main')
    mainContent.id = 'main-content'
    appContainer.appendChild(mainContent)
}

const initApp = () => {
    renderLayout()
    
    const mainContent = document.getElementById('main-content')
    router.init(routes, mainContent)
}

document.addEventListener('DOMContentLoaded', initApp)
