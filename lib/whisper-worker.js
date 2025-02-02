importScripts('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.15.1');

let whisperProcessor = null;

async function initWhisper() {
    const { pipeline } = await import('@xenova/transformers');
    whisperProcessor = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en', {
        quantized: true
    });
}

self.onmessage = async function(e) {
    if (!whisperProcessor) {
        await initWhisper();
    }

    try {
        const { audioData, config } = e.data;
        const result = await whisperProcessor(audioData, {
            chunk_length_s: config?.chunkLength || 30,
            stride_length_s: config?.strideLength || 5,
            language: config?.language || 'english',
            task: 'transcribe',
            return_timestamps: true
        });

        self.postMessage({
            type: 'result',
            text: result.text,
            timestamps: result.chunks
        });
    } catch (error) {
        self.postMessage({
            type: 'error',
            error: error.message
        });
    }
};

self.postMessage({ type: 'ready' });