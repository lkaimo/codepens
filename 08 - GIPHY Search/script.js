const apiKey = 'TGFLf4nF8LDSV2GYXTPJ5vyTLGV0osQg';

async function searchGifs() {
    const searchQuery = document.getElementById('search-input').value;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=15`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayGifs(data.data);
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
}

function displayGifs(gifs) {
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '';

    gifs.forEach(gif => {
        const gifElement = document.createElement('img');
        gifElement.src = gif.images.fixed_height.url;
        gifElement.alt = gif.title;
        gifElement.classList.add('gif');
        gifContainer.appendChild(gifElement);
    });
}

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchGifs();
    }
});
