const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    speed: 10, // Increased speed
    bullets: [],
    leftMagnum: {
        ammo: 6
    },
    rightMagnum: {
        ammo: 6
    }
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
    // Filter out enemies that are marked for removal
    enemies = enemies.filter(enemy => !enemy.toRemove);
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
    // Filter out bullets that are marked for removal
    player.bullets = player.bullets.filter(bullet => !bullet.toRemove);
}

function checkCollisions() {
    for (let bullet of player.bullets) {
        for (let enemy of enemies) {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                bullet.toRemove = true;
                enemy.toRemove = true;
                // Add explosion effect (for simplicity, just changing enemy color here)
                ctx.fillStyle = 'yellow';
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }
        }
    }
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

    checkCollisions();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 && player.x > 0) { // Left arrow key
        player.x -= player.speed;
    }
    if (event.keyCode === 39 && player.x < canvas.width - player.width) { // Right arrow key
        player.x += player.speed;
    }
    if (event.keyCode === 90 && player.leftMagnum.ammo > 0) { // Z key for left Magnum
        player.leftMagnum.ammo--;
        const bullet = {
            x: player.x,
            y: player.y,
            width: 10,
            height: 20,
            speed: 5
        };
        player.bullets.push(bullet);
    }
    if (event.keyCode === 88 && player.rightMagnum.ammo > 0) { // X key for right Magnum
        player.rightMagnum.ammo--;
        const bullet = {
            x: player.x + player.width,
            y: player.y,
            width: 10,
            height: 20,
            speed: 5
        };
        player.bullets.push(bullet);
    }
    if (event.keyCode === 82) { // R key to reload both Magnums
        player.leftMagnum.ammo = 6;
        player.rightMagnum.ammo = 6;
    }
});

setInterval(spawnEnemy, 2000);
gameLoop();
