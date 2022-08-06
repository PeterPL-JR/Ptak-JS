var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var time = 0;

const SPIKE_SIZE = 55;
const SPIKE_LENGTH = SPIKE_SIZE * 0.6;

const X_SPIKES = 7;
const Y_SPIKES = 11;

const WALL_HEIGHT = 40;
const SPIKES_OFFSET = 10;

const SPIKES_WIDTH = X_SPIKES * SPIKE_SIZE + SPIKES_OFFSET * (X_SPIKES - 1);
const SPIKES_HEIGHT = Y_SPIKES * SPIKE_SIZE + WALL_HEIGHT * 2;

const WIDTH = SPIKES_WIDTH + 60;
const HEIGHT = SPIKES_HEIGHT + 60;

var background = "#e5e5e5";
var foreground = "gray";

var maxSpikes = 3;
var spikes = [];

var points = 1;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    document.body.onkeydown = function (event) {
        if (event.key == "Enter") {
            if (!falling) {
                startFalling();
            }
        }
    }
    initPlayer();

    randomSpikes();
    draw();
}

function draw() {
    requestAnimationFrame(draw);
    time++;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    renderWalls();
    renderSpikes();

    renderPoints();
    renderPlayer();
}

function randomSpikes() {
    spikes[0] = [];
    spikes[1] = [];

    var activeSpikes = getRandomArray(Y_SPIKES).splice(0, maxSpikes).sort();
    for (var index of activeSpikes) {
        spikes[getSide()].push({ pos: index });
    }
}


function renderPoints() {
    var pointsFontSize = points < 100 ? 164 : 136;
    var pointsFontFamily = "monospace";

    var pointsText = (points < 10 ? "0" : "") + points;
    fillCircle(WIDTH / 2, HEIGHT / 2, 120, "white");

    ctx.textAlign = "center";
    ctx.fillStyle = background;
    ctx.font = "bold " + pointsFontSize + "px " + pointsFontFamily;

    var measure = ctx.measureText(pointsText);
    ctx.fillText(pointsText, WIDTH / 2, HEIGHT / 2 + (measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent) / 2);
}

function renderWalls() {
    ctx.fillStyle = foreground;
    ctx.fillRect(0, 0, WIDTH, WALL_HEIGHT);
    ctx.fillRect(0, HEIGHT, WIDTH, -WALL_HEIGHT);
}

function renderSpikes() {
    var xOffset = (WIDTH - SPIKES_WIDTH) / 2;
    var yOffset = (HEIGHT - SPIKES_HEIGHT) / 2;

    for (var x = 0; x < X_SPIKES; x++) {
        var spikeX = xOffset + x * SPIKE_SIZE + SPIKES_OFFSET * x;

        drawSpikeX([spikeX, WALL_HEIGHT], SPIKE_SIZE, SPIKE_LENGTH, foreground);
        drawSpikeX([spikeX, HEIGHT - WALL_HEIGHT], SPIKE_SIZE, -SPIKE_LENGTH, foreground);
    }

    var side = getSide();
    for (var spike of spikes[side]) {
        var spikeY = yOffset + spike.pos * SPIKE_SIZE + WALL_HEIGHT;

        if (side == LEFT_SIDE) drawSpikeY([0, spikeY], SPIKE_SIZE, SPIKE_LENGTH, foreground);
        else drawSpikeY([WIDTH, spikeY], SPIKE_SIZE, -SPIKE_LENGTH, foreground);
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(length) {
    const EFFICIENCY = 5;
    var array = [];
    for (var i = 0; i < length; i++) array.push(i);

    for (var i = 0; i < array.length * EFFICIENCY; i++) {
        var newArray = [];
        for (var j = 0; j < array.length; j++) {
            var rand = getRandom(0, 1);
            if (rand == 0) newArray.push(array[j]);
            else newArray.unshift(array[j]);
        }
        if (getRandom(0, 1) == 0) newArray.reverse();
        array = newArray;
    }
    return array;
}

function getSide() {
    return (points + 1) % 2;
}
function getDir() {
    var side = getSide();
    if (side == LEFT_SIDE) return LEFT_DIR;
    if (side == RIGHT_SIDE) return RIGHT_DIR;
}

function getDegrees(radians) {
    return radians * 180 / Math.PI;
}
function getRadians(degrees) {
    return degrees * Math.PI / 180;
}