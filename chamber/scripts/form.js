document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toLocaleString();
    }

    const urlParams = new URLSearchParams(window.location.search);
    
    const displayFields = [
        { id: 'display-firstName', key: 'firstName' },
        { id: 'display-lastName', key: 'lastName' },
        { id: 'display-email', key: 'email' },
        { id: 'display-mobile', key: 'mobile' },
        { id: 'display-organization', key: 'organization' },
        { id: 'display-timestamp', key: 'timestamp' }
    ];

    displayFields.forEach(field => {
        const element = document.getElementById(field.id);
        const value = urlParams.get(field.key);
        if (element && value) {
            element.textContent = value;
        }
    });
});