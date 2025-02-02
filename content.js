let mediaRecorder = null;
let audioChunks = [];
let recognition = null;

function initWebSpeech() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        // Additional setup...
    }
}

function startWebSpeechCapture() {
    if (recognition) {
        recognition.start();
    }
}

async function startWhisperCapture() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: false });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = async (event) => {
            if (event.data.size > 0) {
                const audioBuffer = await event.data.arrayBuffer();
                // Process audioBuffer...
            }
        };
        mediaRecorder.start(3000);
    } catch (err) {
        console.error('Error capturing audio:', err);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startCapture') {
        if (message.method === 'webSpeech') {
            startWebSpeechCapture();
        } else if (message.method === 'whisper') {
            startWhisperCapture();
        }
    } else if (message.action === 'stopCapture') {
        if (recognition) {
            recognition.stop();
        }
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder = null;
            audioChunks = [];
        }
    }
});

initWebSpeech();