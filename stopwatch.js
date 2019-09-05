class Timer {
    constructor(updateUI) {

        this.isRunning = false
        this.timeElapsed = 0
        this.lapTimer = 0
        this.lapArr = []
        this.lapDiff = {}
        this.updateUI = updateUI

        this.updateTimer = () => {
            this.timeElapsed++;
            this.lapTimer++;
            this.updateUI()
        }
    }

    startStop() {
        if(!this.isRunning) {
            this.isRunning = true
            this.interval = setInterval(this.updateTimer, 10)
            document.getElementById('startStop').innerHTML = 'Stop'
            document.getElementById('lapReset').innerHTML = 'Lap'
            document.getElementById('lapReset').removeAttribute('disabled')
        } else {
            clearInterval(this.interval)
            document.getElementById('startStop').innerHTML = 'Start'
            document.getElementById('lapReset').innerHTML = 'Reset'
            this.isRunning = false
        }
    }

    lapReset() {
        if(this.isRunning) {
            this.lapArr.push(this.timeElapsed)
            const key = this.lapArr.length
            const diff = key < 2 ? this.lapArr[0] - 0 : this.lapArr[key - 1] - this.lapArr[key - 2]
            this.lapDiff = {
                ...this.lapDiff, 
                [key]: diff
            }
            this.addRow(key, diff)
            this.lapTimer = 0
        } else {
            this.timeElapsed = 0
            this.lapTimer = 0
            this.lapArr = []
            this.lapDiff = {}
            document.getElementById('display').innerHTML = '00:00:00'
            document.getElementById('lapReset').innerHTML = 'Lap'
            if(!this.isRunning && document.getElementById('lapReset').innerHTML !== 'Reset') { document.getElementById('lapReset').setAttribute('disabled', 'true') }
            for(let i = document.getElementById('lapTable').rows.length - 1; i > -1; i--) {
                document.getElementById('lapTable').deleteRow(i);
            }
        }
    }

    addRow(key, value) {
        let newRow = document.getElementById('lapTable').insertRow(1)
        newRow.setAttribute('id', key)
        let newLapCell = newRow.insertCell(0)
        let newTimeCell = newRow.insertCell(1)
        let lapText = document.createTextNode('Lap ' + key)
        let timeText = document.createTextNode(this.formatTime(value))

        newLapCell.appendChild(lapText)
        newTimeCell.appendChild(timeText)
    }

    formatTime(timeMilliseconds) {
        const minutes = Math.floor(timeMilliseconds / 6000)
        const seconds = Math.floor((timeMilliseconds % 6000) / 100)
        const milliseconds = ((timeMilliseconds % 60000) % 100)
        const currentTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + ':' + (milliseconds < 10 ? '0' : '') + milliseconds

        return currentTime
    }
}

let timer = new Timer(onUpdateUI)

const minMaxHighlight = () => {

    let min = Math.min.apply(Math, Object.values(timer.lapDiff))
    let max = Math.max.apply(Math, Object.values(timer.lapDiff))

    Object.entries(timer.lapDiff).map(([key, value]) => {
        if(value === min && Object.keys(timer.lapDiff).length > 1) {
            document.getElementById(key).style.color='green'
        } else if(value === max && Object.keys(timer.lapDiff).length > 1) {
            document.getElementById(key).style.color='red'
        } else {
            document.getElementById(key).style.color='white'
        }
    })
}

const updateDisplay = () => {
    const currentTime = timer.formatTime(timer.timeElapsed)
    document.getElementById('display').innerHTML = currentTime
}

const updateTableTimer = () => {
    const currentTime = timer.formatTime(timer.lapTimer)

    let currentLap = document.getElementById('lapTable').rows.length ? document.getElementById('lapTable').rows.length : 1 

    if(document.getElementById('lapTable').rows.length < 1) {
        document.getElementById('lapTable').insertRow(0)
        document.getElementById('lapTable').rows[0].insertCell(0).innerHTML = 'Lap ' + currentLap
        document.getElementById('lapTable').rows[0].insertCell(1).innerHTML = currentTime
     } else {
        document.getElementById('lapTable').rows[0].cells[0].innerHTML = 'Lap ' + currentLap
        document.getElementById('lapTable').rows[0].cells[1].innerHTML = currentTime
     }
}

function onUpdateUI() {
    minMaxHighlight()
    updateDisplay()
    updateTableTimer()
}