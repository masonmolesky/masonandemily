const validEntries = [
    { lastName: "6627835f988e2c5e50533d491163072d3f4f41f5c8b04630150debb3722ca2dd", hash: "9c852c001949a49ede974a2d8bf2bbefbe0ecd54226ef96e7c73492ce0a7e7ee" },
    { lastName: "e13743a7f1db7f4246badd6fd6ff54ffbe05b16e72d3ee3d29ab643f653b09c3", hash: "02e74f10e0327ad868d138f2b4fdd6f0e75ae738d564cd7d26fbbc17e2c9b54f" },
    { lastName: "8e296a067a37563370ded05f5a3bf3ec1b3472b76fb3eea8a7dfecf39a08f11b", hash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b455358d275d963dfc09" }
];

document.addEventListener('DOMContentLoaded', () => {
    const checkForm = document.getElementById('checkForm');
    const resultElement = document.getElementById('result');
    const signinTitle = document.getElementById('signinTitle');
    const rsvpIframe = document.getElementById('rsvpIframe');

    checkForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const lastName = document.getElementById('lastName').value.trim();
        const uniqueId = document.getElementById('uniqueId').value.trim();
        const hashedLastName = CryptoJS.SHA256(lastName).toString(CryptoJS.enc.Hex);
        const hashedValue = CryptoJS.SHA256(lastName + uniqueId).toString(CryptoJS.enc.Hex);

        const isValid = validEntries.some(entry => entry.lastName === hashedLastName && entry.hash === hashedValue);

        if (isValid) {
            resultElement.textContent = "Login successful!";
            resultElement.style.color = "green";
            
            // Hide sign-in elements
            checkForm.style.display = 'none';
            signinTitle.style.display = 'none';
            
            // Display the iframe
            rsvpIframe.style.display = 'block';
        } else {
            resultElement.textContent = "Invalid login credentials.";
            resultElement.style.color = "red";
        }
    });
});