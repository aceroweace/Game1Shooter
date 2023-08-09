const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    speed: 5,
    bullets: []
};

const enemies = [];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    ctx.fillStyle = 'red';
    for (let enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}

function updateEnemies() {
    for (let enemy of enemies) {
        enemy.y += enemy.speed;
    }
}

function drawBullets() {
    ctx.fillStyle = 'green';
    for (let bullet of player.bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

function updateBullets() {
    for (let bullet of player.bullets) {
        bullet.y -= bullet.speed;
    }
    player.bullets = player.bullets.filter(bullet => bullet.y > 0);
}

function spawnEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 30,
        speed: 2
    };
    enemies.push(enemy);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
    drawBullets();

    updateEnemies();
    updateBullets();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 && player.x > 0) { // Left arrow key
        player.x -= player.speed;
    }
    if (event.keyCode === 39 && player.x < canvas.width - player.width) { // Right arrow key
        player.x += player.speed;
    }
    if (event.keyCode === 32) { // Space key
        const bullet = {
            x: player.x + player.width / 2 - 5,
            y: player.y,
            width: 10,
            height: 20,
            speed: 5
        };
        player.bullets.push(bullet);
    }
});

setInterval(spawnEnemy, 2000);
gameLoop();
