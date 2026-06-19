import './SearchBar.js';

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
        { text: 'Home', href: '#/' },
        { text: 'My Library', href: '#/library' }
    ]

    const updateActiveLink = () => {
        const currentHash = window.location.hash || '#/';
        const links = navList.querySelectorAll('.nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('nav__link--active');
            } else {
                link.classList.remove('nav__link--active');
            }
        });
    };

    navItems.forEach(item => {
        const li = document.createElement('li')
        li.className = 'nav__item'
        
        const a = document.createElement('a')
        a.href = item.href
        a.className = 'nav__link'
        a.setAttribute('data-link', '')
        a.textContent = item.text
        
        li.appendChild(a)
        navList.appendChild(li)
    })
    nav.appendChild(navList)

    // Set initial active state and listen for changes
    updateActiveLink();
    window.addEventListener('hashchange', updateActiveLink);

    // Header Actions
    const actions = document.createElement('div')
    actions.className = 'header__actions'

    // Search Block
    const searchBar = document.createElement('search-bar');
    actions.appendChild(searchBar);

    // Assemble
    container.appendChild(logo)
    container.appendChild(nav)
    container.appendChild(actions)
    
    header.appendChild(container)

    return header
}

export default Header
