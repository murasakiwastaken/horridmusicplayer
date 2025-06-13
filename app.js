// YouTube Player
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('play-btn').addEventListener('click', () => {
        player.playVideo();
    });
    
    document.getElementById('pause-btn').addEventListener('click', () => {
        player.pauseVideo();
    });
}

// Basic lyrics fetch (using Genius API)
async function getLyrics(artist, song) {
    const response = await fetch(`https://some-free-lyrics-api.com/?artist=${artist}&song=${song}`);
    const data = await response.json();
    document.getElementById('lyrics-container').innerText = data.lyrics;
}

// Example: Play default song
function playDefault() {
    player.cueVideoById('dQw4w9WgXcQ'); // Rick Astley example
    getLyrics('Rick Astley', 'Never Gonna Give You Up');
}
