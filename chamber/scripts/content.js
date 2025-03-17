const url = 'https://0x-moon-x0.github.io/wdd231/chamber/data/members.json';

const cardsContainer = document.querySelector('#cards');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

let allMembers = [];

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch member data');
        }

        const members = await response.json();
        allMembers = DataTransfer;
        displayMembers(allMembers, 'grid');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMembers(members, view = 'grid') {
    cardsContainer.innerHTML = '';
    cardsContainer.className = view;

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card', view);
        
        const content = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">${member.website}</a>
        `;

        card.innerHTML = view === 'grid' ? `<img src="${member.image}" alt="${member.name} Logo">${content}` : content;

        cardsContainer.appendChild(card);
    });
}

gridButton.addEventListener('click', () => displayMembers(allMembers, 'grid'));
listButton.addEventListener('click', () => displayMembers(allMembers, 'list'));

getMembers();