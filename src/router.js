export const router = {
    routes: {},
    container: null,
    currentView: null,

    init(routes, container) {
        this.routes = routes
        this.container = container

        window.addEventListener('popstate', () => this.navigate(window.location.pathname, false))
        
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault()
                this.navigate(e.target.getAttribute('href'))
            }
        })
        this.navigate(window.location.pathname, false)
    },

    async navigate(path, pushState = true) {
        if (pushState) {
            window.history.pushState(null, '', path)
        }

        const ViewComponent = this.routes[path] || this.routes['/']

        if (this.currentView && typeof this.currentView.unmount === 'function') {
            this.currentView.unmount()
        }

        this.currentView = ViewComponent

        this.container.replaceChildren(ViewComponent.render())

        if (typeof ViewComponent.mount === 'function') {
            await ViewComponent.mount(this.container)
        }
    }
}
