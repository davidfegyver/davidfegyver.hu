const CONFIG = {
    user: "davidfegyver",
    key: "6c60864eaab9bc3875fa75cf5b24a8e6",
    interval: 5000,
    elementId: 'playing'
};


const container = document.getElementById(CONFIG.elementId);

async function checkListening() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${CONFIG.user}&api_key=${CONFIG.key}&format=json&limit=1`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        const track = data.recenttracks.track[0];

        const isPlaying = track['@attr']?.nowplaying === 'true';

        const cleanedTitle = track.name
            .replace(/\(.*?\)/g, '')
            .replace(/ -.*$/g, '')
            .trim();

        if (container) {
            container.innerHTML = `
                <h3>${isPlaying ? "Now playing" : "Last track played"}</h3>
                <a href="${track.url}" target="_blank" rel="noopener noreferrer">
                    ${track.artist['#text']} - ${cleanedTitle}
                </a>
            `;
        }

    } catch (error) {
        console.error("Last.fm Fetch Error:", error);
    }
}

if (container) {
    checkListening();
    setInterval(checkListening, CONFIG.interval);
}