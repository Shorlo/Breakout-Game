let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let ballradius = 9;
let x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

let paddleHeight = 12;
let paddleWidth = 72;

// Paddle start position
let paddleX = (canvas.width - paddleWidth) / 2;

// Bricks
let rowCount = 5;
let columnCount = 9;
let brickWidth = 54;
let bricksHeight = 18;
let brickPadding = 12;
let topOffset = 40;
let leftOffset = 33;
let score = 0;

// Bricks array
let bricks = [];
for(let c = 0; c < columnCount; c++)
{
    bricks[c] = [];
    for(let r = 0; r < rowCount; r++)
    {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

// Mouse moving eventListener and function
document.addEventListener("mousemove", mouseMoveHandler, false);

// Move paddle with mouse
function mouseMoveHandler(event)
{
    var relativeX = event.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width)
    {
        paddleHeight = relativeX - paddleWidth / 2;
    }
}
