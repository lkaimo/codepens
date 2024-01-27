function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchRhymes();
    }
}

function searchRhymes() {
    var word = $('#wordInput').val();
    var resultContainer = $('#resultContainer');

    // Check if the word is not empty
    if (word.trim() === '') {
        alert('Please enter a word');
        return;
    }

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/rhyme?word=' + word,
        headers: { 'X-Api-Key': 'RsKo0k+CPrSr2wqNLChWEA==sWVmHBEj2FX0oAwk' },
        contentType: 'application/json',
        success: function (result) {
            // Set display to block
            resultContainer.css('display', 'block');

            // Call the displayResults function
            displayResults(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}


function displayResults(results) {
    var resultContainer = $('#resultContainer');
    resultContainer.empty();

    if (results.length === 0) {
        resultContainer.append('<h3>No rhymes found.</h3>');
    } else {
        resultContainer.append('<h3>Rhymes:</h3>');
        var ul = $('<div></div>');

        results.forEach(function (rhyme) {
            ul.append(rhyme + ', ');
        });

        resultContainer.append(ul);
    }
}