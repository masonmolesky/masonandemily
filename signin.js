// Example list of hashed entries
const validEntries = [
    { lastName: "6627835f988e2c5e50533d491163072d3f4f41f5c8b04630150debb3722ca2dd", hash: "9c852c001949a49ede974a2d8bf2bbefbe0ecd54226ef96e7c73492ce0a7e7ee" }, //smith, 1234
    { lastName: "e13743a7f1db7f4246badd6fd6ff54ffbe05b16e72d3ee3d29ab643f653b09c3", hash: "02e74f10e0327ad868d138f2b4fdd6f0e75ae738d564cd7d26fbbc17e2c9b54f" },
    { lastName: "8e296a067a37563370ded05f5a3bf3ec1b3472b76fb3eea8a7dfecf39a08f11b", hash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b455358d275d963dfc09" }
];

document.addEventListener('DOMContentLoaded', () => {
    const checkForm = document.getElementById('checkForm');
    const rsvpForm = document.getElementById('rsvpForm');
    const resultElement = document.getElementById('result');
    const signinTitle = document.querySelector('h1'); // Target the "RSVP Sign-in" title
    const hashValueInput = document.getElementById('hashValue');

    // Check Form Submission
    checkForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the input values
        const lastName = document.getElementById('lastName').value.trim();
        const uniqueId = document.getElementById('uniqueId').value.trim();

        // Hash the input values
        const hashedLastName = CryptoJS.SHA256(lastName).toString(CryptoJS.enc.Hex);
        const hashedValue = CryptoJS.SHA256(lastName + uniqueId).toString(CryptoJS.enc.Hex);

        // Check if the hashed input matches any entry in the list
        const isValid = validEntries.some(entry => entry.lastName === hashedLastName && entry.hash === hashedValue);

        // Display the result
        if (isValid) {
            // Valid entry actions
            resultElement.textContent = "Entry is valid!";
            resultElement.style.color = "green";
            
            // Populate the hidden hash field
            hashValueInput.value = hashedValue;
            // Hide the sign-in form
            checkForm.style.display = 'none';
            // Hide the title
            signinTitle.style.display = 'none';  


        // rsvpForm.classList.remove('hidden'); //REMOVE BEFORE GOING LIVE <-------------------------

            // Fetch RSVP data from Google Sheets based on the hashValue // AKfycbw6YvcMhO3KnELG4CuA9JxQB1gZ8qBH0QV9HzElLj8
            fetch(`https://script.google.com/macros/s/AKfycbxT3kowaxi_vphShUcrfZiRsiLtIxCsomw73uCw53Q7CgykC2D2x95DPCgN36yTkajW/exec?hashValue=${hashedValue}`, {mode: 'no-cors', method: 'GET'})
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })            
                .then(data => {
                    // Populate RSVP form with existing data
                    document.getElementById('email').value = data.email;
                    document.getElementById('phone').value = data.phone;
                    document.getElementById('address').value = data.address;
                    document.getElementById('rsvpCeremony').value = data.rsvpCeremony;
                    document.getElementById('rsvpReception').value = data.rsvpReception;
                    document.getElementById('numAdult').value = data.numAdult;
                    document.getElementById('numKids').value = data.numKids;

                    // Show the RSVP form
                    rsvpForm.classList.remove('hidden');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        } else {
            // Invalid entry actions
            resultElement.textContent = "Entry is invalid.";
            resultElement.style.color = "red";

            // Hide the RSVP form if the sign-in is invalid
            rsvpForm.classList.add('hidden');
        }
    });

    // RSVP Form Submission
    rsvpForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Prepare RSVP data
        const formData = new URLSearchParams();
        formData.append('hashValue', hashValueInput.value);
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('phone', document.getElementById('phone').value.trim());
        formData.append('address', document.getElementById('address').value.trim());
        formData.append('rsvpCeremony', document.getElementById('rsvpCeremony').value);
        formData.append('rsvpReception', document.getElementById('rsvpReception').value);
        formData.append('numAdult', document.getElementById('numAdult').value);
        formData.append('numKids', document.getElementById('numKids').value);

        // Post RSVP data back to Google Sheets
        fetch('https://script.google.com/macros/s/AKfycbwEX356bH8UQCTiP2w5mbKFViqrYMdgwx_vIMPAJ-uTqa1fvcLh9GV1RpSWLaCC2M7e/exec', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(() => {
                alert('RSVP Submitted Successfully!');
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    });
    
    document.getElementById('rsvpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const hashValue = document.getElementById('hashValue').value;

    const formData = new URLSearchParams();
    formData.append('hashValue', hashValue);
    formData.append('email', document.getElementById('email').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('address', document.getElementById('address').value);
    formData.append('rsvpCeremony', document.getElementById('rsvpCeremony').value);
    formData.append('rsvpReception', document.getElementById('rsvpReception').value);
    formData.append('numAdult', document.getElementById('numAdult').value);
    formData.append('numKids', document.getElementById('numKids').value);

    // Post RSVP data back to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwEX356bH8UQCTiP2w5mbKFViqrYMdgwx_vIMPAJ-uTqa1fvcLh9GV1RpSWLaCC2M7e/exec', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(() => {
            alert('RSVP Submitted Successfully!');
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    });
});