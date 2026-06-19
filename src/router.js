export const router = {
    routes: {},
    container: null,
    currentView: null,

    init(routes, container) {
        this.routes = routes;
        this.container = container;

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.navigate(this.getPath(), false));
        
        document.body.addEventListener('click', e => {
            const target = e.target.closest('[data-link]');
            if (target) {
                e.preventDefault();
                this.navigate(target.getAttribute('href'));
            }
        });
        
        // Initial load
        this.navigate(this.getPath(), false);
    },

    getPath() {
        return window.location.hash.slice(1) || '/';
    },

    async navigate(path, pushState = true) {
        // Normalize path to remove leading '#' if present
        if (path.startsWith('#')) {
            path = path.slice(1);
        }

        if (pushState) {
            window.location.hash = path;
            // The hashchange event will trigger and handle the actual rendering
            return;
        }

        const [basePath] = path.split('?');
        let ViewComponent = this.routes[basePath];
        let params = {};

        if (!ViewComponent) {
            for (const route in this.routes) {
                if (route.includes('/:')) {
                    const regexPath = route.replace(/:([a-zA-Z0-9_]+)/g, '([^/]+)');
                    const regex = new RegExp('^' + regexPath + '$');
                    const match = basePath.match(regex);
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

        ViewComponent = ViewComponent || this.routes['/'];

        if (this.currentView && typeof this.currentView.unmount === 'function') {
            this.currentView.unmount();
        }

        this.currentView = ViewComponent;

        this.container.replaceChildren(ViewComponent.render(params));

        if (typeof ViewComponent.mount === 'function') {
            await ViewComponent.mount(this.container, params);
        }
    }
}
