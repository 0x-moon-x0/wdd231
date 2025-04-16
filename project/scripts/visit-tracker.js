function trackLastVisit() {
    const messageContainer = document.querySelector('#visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageContainer.textContent = "Welcome! We hope you find something you like.";
    } else {
        const daysBetween = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            messageContainer.textContent = "Your last visit was 1 day ago.";
        } else {
            messageContainer.textContent = `Your last visit was ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem('lastVisit', now.toString());

    setTimeout(() => {
        messageContainer.classList.add('animate');
    }, 100);
}

trackLastVisit();