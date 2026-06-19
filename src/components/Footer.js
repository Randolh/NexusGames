const Footer = () => {
    const footer = document.createElement('footer');
    footer.className = 'footer';

    const container = document.createElement('div');
    container.className = 'footer__container';

    // Developer Info
    const devInfo = document.createElement('div');
    devInfo.className = 'footer__dev';
    
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/Randolh';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'footer__link';
    
    const githubIcon = document.createElement('i');
    githubIcon.className = 'fab fa-github footer__icon';
    
    const devText = document.createTextNode(' Developed by Randolh');
    
    githubLink.appendChild(githubIcon);
    githubLink.appendChild(devText);
    devInfo.appendChild(githubLink);

    // API Info
    const apiInfo = document.createElement('div');
    apiInfo.className = 'footer__api';
    
    const apiText = document.createTextNode('Powered by ');
    
    const apiLink = document.createElement('a');
    apiLink.href = 'https://www.freetogame.com/api-doc';
    apiLink.target = '_blank';
    apiLink.rel = 'noopener noreferrer';
    apiLink.className = 'footer__link footer__link--mint';
    apiLink.textContent = 'FreeToGame API';

    apiInfo.appendChild(apiText);
    apiInfo.appendChild(apiLink);

    container.appendChild(devInfo);
    container.appendChild(apiInfo);
    footer.appendChild(container);

    return footer;
};

export default Footer;
