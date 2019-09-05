class Timer {
    isRunning = false;
    
    constructor(updateUI) {
        this.isRunning = false
        this.timeElapsed = 0
        this.laps = []
        this.updateUI = updateUI
        this.updateTimer = () => {
            this.timeElapsed++
            this.updateUI()
        }
    }

    startStop() {
        if (!this.isRunning) {
            this.isRunning = true
            this.interval = setInterval(this.updateTimer, 10)
        } else {
            clearInterval(this.interval)
            this.isRunning = false
        }
        this.updateUI()
    }

    lapReset() {
        if(this.isRunning) {
            this.laps.push(this.timeElapsed)
            console.log(this.laps)
        } else {
            this.laps = []
            this.timeElapsed = 0
        }
    }
}

let timer = new Timer(onUpdateUI)

const formatTime = (timeMilliseconds) => {
    const minutes = Math.floor(timeMilliseconds / 6000)
    const seconds = Math.floor((timeMilliseconds % 6000) / 100)
    const milliseconds = ((timeMilliseconds % 60000) % 100)
    const currentTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ':' + (milliseconds < 10 ? '0' : '') + milliseconds

    return currentTime
}

const updateDisplayTime = () => {
    const time = formatTime(timer.timeElapsed)
    document.getElementById('display').innerHTML = time
}

const updateStartStop = () => {
    document.getElementById('startStop').innerHTML =  timer.isRunning ? 'Stop' : 'Start'
}

const updateLapReset = () => {
    if(timer.isRunning) { 
        document.getElementById('lapReset').innerHTML = 'Lap'
    } else { 
        document.getElementById('lapReset').innerHTML = 'Reset'
        document.getElementById('display').innerHTML = '00:00:00'
    }
}

const lapResetButton = document.getElementById('lapReset').addEventListener('click', updateLapReset)

const addRow = (key, value) => {
    let newRow = document.getElementById('lapTable').insertRow(1)
        newRow.setAttribute('id', key)
        let newLapCell = newRow.insertCell(0)
        let newTimeCell = newRow.insertCell(1)
        let lapText = document.createTextNode('Lap ' + key)
        let timeText = document.createTextNode(this.formatTime(value))

        newLapCell.appendChild(lapText)
        newTimeCell.appendChild(timeText)
}

const updateTable = () => {
    
}

function onUpdateUI() {
    updateLapReset()
    updateStartStop()
    updateDisplayTime()
}