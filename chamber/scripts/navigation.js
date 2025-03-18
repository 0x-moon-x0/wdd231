const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animated-nav');
const navLinks = document.querySelectorAll('.navbar a')

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
