function fillPolygon(vertex, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(vertex[0][0], vertex[0][1]);
    for (var v = 1; v < vertex.length; v++) {
        ctx.lineTo(vertex[v][0], vertex[v][1]);
    }
    ctx.fill();
    ctx.stroke();
}

function fillCircle(x, y, radius, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}
function drawLine(xBegin, yBegin, xEnd, yEnd, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();

    ctx.moveTo(xBegin, yBegin);
    ctx.lineTo(xEnd, yEnd);
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

function loadImage(path, xOffset = 0, yOffset = 0, width, height) {
    var img = document.createElement("img");
    img.src = path;

    imgObj = { image: img, xOffset, yOffset, width: img.width, height: img.height };

    if (width != null && height != null) {
        imgObj.width = width;
        imgObj.height = height;
    }
    return imgObj;
}

function drawImage(img, x, y, width, height) {
    ctx.drawImage(img.image, img.xOffset, img.yOffset, img.width, img.height, x, y, width, height);
}

function drawFlippedImage(img, x, y, width, height, xFlip, yFlip) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(xFlip ? -1 : 1, yFlip ? -1 : 1);

    drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
}

function drawRotatedImage(img, x, y, width, height, deg) {
    var radians = getRadians(deg);

    var translateX = x + width / 2;
    var translateY = y + height / 2;

    ctx.translate(translateX, translateY);
    ctx.rotate(radians);
    drawImage(img, -width / 2, -height / 2, width, height);

    ctx.rotate(-radians);
    ctx.translate(-translateX, -translateY);
}