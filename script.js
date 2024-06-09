const contents = {
    x: {
        textFile: 'text/text1.txt',
        audio: 'path/to/audioX.mp3'
    },
    y: {
        textFile: 'text/text2.txt',
        audio: 'path/to/audioY.mp3'
    }
};

async function fetchText(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
}

async function showContent(tab) {
    const content = contents[tab];
    const text = await fetchText(content.textFile);
    document.getElementById('text-box').value = text;
    
    const audioSource = document.getElementById('audio-source');
    audioSource.src = content.audio;
    document.getElementById('audio-player').load();

    // Update active tab
    document.querySelectorAll('.tab').forEach(button => button.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
}

// Initialize with the content for tab X
document.addEventListener('DOMContentLoaded', () => {
    showContent('x');
});
