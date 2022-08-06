const PLAYER_IMG_WIDTH = 269;
const PLAYER_IMG_HEIGHT = 157;

const TEX_CHANGE_SPEED = 40;
const SCALE = 3;
const _TEXTURES = 3;

const PLAYER_WIDTH = Math.floor(PLAYER_IMG_WIDTH / SCALE);
const PLAYER_HEIGHT = Math.floor(PLAYER_IMG_HEIGHT / SCALE);

var playerX = WIDTH / 2 - PLAYER_WIDTH / 2;
var playerY = 100;

const textures = [];
var texIndex = 0;

var falling = false;
var fallingStartTime = 0;

const LEFT_SIDE = 0;
const RIGHT_SIDE = 1;

const LEFT_DIR = -1;
const RIGHT_DIR = 1;

function initPlayer() {
    startFalling();
    for (var i = 0; i < _TEXTURES; i++) {
        textures[i] = loadImage("player.png", i * PLAYER_IMG_WIDTH, 0, PLAYER_IMG_WIDTH, PLAYER_IMG_HEIGHT);
    }
}
function renderPlayer() {
    if(falling) {
        playerFalling();
    }
    
    var xFlip = getSide() == LEFT_SIDE;
    texIndex = (time % TEX_CHANGE_SPEED < TEX_CHANGE_SPEED / 2) ? 0 : 1;
    drawFlippedImage(textures[texIndex], playerX, playerY, PLAYER_WIDTH + 1, PLAYER_HEIGHT, xFlip);
}

const BASIC_SPEED = 1.8;
const ACCELERATION = 0.3;
const FALLING_DEG_ANGLE = 10;

const TIME_LENGTH_S = 1 / 60;
const PLAYER_HEIGHT_M = 0.06;

var startHeight, A;
var startPlayerX, startPlayerY;

function startFalling() {
    falling = true;
    fallingStartTime = time;

    startPlayerX = playerX;
    startPlayerY = playerY;

    const tg = Math.tan((FALLING_DEG_ANGLE) * Math.PI / 180);
    startHeight = HEIGHT - playerY;

    const target = tg * startHeight;
    A = -startHeight / Math.pow(target, 2);
}

function playerFalling() {
    var fTime = time - fallingStartTime;
    var velocity = BASIC_SPEED + Math.pow(TIME_LENGTH_S * fTime, 2) * ACCELERATION;

    playerX += velocity * getDir();
    playerY = startPlayerY + Math.pow(playerX - startPlayerX, 2) * -A;
}