let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let laps = [];

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('lapBtn').addEventListener('click', lap);
document.getElementById('stopBtn').addEventListener('click', stop);
document.getElementById('resetBtn').addEventListener('click', reset);

function start() {
    if (!isRunning) {
        interval = setInterval(run, 10);
        isRunning = true;
    }
}

function lap() {
    if (isRunning) {
        const lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        laps.push(lapTime);
        updateLaps();
    }
}

function reset() {
    stop();
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    laps = [];
    updateDisplay();
    updateLaps();
}

function stop() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
}

function run() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}
