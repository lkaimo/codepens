$(document).ready(function () {
    // Add event listener for the Enter key
    $('#songTitle').keypress(function (e) {
        if (e.key === 'Enter') {
            getSongDetails();
        }
    });

    // Add event listener for the search button
    $('#searchButton').click(function () {
        getSongDetails();
    });
});

function getSongDetails() {
    const accessToken = 'C5cur7K7SNVqx1TDLlFVuEqCTdPDrKlWHI7xWbyJuEvKufe7LVnUmpWFPzJOcOh_';
    const songTitle = $('#songTitle').val();

    // Input validation
    if (!songTitle) {
        $('#result').html(`<p class="error">Please enter a song title.</p>`);
        return;
    }

    const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}&access_token=${accessToken}`;

    axios.get(apiUrl)
        .then(response => {
            const hits = response.data.response.hits;
            if (hits.length > 0) {
                const firstHit = hits[0];
                const songId = firstHit.result.id;
                const fullTitle = firstHit.result.full_title;
                const releaseDate = firstHit.result.release_date_with_abbreviated_month_for_display;
                const artistName = firstHit.result.primary_artist.name;
                const artistImage = firstHit.result.primary_artist.image_url;
                const songImage = firstHit.result.song_art_image_url;
                const lyricsLink = firstHit.result.url;

                const htmlResult = `
                    <div class="song-details-card">
                        <div class="image-container">
                            <img class="song-art-image" src="${songImage}" alt="${artistName}">
                        </div>
                        <div class="details-container">
                            <div class="row center-both">
                                <img class="artist-image" src="${artistImage}" alt="${artistName}">
                                <span class="song-title">${fullTitle}</span>
                            </div>
                            <span class="song-info">Genius Song ID: ${songId}</span>
                            <span class="song-info">Release Date: ${releaseDate}</span>
                            <span class="lyrics-link"><a href="${lyricsLink}" target="_blank">Lyrics and more details of ${fullTitle}</a></span>
                        </div>
                    </div>
                `;

                $('#result').html(htmlResult);
            } else {
                $('#result').html(`<p class="error">No results found for "${songTitle}"</p>`);
            }
        })
        .catch(error => {
            $('#result').html(`<p class="error">Error: ${error.message}</p>`);
        });
}
