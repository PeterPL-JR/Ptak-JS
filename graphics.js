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
