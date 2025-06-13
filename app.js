// Sample music library (you can expand this)
const musicLibrary = [
    { title: "Blinding Lights", artist: "The Weeknd", youtubeId: "4NRXx6U8ABQ" },
    { title: "Save Your Tears", artist: "The Weeknd", youtubeId: "XXYlFuWEuKI" },
    { title: "Stay", artist: "The Kid LAROI, Justin Bieber", youtubeId: "kTJczUoc26U" },
    { title: "good 4 u", artist: "Olivia Rodrigo", youtubeId: "gNi_6U5Pm_o" },
    { title: "Levitating", artist: "Dua Lipa", youtubeId: "TUVcZfQe-Kw" }
];

let player;
let currentSongIndex = 0;

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0', // Start hidden (we'll show when playing)
        width: '0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    renderSongList();
}

function onPlayerStateChange(event) {
    // Player state changed (playing, paused, etc.)
}

// Render song list
function renderSongList(filter = '') {
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    
    const filteredSongs = musicLibrary.filter(song => 
        song.title.toLowerCase().includes(filter.toLowerCase()) || 
        song.artist.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredSongs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'song-item';
        songElement.innerHTML = `
            <strong>${song.title}</strong> - ${song.artist}
        `;
        songElement.addEventListener('click', () => playSong(index));
        container.appendChild(songElement);
    });
}

// Play a song by index
function playSong(index) {
    currentSongIndex = index;
    const song = musicLibrary[index];
    
    document.getElementById('now-playing').innerText = 
        `Now Playing: ${song.title} - ${song.artist}`;
    
    // Resize player to be visible
    document.getElementById('youtube-player').style.height = '200px';
    document.getElementById('youtube-player').style.width = '100%';
    
    player.loadVideoById(song.youtubeId);
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    renderSongList(query);
});

document.getElementById('play-btn').addEventListener('click', () => {
    player.playVideo();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
    playSong(currentSongIndex);
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % musicLibrary.length;
    playSong(currentSongIndex);
});

// Initialize
document.getElementById('search-input').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        renderSongList(e.target.value);
    }
});
