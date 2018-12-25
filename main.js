var timer = document.getElementById("timer");
timer.innerText = "00:00.00";

console.log(timer.innerText);



var min = document.getElementById("min");
var sec = document.getElementById("sec");
var reset = document.getElementById("reset");
var start = document.getElementById("start");


var isRunning = false;


var startTime;
var timeLeft;
var timeToCountDown = 0;
var currentTime = Date.now();
var countStop;


function updateTimer(t) {
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    ms = (ms < 100) ? "0" + ms : ms;
    timer.innerText = m + ":" + s + "." + ms;
};

function countDown() {
    countStop = setTimeout(
        function () {
            var elapsedTime = Date.now() - startTime;
            timeLeft = timeToCountDown - elapsedTime;
            updateTimer(timeLeft);
            countDown();
            if (timeLeft <= 0) {
                isRunning = false;
                start.innerText = "start";
                clearTimeout(countStop);
                timeLeft = 0;
                timeToCountDown = 0;
                updateTimer(0);
                return;
            }
        }, 10);
}
start.addEventListener("click", function () {
    if (isRunning === false) {
        isRunning = true;
        start.innerText = "stop";
        startTime = Date.now();
        countDown();
    } else {
        isRunning = false;
        start.innerText = "start";
        timeToCountDown = timeLeft;
        clearTimeout(countStop);
    }
});





min.addEventListener("click", () => {
    if (isRunning === true) {
        return;
    }
    if (timeToCountDown >= 60 * 60 * 1000) {
        timeToCountDown = 0;
    }
    timeToCountDown += 60 * 1000;
    updateTimer(timeToCountDown);
});

sec.addEventListener("click", () => {
    if (isRunning === true) {
        return;
    }
    timeToCountDown += 1 * 1000;
    updateTimer(timeToCountDown);


});

reset.addEventListener("click", () => {
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
});


// for (i = 0; i < btns.length; i++) {

// }