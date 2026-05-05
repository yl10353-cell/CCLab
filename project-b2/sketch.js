let messages = [];
let finalLines = [
  "When did you drink water last time?",
  "When did you go outside last time?",
  "When did you hug someone last time?",
];
let clickCount = 0;
let offCount = 0;
let stage = 1;
let powerOff = false;

let btnX = 560;
let btnY = 300;
let btnW = 20;
let btnH = 80;
let lastX = 0;
let lastY = 0;
let visibleLines = 0;
let counter = 0;
let autoCounter = 0;
let suggestedCounter = 0;

function setup() {
  createCanvas(600, 800);
  lastX = mouseX;
  lastY = mouseY;
}

function draw() {
  if (powerOff) {
    if (offCount === 1) {
      drawGradientBackground();

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text("Take a break", width / 2, height / 2);
      return;
    }

    if (offCount === 2) {
      drawGradientBackground();

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(26);
      text("The world is bigger than this screen", width / 2, height / 2 - 20);

      textSize(18);
      text("Go outside. Look up. Breathe.", width / 2, height / 2 + 30);
      return;
    }
    if (offCount >= 3) {
      for (let y = 0; y < height; y++) {
        let c = map(y, 0, height, 100, 255);
        stroke(c, 200, 255);
        line(0, y, width, y);
      }

      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(28);
      text("There's more beyond the screen", width / 2, height / 2);

      return;
    }
  }
  if (powerOff) {
    background(0);

    fill(150);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Still there?", width / 2, height / 2);
  } else {
    stage = 1;
    if (clickCount > 10) stage = 2;
    if (clickCount > 16) stage = 3;
    if (clickCount > 21) stage = 4;

    if (stage !== 4) {
      visibleLines = 0;
    }
    if (stage === 4) {
      background(0);

      for (let i = 0; i < 150; i++) {
        fill(random(255));
        rect(random(width), random(height), 5, 5);
      }
      fill(255);
      textAlign(CENTER, CENTER);

      textSize(30);
      text("System Taking Over", width / 2, height / 2 - 80);

      textSize(14);

      counter++;

      if (counter > 60) {
        counter = 0;

        if (visibleLines < finalLines.length) {
          visibleLines++;
        }
      }

      for (let i = 0; i < visibleLines; i++) {
        text(finalLines[i], width / 2, height / 2 - 20 + i * 30);
      }
    } else {
      background(230, 240, 255);

      fill(255, 255, 255, 40);
      ellipse(width / 2, height / 2, 400);

      drawInterface();
      drawButton();
      if (stage >= 2) {
        suggestedCounter++;

        if (suggestedCounter > 100) {
          addMessage(random(70, 530), random(130, 670), "Suggested");
          suggestedCounter = 0;
        }
      }

      if (stage === 3) {
        autoCounter++;

        if (autoCounter > 30) {
          addMessage(random(70, 530), random(130, 670), "Auto message");
          autoCounter = 0;
        }
      }

      displayMessages();

      if (stage >= 2) {
        fill(255, 0, 0, 20);
        rect(0, 0, width, height);
      }
    }
  }
}

function mousePressed() {
  if (overButton()) {
    powerOff = !powerOff;

    if (powerOff === true) {
      offCount++;
    }
  } else {
    if (powerOff === true) {
      let newMessages = [];

      let start = messages.length - 5;
      if (start < 0) start = 0;

      for (let i = start; i < messages.length; i++) {
        newMessages.push(messages[i]);
      }

      messages = newMessages;

      clickCount = 0;
      powerOff = false;

      lastX = mouseX;
      lastY = mouseY;

      return;
    }

    powerOff = false;

    clickCount++;

    if (stage === 1) {
      addMessage(mouseX, mouseY, "You clicked");
    } else if (stage === 2) {
      addMessage(mouseX, mouseY, randomText());
      addMessage(random(70, 530), random(130, 670), "More");
    } else {
      for (let i = 0; i < 3; i++) {
        addMessage(random(70, 530), random(130, 670), "Stop");
      }
      clickCount++;
    }
  }
}

function mouseWheel() {
  if (!powerOff) {
    addMessage(random(70, 530), random(130, 670), "Keep scrolling");
  }
}

function mouseMoved() {
  let d = dist(mouseX, mouseY, lastX, lastY);

  if (powerOff) return;

  if (stage < 2) return;

  if (d <= 50) return;

  addMessage(mouseX, mouseY, "We see you");

  lastX = mouseX;
  lastY = mouseY;
}
function overButton() {
  if (mouseX > btnX) {
    if (mouseX < btnX + btnW) {
      if (mouseY > btnY) {
        if (mouseY < btnY + btnH) {
          return true;
        }
      }
    }
  }
  return false;
}

function drawInterface() {
  fill(30);
  rect(40, 80, 520, 640, 30);

  fill(255);
  rect(60, 110, 480, 580, 20);

  fill(220);
  rect(60, 110, 480, 40, 20);

  fill(50);
  rect(width / 2 - 40, 90, 80, 10, 5);

  textAlign(CENTER, CENTER);
  if (stage === 1) {
    fill(0);
    textSize(16);
    text("User in control", width / 2, 130);
  }

  if (stage === 2) {
    fill(200, 0, 0);
    textSize(20);
    text("System responding...", width / 2, 130);
  }

  if (stage === 3) {
    fill(255, 0, 0);
    textSize(26);
    text("System interfering...", width / 2, 130);
  }
}

function drawButton() {
  fill(80);
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("OFF", btnX + btnW / 2, btnY + btnH / 2);
}

function addMessage(x, y, txt) {
  let s = 12;
  let c = color(0);

  if (stage >= 2) {
    s = random(14, 22);
    c = color(0);
  }

  if (txt === "We see you") {
    s = random(28, 50);
    c = color(random(255), 0, 0);
  }

  if (stage === 3) {
    s = random(18, 35);
    c = color(random(255), random(100), random(100));
  }

  let screenX = constrain(x, 70, 530);
  let screenY = constrain(y, 130, 670);

  messages.push({
    x: screenX,
    y: screenY,
    text: txt,
    size: s,
    col: c,
  });
}

function displayMessages() {
  for (let m of messages) {
    fill(m.col);
    textSize(m.size);
    text(m.text, m.x, m.y);
  }
}

function randomText() {
  let t = ["Recommended", "New", "Trending", "Stay", "Watch"];
  return random(t);
}
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let r = map(y, 0, height, random(100, 200), random(200, 255));
    let g = map(y, 0, height, random(100, 200), random(200, 255));
    let b = map(y, 0, height, random(150, 255), random(200, 255));
    stroke(r, g, b);
    line(0, y, width, y);
  }
  noStroke();
}
