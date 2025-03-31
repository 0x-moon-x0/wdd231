const spotlightURL = 'https://0x-moon-x0.github.io/wdd231/chamber/data/members.json';

const spotlightContainer = document.querySelector('.spotlight-container');

async function loadSpotlights() {
    try {
        const response = await fetch(spotlightURL);
        const members = await response.json();

        const spotlightCandidates = members.filter(member =>
            member.membership_level === 2 || member.membership_level === 3
        );

        const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

        selected.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight');

            card.innerHTML = `
                <img width='300' height='300' src="${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p><strong>Level:</strong> ${membershipName(member.membership_level)}</p>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            spotlightContainer.appendChild(card);
        });
    } catch (err) {
        console.error('Error loading spotlights:', err);
    }
}

function membershipName(level) {
    switch(level) {
        case 3: return 'Gold';
        case 2: return 'Silver';
        default: return 'Standard';
    }
}

loadSpotlights();