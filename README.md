# Audio Transcription Extension

This project is a Chrome extension designed for audio transcription using the Web Speech API and Whisper.js. It allows users to capture audio from their browser and transcribe it in real-time.

## Project Structure

```
audio-transcription-extension/
├── manifest.json           # Extension configuration and permissions
├── content.js              # Tab audio capture and speech recognition initialization
├── background.js           # Audio processing and Whisper.js integration
├── popup/
│   ├── popup.html          # Extension UI
│   └── popup.js            # UI control and transcript display logic
├── lib/
│   └── whisper-worker.js   # Web worker for Whisper processing (optional)
└── _locales/               # Internationalization (optional)
    └── en/
        └── messages.json
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd audio-transcription-extension
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click on "Load unpacked" and select the `audio-transcription-extension/src` directory.

## Usage Guidelines

- Click on the extension icon to open the popup.
- Use the provided buttons to start and stop audio transcription.
- The transcribed text will be displayed in the popup interface.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.