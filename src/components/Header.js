const Header = () => {
    const header = document.createElement('header')
    header.className = 'header'

    const container = document.createElement('div')
    container.className = 'header__container'

    // Logo Element
    const logo = document.createElement('a')
    logo.href = '#/'
    logo.className = 'header__logo'
    logo.setAttribute('data-link', '')
    
    const logoIcon = document.createElement('i')
    logoIcon.className = 'fas fa-gamepad header__logo-icon'
    
    logo.appendChild(logoIcon)
    logo.appendChild(document.createTextNode(' Nexus'))

    // Navigation Block
    const nav = document.createElement('nav')
    nav.className = 'nav'
    const navList = document.createElement('ul')
    navList.className = 'nav__list'

    const navItems = [
        { text: 'Home', href: '#/', active: true },
        { text: 'My Library', href: '#/library', active: false }
    ]

    navItems.forEach(item => {
        const li = document.createElement('li')
        li.className = 'nav__item'
        
        const a = document.createElement('a')
        a.href = item.href
        a.className = `nav__link${item.active ? ' nav__link--active' : ''}`
        a.setAttribute('data-link', '')
        a.textContent = item.text
        
        li.appendChild(a)
        navList.appendChild(li)
    })
    nav.appendChild(navList)

    // Header Actions
    const actions = document.createElement('div')
    actions.className = 'header__actions'

    // Search Block
    const search = document.createElement('div')
    search.className = 'search'
    
    const searchInput = document.createElement('input')
    searchInput.type = 'text'
    searchInput.className = 'search__input'
    searchInput.placeholder = 'Search games...'
    
    const searchBtn = document.createElement('button')
    searchBtn.className = 'search__button'
    searchBtn.setAttribute('aria-label', 'Search')
    const searchIcon = document.createElement('i')
    searchIcon.className = 'fas fa-search'
    searchBtn.appendChild(searchIcon)
    
    search.appendChild(searchInput)
    search.appendChild(searchBtn)

    actions.appendChild(search)

    // Assemble
    container.appendChild(logo)
    container.appendChild(nav)
    container.appendChild(actions)
    
    header.appendChild(container)

    return header
}

export default Header
