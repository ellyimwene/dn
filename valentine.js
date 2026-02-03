let currentStage = 1;
const totalStages = 4;
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

// Auto-play music when user interacts
document.addEventListener('click', () => {
    if (!isMusicPlaying) {
        music.play();
        isMusicPlaying = true;
        musicToggle.textContent = '🔊';
    }
});

// Alternative: Try to autoplay on page load
window.addEventListener('load', () => {
    music.volume = 0.3;
    music.play().catch(() => {
        console.log('Autoplay prevented - will play on first interaction');
    });
    isMusicPlaying = true;
});

function nextStage() {
    if (currentStage < totalStages) {
        const currentStageEl = document.querySelector('.stage.active');
        currentStageEl.classList.remove('active');
        currentStage++;
        const nextStageEl = document.querySelectorAll('.stage')[currentStage - 1];
        nextStageEl.classList.add('active');
        
        // Clear previous heartbeats and popups
        clearStageElements();
        
        // Trigger animations for specific stages
        if (currentStage === 1) {
            createHeartbeats();
            createPopups(['😊', '💖', '✨', '💝', '🌹']);
        }
        if (currentStage === 2) {
            createHeartbeats();
            createRosePetals();
            createPopups(['💘', '😍', '💕', '💖', '✨', '💝']);
        }
        if (currentStage === 3) {
            createHeartbeats();
            createSparkles();
            createPopups(['💖', '✨', '😍', '💕', '🌹', '💝']);
        }
        if (currentStage === 4) {
            createHeartbeats();
            createPopups(['💖', '❤️', '💕', '😍', '💝', '✨']);
        }
    }
}

function toggleMusic() {
    if (isMusicPlaying) {
        music.pause();
        musicToggle.textContent = '🔇';
        isMusicPlaying = false;
    } else {
        music.play();
        musicToggle.textContent = '🔊';
        isMusicPlaying = true;
    }
}

function runAwayBtn() {
    const btn = document.getElementById('noBtn');
    const randomX = Math.random() * (window.innerWidth - 150);
    const randomY = Math.random() * (window.innerHeight - 60);
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

// Create heartbeat emojis scattered around stage
function createHeartbeats() {
    const stage = document.querySelector('.stage.active');
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heartbeat = document.createElement('div');
            heartbeat.className = 'heartbeat';
            heartbeat.textContent = '❤️';
            heartbeat.style.left = Math.random() * 90 + 5 + '%';
            heartbeat.style.top = Math.random() * 80 + 10 + '%';
            heartbeat.style.animationDelay = (Math.random() * 0.5) + 's';
            heartbeat.style.pointerEvents = 'none';
            stage.appendChild(heartbeat);
        }, i * 300);
    }
}

// Create popup emojis that float up
function createPopups(emojis) {
    const stage = document.querySelector('.stage.active');
    let popupCount = 0;
    const popupInterval = setInterval(() => {
        if (popupCount >= 12) {
            clearInterval(popupInterval);
            return;
        }
        
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        popup.style.left = startX + 'px';
        popup.style.top = startY + 'px';
        
        const offsetX = (Math.random() - 0.5) * 200;
        const offsetY = (Math.random() - 0.5) * 150 - 100;
        
        popup.style.setProperty('--px', offsetX + 'px');
        popup.style.setProperty('--py', offsetY + 'px');
        
        stage.appendChild(popup);
        popupCount++;
        
        setTimeout(() => popup.remove(), 2000);
    }, 300);
}

// Clear heartbeats and popups from stage
function clearStageElements() {
    const stage = document.querySelector('.stage.active');
    const heartbeats = stage.querySelectorAll('.heartbeat');
    const popups = stage.querySelectorAll('.popup');
    heartbeats.forEach(hb => hb.remove());
    popups.forEach(p => p.remove());
}

// Create rose petals
function createRosePetals() {
    const stage = document.querySelector('.stage.active');
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.textContent = '🌹';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.fontSize = (0.5 + Math.random() * 1) + 'rem';
            petal.style.animationDuration = (2 + Math.random() * 2) + 's';
            stage.appendChild(petal);
        }, i * 200);
    }
}

// Create sparkles
function createSparkles() {
    const stage = document.querySelector('.stage.active');
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        stage.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }, 300);
}

// Initialize first stage with hearts and popups
createHeartbeats();
createPopups(['😊', '💖', '✨', '💝', '🌹']);
