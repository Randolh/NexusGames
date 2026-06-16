const Hero = (data) => {
    const game = data || {
        title: 'Overwatch',
        thumbnail: 'https://www.freetogame.com/g/540/thumbnail.jpg',
        short_description: 'A hero-focused first-person team shooter from Blizzard Entertainment.',
        id: 540
    }

    const section = document.createElement('section')
    section.className = 'hero'

    const container = document.createElement('div')
    container.className = 'hero__container'

    const imageWrapper = document.createElement('div')
    imageWrapper.className = 'hero__image-wrapper'
    
    const img = document.createElement('img')
    img.src = game.thumbnail
    img.alt = game.title
    img.className = 'hero__image'
    
    imageWrapper.appendChild(img)

    // Content
    const content = document.createElement('div')
    content.className = 'hero__content'

    const tag = document.createElement('span')
    tag.className = 'hero__tag'
    tag.textContent = 'Free to Play'

    const title = document.createElement('h1')
    title.className = 'title-primary hero__title'
    title.textContent = game.title

    const desc = document.createElement('p')
    desc.className = 'hero__desc'
    desc.textContent = game.short_description

    const priceBox = document.createElement('div')
    priceBox.className = 'hero__price-box'

    const price = document.createElement('span')
    price.className = 'hero__price'
    price.textContent = 'Free'

    const playBtn = document.createElement('a')
    playBtn.href = `/game/${game.id}`
    playBtn.className = 'button button--mint'
    playBtn.setAttribute('data-link', '')
    playBtn.textContent = 'Play Now'

    priceBox.appendChild(price)
    priceBox.appendChild(playBtn)

    content.appendChild(tag)
    content.appendChild(title)
    content.appendChild(desc)
    content.appendChild(priceBox)

    container.appendChild(imageWrapper)
    container.appendChild(content)

    section.appendChild(container)

    return section
}

export default Hero
