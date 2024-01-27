$(document).ready(function () {
    const form = $('#form');
    const search = $('#search');
    const result = $('#result');
    const video = $('#video');
    const apiURL = 'https://api.lyrics.ovh';

    form.on('submit', function (e) {
      e.preventDefault();
      const searchValue = search.val().trim();

      if (!searchValue) {
        alert('There is nothing to search');
      } else {
        searchSong(searchValue);
      }
    });

    search.on('keyup', searchOnKeyUp);

    result.on('click', 'span', function (e) {
      const clickedElement = $(e.target);
      const artist = clickedElement.attr('data-artist');
      const songTitle = clickedElement.attr('data-songtitle');
      getLyrics(artist, songTitle);
    });

    function searchSong(searchValue) {

      const placeholderElement = document.getElementById('placeholder');
      if (placeholderElement) {
        placeholderElement.style.display = 'none';
      }

      fetch(`${apiURL}/suggest/${searchValue}`)
        .then((searchResult) => searchResult.json())
        .then((data) => {
          if (data && data.data && data.data.length > 0) {
            const firstSong = data.data[0];
            const artist = firstSong.artist.name;
            const songTitle = firstSong.title;
            getLyrics(artist, songTitle);
          } else {
            result.html('<p>No results found.</p>');
            video.html('');
          }
        });
    }

    function showData(data) {
      result.html(`
        <ul class="song-list">
          ${data.data
            .map(
              (song) => `<li>
                <div>
                  <strong>${song.artist.name}</strong> -${song.title} 
                </div>
                <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
              </li>`
            )
            .join('')}
        </ul>
      `);
      video.html('');
    }

    function getLyrics(artist, songTitle) {
      fetch(`${apiURL}/v1/${artist}/${songTitle}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.lyrics) {
            let lyrics = data.lyrics;
            const lines = lyrics.split(/\r\n|\r|\n/);

            if (lines.length > 0 && lines[0].startsWith('Paroles de la chanson')) {
              lines.shift();
            }

            lyrics = lines.join('<br>');

            result.html(`
              <h4 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h4>
              <p style="margin-top:20px;">${lyrics}</p>
            `);
          } else {
            result.html(
              '<p>No lyrics found for this song. Some lyrics may not be available due to Data Update Frequency, Data Synchronization Issues, Differences in Database Content or Licensing and Agreements</p>'
            );
          }
        });
    }

    // Add your other event listeners as needed
  });