let ghosts = [];
let rockets = [];

let ghostProgress = 0;
let prevMouseX = 0;
let prevMouseY = 0;

let rocketFrame = 0;
let isAnimating = false;
let rocketY;

function preload() {
  ghosts[0] = loadImage("Ghost_1.jpeg");
  ghosts[1] = loadImage("Ghost_2.jpeg");
  ghosts[2] = loadImage("Ghost_3.jpeg");

  rockets[0] = loadImage("Rocket_1.jpeg");
  rockets[1] = loadImage("Rocket_2.jpeg");
  rockets[2] = loadImage("Rocket_3.jpeg");
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  rocketY = height - 100;
}

function draw() {

  for (let y = 0; y < height; y++) {
    let c = lerpColor(
      color(200, 220, 255),
      color(255, 240, 250),
      y / height
    );
    stroke(c);
    line(0, y, width, y);
  }


  let d = dist(mouseX, mouseY, prevMouseX, prevMouseY);
  let isMoving = d > 1;

  prevMouseX = mouseX;
  prevMouseY = mouseY;


  let duration = 300;

  if (isMoving) {
    ghostProgress += 1 / duration;
  } else {
    ghostProgress -= 1 / duration;
  }

  ghostProgress = constrain(ghostProgress, 0, 1);

  let ghostFrame = floor(ghostProgress * ghosts.length);
  ghostFrame = constrain(ghostFrame, 0, ghosts.length - 1);

  image(ghosts[ghostFrame], mouseX, mouseY, 120, 120);

  image(rockets[rocketFrame], width / 2, rocketY, 150, 150);

  if (isAnimating) {
    if (rocketFrame < rockets.length - 1) {
      if (frameCount % 10 === 0) {
        rocketFrame++;
      }
    } else {
      rocketY -= 5;
    }
  }

  if (rocketY < -100) {
    rocketY = height - 100;
    rocketFrame = 0;
    isAnimating = false;
  }
}

function mousePressed() {
  isAnimating = true;
}