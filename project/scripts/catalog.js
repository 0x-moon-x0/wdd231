const productsURL = 'https://0x-moon-x0.github.io/wdd231/project/data/products.json';
const productGrid = document.getElementById('products-grid');
const sortDropdown = document.getElementById('sort-price');

let products = [];

async function fetchProducts() {
    try {
        const response = await fetch(productsURL);
        if (!response.ok) throw new Error('Failed to load products.');
        products = await response.json();
        sortAndDisplay('best');
    } catch (error) {
        console.error('Error loading best products:', error);
    }
}

function displayProducts(items) {
    productGrid.innerHTML = '';

    items.forEach(product => {
        const card = document.createElement('section');
        card.classList.add('product-card');

        card.innerHTML = `
            <h2>${product.productName}</h2>
            <img width='500' height='500' src="${product.image}" alt="${product.productName}" loading="lazy">
            <p class="description">${product.description}</p>
            <p class="author"><strong>By:</strong> ${product.author}</p>
            <p class="price"><strong>$${product.price.toFixed(2)}</strong></p>
        `;

        productGrid.appendChild(card);
    });
}

function sortAndDisplay(option) {
    let sorted = [...products];

    if (option === 'asc') {
        sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'desc') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (option === 'best') {
        sorted.sort((a, b) => b.popularity - a.popularity);
    }

    displayProducts(sorted);
}

sortDropdown.addEventListener('change', (e) => {
    sortAndDisplay(e.target.value);
});

fetchProducts();