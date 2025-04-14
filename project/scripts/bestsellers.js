const productsURL = 'https://0x-moon-x0.github.io/wdd231/project/data/products.json';
const bestsellersContainer = document.querySelector('#bestsellers-container');

async function loadBestSellers() {
    try {
        const response = await fetch(productsURL);
        const products = await response.json();

        const bestSellers = products.filter(product =>
            product.popularity === 4 || product.popularity === 5
        );

        renderCarousel(bestSellers);
    } catch (error) {
        console.error('Error loading best sellers:', error);
    }
}

function renderCarousel(products) {
    const track = document.createElement('div');
    track.classList.add('carousel-track');

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('bestseller-card');
        card.innerHTML = `
            <h3>${product.productName}</h3>
            <p>${product.description}</p>
            <p><strong>By:</strong> ${product.author}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <img src="${product.image}" alt="${product.productName}" loading="lazy">
            <a href="catalog.html"><button>View Catalog</button></a>
        `;
        track.appendChild(card);
    });

    bestsellersContainer.innerHTML = '';
    bestsellersContainer.appendChild(track);

    let index = 0;
    const total = products.length;

    const updateCarousel = () => {
        const offset = -index * 100;
        track.style.transform = `translateX(${offset}%)`;

        const cards = track.querySelectorAll('.bestseller-card');
        cards.forEach((card, i) => {
            card.classList.remove('center', 'side');
            if (i === index) {
                card.classList.add('center');
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.classList.add('side');
                card.setAttribute('aria-hidden', 'true');
            }
        });

        index = (index + 1) % total;
    };

    updateCarousel();
    setInterval(updateCarousel, 5000);
}

loadBestSellers();