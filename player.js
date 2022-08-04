const PLAYER_IMG_WIDTH = 269;
const PLAYER_IMG_HEIGHT = 157;

const TEX_CHANGE_SPEED = 40;
const SCALE = 3;
const _TEXTURES = 3;

const PLAYER_WIDTH = Math.floor(PLAYER_IMG_WIDTH / SCALE);
const PLAYER_HEIGHT = Math.floor(PLAYER_IMG_HEIGHT / SCALE);

var playerX = WIDTH / 2 - PLAYER_WIDTH / 2;
var playerY = HEIGHT / 2 - PLAYER_HEIGHT / 2;

const textures = [];
var texIndex = 0;

function initPlayer() {
    for(var i = 0; i < _TEXTURES; i++) {
        textures[i] = loadImage("player.png", i * PLAYER_IMG_WIDTH, 0, PLAYER_IMG_WIDTH, PLAYER_IMG_HEIGHT);
    }
}
function renderPlayer() {
    var xFlip = getSide() == 1;
    texIndex = (time % TEX_CHANGE_SPEED < TEX_CHANGE_SPEED / 2) ? 0 : 1;
    drawFlippedImage(textures[texIndex], playerX, playerY, PLAYER_WIDTH + 1, PLAYER_HEIGHT, xFlip);
}