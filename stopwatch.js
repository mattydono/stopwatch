// units

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

// display unit

let displayMilliseconds = 0;
let displaySeconds = 0;
let displayMinutes = 0;

let interal = null;

let clockStatus= 'stopped';

// stopwatch - timer

function stopwatch() {
    milliseconds++;
    if(milliseconds / 100 === 1) {
        milliseconds = 0;
        seconds++;
        if(seconds / 60 === 1) {
            seconds = 0;
            minutes++;
        }
    }

    if(milliseconds < 10) {
        displayMilliseconds = '0' + milliseconds.toString();
    } else {
        displayMilliseconds = milliseconds;
    }

    if(seconds < 10) {
        displaySeconds = '0' + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if(minutes < 10) {
        displayMinutes = '0' + minutes.toString()
    } else {
        displayMinutes = minutes;
    }

    document.getElementById('display').innerHTML = displayMinutes + ':' + displaySeconds + ':' + displayMilliseconds;
}

// startStop

function startStop() {
    if(clockStatus === 'stopped') {
        interval = window.setInterval(stopwatch, 10);
        document.getElementById('startStop').innerHTML = 'Stop';
        document.getElementById('lapReset').innerHTML = 'Lap';
        clockStatus = 'started'
    } else {
        window.clearInterval(interval);
        document.getElementById('startStop').innerHTML = 'Start';
        document.getElementById('lapReset').innerHTML = 'Reset';
        clockStatus = 'stopped';
    }
}

// lapReset

function lapReset() {
    if(clockStatus === 'started') {-
        addRow('lapTable');
    } else {
        window.clearInterval(interal);
        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        clockStatus = 'stopped';
        document.getElementById('display').innerHTML = '00:00:00';
        for(let i = document.getElementById('lapTable').rows.length - 1; i > -1; i--) {
            document.getElementById('lapTable').deleteRow(i);
        }

        // document.getElementById('lapTable').rows.map(row => {
        //     row.deleteRow()
        // })
    }
}

function addRow(tableId) {
    let tableRef = document.getElementById(tableId);
    let newRow = tableRef.insertRow(-1);
    let newLapCell = newRow.insertCell(0);
    let newTimeCell = newRow.insertCell(1);
    let lapText = document.createTextNode('Lap')
    let timeText = document.createTextNode(displayMinutes + ':' + displaySeconds + ':' + displayMilliseconds);
    newTimeCell.appendChild(timeText);
    newLapCell.appendChild(lapText);
}