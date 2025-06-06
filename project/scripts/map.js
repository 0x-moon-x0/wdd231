document.addEventListener("DOMContentLoaded", function () {
    const isMobile = window.innerWidth < 768;

    const map = L.map('map', {
        zoomControl: !isMobile,
        dragging: !isMobile,
        tap: !isMobile,
        scrollWheelZoom: !isMobile
    }).setView([51.0836, -113.9561], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.0836, -113.9561])
        .addTo(map)
        .bindPopup('<strong>Mary Made Stuff</strong><br>Village Square Mall')
        .openPopup();
});