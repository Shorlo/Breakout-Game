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
let brickHeight = 18;
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

// Draw paddle
function drawPaddle()
{
    context.beginPath();
    context.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    context.fillStyle = '#333';
    context.fill();
    context.closePath();
}

// Draw ball
function drawBall()
{
    context.beginPath();
    context.arc(x, y, ballradius, 0, Math.PI * 2);
    context.fillStyle = '#333';
    context.fill();
    context.closePath();
}

// Draw bricks
function drawBricks()
{
    for(let c = 0; c < columnCount; c++)
    {
        for(let r = 0; r < rowCount; r ++)
        {
            if(bricks[c][r].staus === 1)
            {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = bricksX;
                bricks[c][r].y = bricksY;
                context.beginPath();
                context.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                context.fillStyle = '#333';
                context.fill();
                context.closePath();
            }
        }
        
    }
}

// Track score
function trackScore()
{
    context.font = 'bold 16px sans-serif';
    context.fillStyle = '#333';
    context.fillText('Score: '+ score, 8, 24);
}

// Check ball hit bricks
function hitDetection()
{
    for(let c = 0; c < columnCount; c++)
    {
        for(let r = 0; r < rowCount; r++)
        {
            let b = bricks[c][r];
            if(b.status === 1)
            {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
                {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    // Check win
                    if(score === rowCount * columnCount)
                    {
                        alert('You win!!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Main function
function init()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // Detect right and left walls
    if(x + dx > canvas.width - ballradius || x + dx < ballradius)
    {
        dx = -dx;
    }

    // Detect top wall
    if(y + dy < ballradius)
    {
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballradius)
    {
        //Detect paddle hits
        if(x > paddleX && paddleX + paddleWidth)
        {
            dy = -dy;
        }
        else
        {
            // If ball don't hit paddle
            alert('Game Over!');
            document.location.reload();
        }
    }
    
    // Bottom wall
    if(y + dy > canvas.height - ballradius || y + dy < ballradius)
    {
        dy = -dy;
    }

    // Move Ball
    x += dx;
    y += dy;
}

setInterval(init, 10);