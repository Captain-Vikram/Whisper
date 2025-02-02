let isTranscribing = false;
let worker = null;

function initWorker() {
    worker = new Worker(chrome.runtime.getURL('lib/whisper-worker.js'));
    
    worker.onmessage = (e) => {
        if (e.data.type === 'result') {
            chrome.runtime.sendMessage({
                type: 'transcription',
                text: e.data.text,
                timestamps: e.data.timestamps,
                isFinal: true
            });
        } else if (e.data.type === 'error') {
            console.error('Whisper worker error:', e.data.error);
        }
    };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startCapture') {
        startTranscription();
        sendResponse({ status: 'Transcription started' });
    } else if (message.action === 'stopCapture') {
        stopTranscription();
        sendResponse({ status: 'Transcription stopped' });
    }
});

function startTranscription() {
    if (!isTranscribing) {
        isTranscribing = true;
        initWorker();
        console.log('Transcription started');
    }
}

function stopTranscription() {
    if (isTranscribing) {
        isTranscribing = false;
        if (worker) {
            worker.terminate();
            worker = null;
        }
        console.log('Transcription stopped');
    }
}