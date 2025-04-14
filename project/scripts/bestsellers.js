const productsURL = 'https://0x-moon-x0.github.io/wdd231/project/data/products.json';

const bestsellersContainer = document.querySelector('#bestsellers-container');

async function loadBestSellers() {
    try {
        const response = await fetch(productsURL);
        const products = await response.json();

        const bestSellers = products.filter(product =>
            product.popularity === 4 || product.popularity === 5
        );

        startCarousel(bestSellers);
    } catch (error) {
        console.error('Error loading best sellers:', error);
    }
}

function createCard(product) {
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

    return card;
}

function startCarousel(bestSellers) {
    let index = 0;

    const displayNext = () => {
        bestsellersContainer.innerHTML = '';
        const card = createCard(bestSellers[index]);
        card.classList.add('fade-in');
        bestsellersContainer.appendChild(card);

        index = (index + 1) % bestSellers.length;
    };

    displayNext();
    setInterval(displayNext, 4000);
}

loadBestSellers();