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
    const geniusAccessToken = 'C5cur7K7SNVqx1TDLlFVuEqCTdPDrKlWHI7xWbyJuEvKufe7LVnUmpWFPzJOcOh_'; // Replace with your Genius Access Token
    
    const spotifyClientId = '942ba0dda713421986a698a3a3aee095'; // Replace with your Spotify Client ID
    const spotifyClientSecret = 'b47aa8cc84d2459fb882a9c9bdfa3963'; // Replace with your Spotify Client Secret
    const songTitle = $('#songTitle').val();

    // Input validation
    if (!songTitle) {
        $('#result').show();
        $('#result').html(`<p class="error">Please enter a song title.</p>`);
        return;
    }

    // Genius API
    const geniusApiUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}&access_token=${geniusAccessToken}`;
    
    axios.get(geniusApiUrl)
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

                // Obtain Spotify access token
                const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
                const spotifyAuthHeader = 'Basic ' + btoa(`${spotifyClientId}:${spotifyClientSecret}`);

                axios.post(spotifyTokenUrl, 'grant_type=client_credentials', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': spotifyAuthHeader
                    },
                })
                .then(tokenResponse => {
                    const spotifyAccessToken = tokenResponse.data.access_token;

                    // Spotify API
                    const spotifyApiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(songTitle)}&type=track`;
                    axios.get(spotifyApiUrl, {
                        headers: {
                            'Authorization': `Bearer ${spotifyAccessToken}`
                        }
                    })
                    .then(spotifyResponse => {
                        const spotifyTracks = spotifyResponse.data.tracks.items;
                        if (spotifyTracks.length > 0) {
                            const spotifyTrack = spotifyTracks[0];
                            const spotifyId = spotifyTrack.id;

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
                                <div class="spotify-embed">
                                <iframe src="https://open.spotify.com/embed/track/${spotifyId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            </div>
                            `;

                            // Show the result div after successful search
                            $('#result').html(htmlResult).show();
                        } else {
                            $('#result').show();
                            $('#result').html(`<p class="error">No Spotify results found for "${songTitle}"</p>`);
                            // Hide the result div if there's an error
                        }
                    })
                    .catch(spotifyError => {
                        $('#result').show();
                        $('#result').html(`<p class="error">Spotify Error: ${spotifyError.message}</p>`);
                        // Hide the result div if there's an error
                    });
                })
                .catch(error => {
                    $('#result').show();
                    $('#result').html(`<p class="error">Error obtaining Spotify access token: ${error.message}</p>`);
                    // Hide the result div if there's an error
                });
            } else {
                $('#result').show();
                $('#result').html(`<p class="error">No results found for "${songTitle}" on Genius</p>`);
                // Hide the result div if there's an error
            }
        })
        .catch(error => {
            $('#result').show();
            $('#result').html(`<p class="error">${error.message}</p>`);
            // Hide the result div if there's an error
        });
}