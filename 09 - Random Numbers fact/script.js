document.getElementById('triviaBtn').classList.add('selected');

function setFactType(factType) {

    // Remove selected class from all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('selected');
    });
    // Add selected class to the clicked button
    document.getElementById(factType + 'Btn').classList.add('selected');
    selectedFactType = factType; // Update selected fact type
}

function searchNumberFact() {
    var numberInput = document.getElementById("numberInput");
    var number = numberInput.value.trim();
    var selectedFactType = ""; // Assuming you have a variable to store the selected fact type

    var apiUrl = "http://numbersapi.com/" + number + "/" + selectedFactType;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            document.getElementById("factResult").innerText = data;
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
}


// Listen for "Enter" key press
document.getElementById('numberInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchNumberFact(); // Trigger search function
    }
});

function fetchFact(url, elementId) {
    // Hide all fact divs
    var factDivs = document.querySelectorAll('.randomfact');
    factDivs.forEach(div => div.style.display = 'none');

    // Show the targeted fact div
    var targetDiv = document.getElementById(elementId);
    targetDiv.style.display = 'block';

    // Fetch and display the fact
    fetch(url)
        .then(response => response.text())
        .then(data => {
            targetDiv.innerText = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}