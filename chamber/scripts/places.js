const placesURL = 'https://0x-moon-x0.github.io/wdd231/chamber/data/places.json';
const placesContainer = document.querySelector('#place-cards');

async function loadPlaces() {
    try {
        const response = await fetch(placesURL);
        const places = await response.json();

        places.forEach(place => {
            const card = document.createElement('section');
            card.classList.add('place-card');

            card.innerHTML = `
                <h2>${place.name}</h2>
                <figure>
                    <img width="300" height="200" src="${place.image}" alt="Image of ${place.name} loading="lazy">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}" target="_blank" rel="noopener">
                    <button type="button">Learn More</button>
                </a>
            `;

            placesContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading places:', error);
    }
}

loadPlaces();