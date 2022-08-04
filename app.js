var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

var background = "white";
var foreground = "gray";

var maxSpikes = 3;
var spikes = [];

var points = 1;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    render();
}

function render() {
    requestAnimationFrame(render);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    renderWalls();
    renderSpikes();
}