const FULL_DASH_ARRAY = 2 * Math.PI * 140;

const circle = document.querySelector('.progress-ring__circle');
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time-display');
const controls = document.querySelector('.controls');
const container = document.querySelector('.container');

let interval;
let totalTime;
let remainingTime;

startButton.addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    totalTime = minutes * 60 + seconds;
    remainingTime = totalTime;
    clearInterval(interval);
    updateDisplay();
    startTimer();
    controls.classList.add('fade-out');
    setTimeout(() => {
        controls.style.display = 'none';
    }, 500);
});

function startTimer() {
    interval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(interval);
            showCompletionMessage();
        } else {
            remainingTime--;
            updateDisplay();
        }
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    updateCircle();
}

function updateCircle() {
    const offset = FULL_DASH_ARRAY - (remainingTime / totalTime) * FULL_DASH_ARRAY;
    circle.style.strokeDasharray = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`;
    circle.style.strokeDashoffset = offset;
    if (remainingTime <= 10) {
        container.classList.add('pulse');
    } else {
        container.classList.remove('pulse');
    }
}

function showCompletionMessage() {
    timeDisplay.textContent = "Time's up!";
    const resetButton = document.createElement('button');
    resetButton.textContent = "Reset";
    resetButton.addEventListener('click', resetTimer);
    controls.innerHTML = '';
    controls.appendChild(resetButton);
    controls.style.display = 'flex';
    controls.classList.remove('fade-out');
}

function resetTimer() {
    clearInterval(interval);
    timeDisplay.textContent = "00:00";
    circle.style.strokeDasharray = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`;
    circle.style.strokeDashoffset = FULL_DASH_ARRAY;
    container.classList.remove('pulse');
    controls.innerHTML = `
        <div class="time-setting">
            <label for="minutes">Minutes:</label>
            <input type="number" id="minutes" placeholder="00" min="0">
            <label for="seconds">Seconds:</label>
            <input type="number" id="seconds" placeholder="00" min="0" max="59">
        </div>
        <button id="start-button">Start</button>
    `;
    document.getElementById('start-button').addEventListener('click', () => {
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        totalTime = minutes * 60 + seconds;
        remainingTime = totalTime;
        clearInterval(interval);
        updateDisplay();
        startTimer();
        controls.classList.add('fade-out');
        setTimeout(() => {
            controls.style.display = 'none';
        }, 500);
    });
    controls.style.display = 'flex';
}

// Initialize circle
circle.style.strokeDasharray = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`;
circle.style.strokeDashoffset = FULL_DASH_ARRAY;
