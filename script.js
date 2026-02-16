// Menu
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');

    settingsBtn.addEventListener('click', () => {
        settingsMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
            settingsMenu.classList.remove('open');
        }
    });

// Timer
const TIMER_DISPLAY = document.querySelector('.timer span');
const START_BTN = document.querySelector('.start_button');
const PAUSE_BTN = document.querySelector('.pause_button');
const RESET_BTN = document.querySelector('.reset_button');
const TIME_BUTTONS = document.querySelectorAll('.time_button');
const SETTINGS_MENU = document.getElementById('settingsMenu');

let timerInterval = null;
let remainingTime = 25 * 60;
let isRunning = false;
let selectedMinutes = 25;

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    TIMER_DISPLAY.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    timerInterval = setInterval(() => {
        remainingTime--;
        updateDisplay();
        
        if (remainingTime <= 0) {
            stopTimer();
            playRingSound();
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    remainingTime = selectedMinutes * 60;
    updateDisplay();
}

function playRingSound() {
    const audio = new Audio(`./assets/sounds/ring.wav`);
    audio.volume = 0.3;
    audio.play();
}

function setTimerDuration(minutes) {
    selectedMinutes = minutes;
    remainingTime = minutes * 60;
    updateDisplay();
    
    TIME_BUTTONS.forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    SETTINGS_MENU.classList.remove('open');
}

START_BTN.addEventListener('click', startTimer);
PAUSE_BTN.addEventListener('click', stopTimer);
RESET_BTN.addEventListener('click', resetTimer);

TIME_BUTTONS.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const minutes = parseInt(btn.textContent);
        setTimerDuration(minutes);
    });
});

updateDisplay();