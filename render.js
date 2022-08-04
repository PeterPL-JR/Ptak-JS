function renderWalls() {
    ctx.fillStyle = foreground;
    ctx.fillRect(0, 0, WIDTH, WALL_HEIGHT);
    ctx.fillRect(0, HEIGHT, WIDTH, -WALL_HEIGHT);
}

function renderSpikes() {
    var xOffset = (WIDTH - SPIKES_WIDTH) / 2;
    var yOffset = (HEIGHT - SPIKES_HEIGHT) / 2;

    for(var x = 0; x < X_SPIKES; x++) {
        var spikeX = xOffset + x * SPIKE_SIZE + SPIKES_OFFSET * x;

        drawSpikeX([spikeX, WALL_HEIGHT], SPIKE_SIZE, SPIKE_LENGTH, foreground);
        drawSpikeX([spikeX, HEIGHT - WALL_HEIGHT], SPIKE_SIZE, -SPIKE_LENGTH, foreground);
    }

    for(var y = 0; y < Y_SPIKES; y++) {
        var spikeY = yOffset + y * SPIKE_SIZE + WALL_HEIGHT;
        drawSpikeY([0, spikeY], SPIKE_SIZE, SPIKE_LENGTH, foreground);
        drawSpikeY([WIDTH, spikeY], SPIKE_SIZE, -SPIKE_LENGTH, foreground);
    }
}

function fillPolygon(vertex, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(vertex[0][0], vertex[0][1]);
    for(var v = 1; v < vertex.length; v++) {
        ctx.lineTo(vertex[v][0], vertex[v][1]);
    }
    ctx.fill();
    ctx.stroke();
}
function drawSpikeX(pos, width, height, color) {
    var begin = pos;
    var end = [pos[0] + width, pos[1]];
    var corner = [begin[0] + width / 2, pos[1] + height];
    fillPolygon([begin, end, corner], color);
}
function drawSpikeY(pos, height, width, color) {
    var begin = pos;
    var end = [pos[0], pos[1] + height];
    var corner = [begin[0] + width, pos[1] + height / 2];
    fillPolygon([begin, end, corner], color);
}
