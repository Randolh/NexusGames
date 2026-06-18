export const router = {
    routes: {},
    container: null,
    currentView: null,

    init(routes, container) {
        this.routes = routes
        this.container = container

        window.addEventListener('popstate', () => this.navigate(window.location.pathname, false))
        
        document.body.addEventListener('click', e => {
            const target = e.target.closest('[data-link]');
            if (target) {
                e.preventDefault()
                this.navigate(target.getAttribute('href'))
            }
        })
        this.navigate(window.location.pathname, false)
    },

    async navigate(path, pushState = true) {
        if (pushState) {
            window.history.pushState(null, '', path)
        }

        let ViewComponent = this.routes[path];
        let params = {};

        if (!ViewComponent) {
            for (const route in this.routes) {
                if (route.includes('/:')) {
                    const regexPath = route.replace(/:([a-zA-Z0-9_]+)/g, '([^/]+)');
                    const regex = new RegExp('^' + regexPath + '$');
                    const match = path.match(regex);
                    if (match) {
                        ViewComponent = this.routes[route];
                        const paramNames = [...route.matchAll(/:([a-zA-Z0-9_]+)/g)].map(m => m[1]);
                        paramNames.forEach((name, index) => {
                            params[name] = match[index + 1];
                        });
                        break;
                    }
                }
            }
        }

        ViewComponent = ViewComponent || this.routes['/']

        if (this.currentView && typeof this.currentView.unmount === 'function') {
            this.currentView.unmount()
        }

        this.currentView = ViewComponent

        this.container.replaceChildren(ViewComponent.render(params))

        if (typeof ViewComponent.mount === 'function') {
            await ViewComponent.mount(this.container, params)
        }
    }
}
