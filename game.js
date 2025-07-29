const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  yVelocity: 0,
  jumping: false,
  color: "#8e24aa", // Puedes cambiar el color o usar una imagen
};

let gravity = 1.5;
let obstacles = [];
let score = 0;
let gameSpeed = 4;

// Cambia esto por una imagen si quieres:
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle(obs) {
  ctx.fillStyle = "#d81b60"; // Cambia a imagen si quieres
  ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
}

function updatePlayer() {
  if (player.jumping) {
    player.yVelocity -= gravity;
    player.y -= player.yVelocity;
    if (player.y >= 150) {
      player.y = 150;
      player.jumping = false;
      player.yVelocity = 0;
    }
  }
}

function spawnObstacle() {
  const width = 20 + Math.random() * 20;
  obstacles.push({
    x: canvas.width,
    y: 160,
    width: width,
    height: 40,
  });
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= gameSpeed;
    drawObstacle(obstacles[i]);

    // Colisión
    if (
      player.x < obstacles[i].x + obstacles[i].width &&
      player.x + player.width > obstacles[i].x &&
      player.y < obstacles[i].y + obstacles[i].height &&
      player.y + player.height > obstacles[i].y
    ) {
      alert("¡Perdiste! Puntuación: " + score);
      document.location.reload();
    }
  }

  // Eliminar obstáculos que salieron
  obstacles = obstacles.filter(o => o.x + o.width > 0);
}

function updateScore() {
  score++;
  ctx.fillStyle = "#880e4f";
  ctx.font = "20px Arial";
  ctx.fillText("Puntos: " + score, 650, 30);
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !player.jumping) {
    player.jumping = true;
    player.yVelocity = 20;
  }
});

let frame = 0;
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  updatePlayer();
  updateObstacles();

  if (frame % 100 === 0) {
    spawnObstacle();
  }

  updateScore();
  frame++;
  requestAnimationFrame(gameLoop);
}

gameLoop();
