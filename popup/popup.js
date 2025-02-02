document.getElementById('startBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startCapture', method: 'webSpeech' });
});

document.getElementById('stopBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopCapture' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'transcription') {
      const transcriptDiv = document.getElementById('transcriptDiv');
      if (message.isFinal) {
          const p = document.createElement('p');
          p.textContent = message.text;
          transcriptDiv.appendChild(p);
      } else {
          let interimP = transcriptDiv.querySelector('.interim');
          if (!interimP) {
              interimP = document.createElement('p');
              interimP.className = 'interim';
              transcriptDiv.appendChild(interimP);
          }
          interimP.textContent = message.text;
      }
      transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
  }
});