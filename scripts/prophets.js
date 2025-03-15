const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');
const buttons = document.querySelectorAll('nav button');

let allProphets = [];

async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();

    allProphets = data.prophets;
    displayProphets(allProphets);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        let filteredProphets = allProphets;

        switch (button.id) {
            case 'utah':
                filteredProphets = allProphets.filter(prophet => prophet.birthplace.includes('Utah'));
                break;
            case 'non-us':
                filteredProphets = allProphets.filter(prophet =>
                    !['United States', 'Utah', 'Vermont', 'Idaho', 'Ohio', 'Missouri', 'Connecticut'].includes(prophet.birthplace)
                );
                break;
            case 'old':
                filteredProphets = allProphets.filter(prophet => {
                    const birthYear = parseInt(prophet.birthdate.split(' ')[2]);
                    const deathYear = prophet.death ? parseInt(prophet.death.split(' ')[2]) : new Date().getFullYear();
                    return (deathYear - birthYear) >= 95;
                });
                break;
            case 'children':
                filteredProphets = allProphets.filter(prophet => prophet.numofchildren >= 10);
                break;
            case 'served':
                filteredProphets = allProphets.filter(prophet => prophet.length >= 15);
                break;
            case 'all':
                filteredProphets = allProphets;
                break;    
        }

        displayProphets(filteredProphets);
    });
});

const displayProphets = (prophets) => {
    cards.innerHTML = '';

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