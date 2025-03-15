const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let dob = document.createElement('p');
        let pob = document.createElement('p');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.innerHTML = `<span>Date of Birth:</span> ${prophet.birthdate}`;
        pob.innerHTML = `<span>Place of Birth:</span> ${prophet.birthplace}`;
        
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${getOrdinal(prophet.order)} Latter-day President`)
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

function getOrdinal(order) {
    if (order % 10 === 1 && order % 100 !== 11) {
        return `${order}st`;
    } else if (order % 10 === 2 && order % 100 !== 12) {
        return `${order}nd`;
    } else if (order % 10 === 3 && order % 100 !== 13) {
        return `${order}rd`;
    } else {
        return `${order}th`;
    }
}

getProphetData(url);