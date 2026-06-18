class GameSystemReqs extends HTMLElement {
    constructor() {
        super();
        this.game = null;
    }

    setGame(game) {
        this.game = game;
        this.render();
    }

    render() {
        this.style.display = 'contents';
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        if (!this.game || !this.game.minimum_system_requirements) return;

        const sysSec = document.createElement('section');
        sysSec.className = 'sys-req';

        const sysTitle = document.createElement('h2');
        sysTitle.className = 'title-secondary sys-req__title';
        sysTitle.textContent = 'System Requirements';

        const sysGrid = document.createElement('div');
        sysGrid.className = 'sys-req__grid';

        const sysBox = document.createElement('div');
        sysBox.className = 'sys-req__box';

        const sysBoxTitle = document.createElement('h3');
        sysBoxTitle.className = 'sys-req__box-title';
        sysBoxTitle.textContent = 'Minimum';

        const sysList = document.createElement('ul');
        sysList.className = 'sys-req__list';

        const reqMapping = [
            { key: 'os', label: 'OS:' },
            { key: 'processor', label: 'Processor:' },
            { key: 'memory', label: 'Memory:' },
            { key: 'graphics', label: 'Graphics:' },
            { key: 'storage', label: 'Storage:' }
        ];

        reqMapping.forEach(req => {
            if (this.game.minimum_system_requirements[req.key]) {
                const li = document.createElement('li');
                li.className = 'sys-req__item';

                const spanLabel = document.createElement('span');
                spanLabel.className = 'sys-req__label';
                spanLabel.textContent = req.label;

                const spanValue = document.createElement('span');
                spanValue.className = 'sys-req__value';
                spanValue.textContent = this.game.minimum_system_requirements[req.key];

                li.appendChild(spanLabel);
                li.appendChild(spanValue);
                sysList.appendChild(li);
            }
        });

        sysBox.appendChild(sysBoxTitle);
        sysBox.appendChild(sysList);
        sysGrid.appendChild(sysBox);
        sysSec.appendChild(sysTitle);
        sysSec.appendChild(sysGrid);
        
        this.appendChild(sysSec);
    }
}

customElements.define('game-system-reqs', GameSystemReqs);
export { GameSystemReqs };
