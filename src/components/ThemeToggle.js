class ThemeToggle extends HTMLElement {
    constructor() {
        super();
        this.currentTheme = localStorage.getItem('nexus_theme') || 'dark';
    }

    connectedCallback() {
        this.render();
    }

    toggleTheme() {
        const isLight = document.documentElement.classList.toggle('light-theme');
        this.currentTheme = isLight ? 'light' : 'dark';
        localStorage.setItem('nexus_theme', this.currentTheme);
        this.updateIcon();
    }

    updateIcon() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    render() {
        this.style.display = 'contents';
        this.innerHTML = '';

        const themeBtn = document.createElement('button');
        themeBtn.className = 'header__action-link';
        themeBtn.style.background = 'none';
        themeBtn.style.border = 'none';
        themeBtn.style.cursor = 'pointer';
        themeBtn.style.fontSize = '1.2rem';
        themeBtn.setAttribute('aria-label', 'Toggle Theme');
        
        const themeIcon = document.createElement('i');
        
        // Ensure initial document class matches
        if (this.currentTheme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }

        themeBtn.appendChild(themeIcon);

        themeBtn.addEventListener('click', () => this.toggleTheme());

        this.appendChild(themeBtn);
        this.updateIcon();
    }
}

customElements.define('theme-toggle', ThemeToggle);
export default ThemeToggle;
