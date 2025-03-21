const video = document.querySelector('.viewer');
const toggleButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Play/Pause Toggle Function
function togglePlay() {
    if (video.paused) {
        video.play();
        toggleButton.textContent = '❚ ❚';
    } else {
        video.pause();
        toggleButton.textContent = '►';
    }
}

// Update Play/Pause Button
function updateButton() {
    toggleButton.textContent = video.paused ? '►' : '❚ ❚';
}

// Update Volume
function updateVolume() {
    video.volume = this.value;
}

// Update Playback Speed
function updateSpeed() {
    video.playbackRate = this.value;
}

// Skip Video by -10s or +25s
function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Update Progress Bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
}

// Scrub Video via Progress Bar Click
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
toggleButton.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
volumeSlider.addEventListener('input', updateVolume);
speedSlider.addEventListener('input', updateSpeed);
skipButtons.forEach(button => button.addEventListener('click', skipVideo));
progress.addEventListener('click', scrub);
