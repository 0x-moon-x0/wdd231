const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navbar');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        if (link.pathname === window.location.pathname) {
            link.classList.add('active');
        }
    });
});