const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('#animated-nav');
const navLinks = document.querySelectorAll('.navbar a')

hamButton.setAttribute('aria-expanded', navigation.classList.contains('open'));

hamButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    hamButton.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
