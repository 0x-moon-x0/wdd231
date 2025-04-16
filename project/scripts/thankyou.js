document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const fullName = capitalize(params.get("name"));
    const email = params.get("email");
    const phone = params.get("phone") || "Not provided";
    const message = params.get("message");

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] ? capitalize(nameParts[0]) : "Friend";
    const lastName = nameParts[1] ? capitalize(nameParts[1]) : "";

    document.getElementById("nameTitle").textContent = firstName;
    const confirmedName = lastName ? `${firstName} ${lastName}` : firstName;

    document.getElementById("name").textContent = confirmedName;
    document.getElementById("email").textContent = email;
    document.getElementById("phone").textContent = phone;
    document.getElementById("msg").textContent = message;

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = now.toLocaleString('en-US', options);

    document.getElementById("timestamp").textContent = formattedTime;
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}