let currentAudio = null;

function toggleAudio(button) {
    const audioSrc = button.getAttribute('data-audio');
    
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        
        document.querySelectorAll('.audio-btn').forEach(btn => {
            btn.classList.remove('playing');
        });
        
        if (currentAudio.src.includes(audioSrc)) {
            currentAudio = null;
            return;
        }
    }
    
    const audio = new Audio(audioSrc);
    currentAudio = audio;
    
    button.classList.add('playing');
    
    audio.play()
        .then(() => {
            audio.onended = () => {
                button.classList.remove('playing');
                currentAudio = null;
            };
            
            audio.onerror = () => {
                button.classList.remove('playing');
                currentAudio = null;
            };
        })
        .catch(error => {
            console.error('播放失败:', error);
            button.classList.remove('playing');
            currentAudio = null;
        });
}

const style = document.createElement('style');
style.textContent = `
    .audio-btn.playing svg path {
        fill: #ff6b6b !important;
    }
    .audio-btn.playing {
        cursor: not-allowed;
        opacity: 0.8;
    }
`;
document.head.appendChild(style);