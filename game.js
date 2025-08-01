const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  color: "#333",
  dy: 0,
  onGround: false
};

let gravity = 0.5;
let jumpPower = -12;
let keys = {};

let platforms = [
  { x: 50, y: 300, width: 200, height: 10 },
  { x: 300, y: 500, width: 200, height: 10 },
  { x: 600, y: 400, width: 150, height: 10 }
];

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = "#888";
  for (let p of platforms) {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  }
}

function checkCollision(p) {
  return player.y + player.height <= p.y &&
         player.y + player.height + player.dy >= p.y &&
         player.x + player.width > p.x &&
         player.x < p.x + p.width;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.dy += gravity;
  player.y += player.dy;
  player.onGround = false;

  for (let p of platforms) {
    if (checkCollision(p)) {
      player.y = p.y - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  }

  if (keys["ArrowLeft"]) player.x -= 5;
  if (keys["ArrowRight"]) player.x += 5;
  if (keys["Space"] && player.onGround) {
    player.dy = jumpPower;
    player.onGround = false;
  }

  // 边界限制
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y > canvas.height) player.y = canvas.height - player.height;

  drawPlatforms();
  drawPlayer();

  requestAnimationFrame(update);
}

update();
