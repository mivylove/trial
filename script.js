const contents = {
    x: {
        textFile: 'text/text1.txt',
        audio: 'audio/audio1.wav'
    },
    y: {
        textFile: 'text/text2.txt',
        audio: 'audio/audio2.wav'
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
    document.getElementById('textbox').value = text;
    
    const audioSource = document.getElementById('audio-source');
    audioSource.src = content.audio;
    document.getElementById('audio-player').load();

    textbox.scrollTop = 0;

    // Update active tab
    document.querySelectorAll('.tab').forEach(button => button.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
}

// Initialize with the content for tab X
document.addEventListener('DOMContentLoaded', () => {
    showContent('x');
});

function checkPassword() {
    const password = document.getElementById('password-input').value.toLowerCase();
    const correctPassword = "bloop"; // Replace with your actual password
    
    if (password === correctPassword) {
        document.getElementById('password-prompt').style.display = "none";
        document.getElementById('main-content-wrapper').style.display = "flex";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

async function submitWish() {
    const wishText = document.getElementById('wishes-box').value;
    const apiUrl = 'https://htcojbuqvf.execute-api.ap-south-1.amazonaws.com/prod'; // Replace with your API Gateway invoke URL

    const requestBody = {
        body: JSON.stringify({ wishText })
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert('Wish stored successfully!');
        } else {
            alert('Failed to store wish.');
        }
    } catch (error) {
        console.error('Error storing wish:', error);
        alert('Failed to store wish.');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const submenus = document.querySelectorAll('.submenu');
  
    submenus.forEach(function (submenu) {
      submenu.addEventListener('click', function () {
        // Handle click event for submenu here
        console.log('Submenu clicked:', submenu.textContent);
      });
    });
  });
function openPDF(pdfPath) {
    window.open(pdfPath, '_blank');
}
function openContent(type, path) {
    const displayContainer = document.getElementById('display-container');

    // Hide all display items
    document.getElementById('pdf-viewer').style.display = 'none';
    document.getElementById('image-viewer').style.display = 'none';
    document.getElementById('video-player').style.display = 'none';

    if (type === 'pdf') {
        const pdfViewer = document.getElementById('pdf-viewer');
        pdfViewer.src = path;
        pdfViewer.style.display = 'block';
    } else if (type === 'image') {
        const imageViewer = document.getElementById('image-viewer');
        imageViewer.src = path;
        imageViewer.style.display = 'block';
    } else if (type === 'video') {
        const videoPlayer = document.getElementById('video-player');
        document.getElementById('video-source').src = path;
        videoPlayer.load();
        videoPlayer.style.display = 'block';
    }

    // Show the display container
    displayContainer.style.display = 'block';
}

function closeContent() {
    const displayContainer = document.getElementById('display-container');
    displayContainer.style.display = 'none';

    // Pause the video and reset the source
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.pause();
    document.getElementById('video-source').src = '';
    videoPlayer.load();
}
