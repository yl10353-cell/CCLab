let controlSystem;
let messages = [];

function setup() {
  createCanvas(600, 400);
  controlSystem = new ControlSystem();
}

function draw() {
  background(240);

  controlSystem.update();
  controlSystem.display();

  drawMessages();
}

function mousePressed() {
  controlSystem.registerInteraction(mouseX, mouseY);
}

class Message {
  constructor(text) {
    this.text = text;
  }

  display(x, y) {
    fill(0);
    rect(x, y, 220, 30, 10);

    fill(255);
    textSize(12);
    text(this.text, x + 10, y + 18);
  }
}


function drawMessages() {
  let startY = height - 40;

  for (let i = messages.length - 1; i >= 0; i--) {
    let y = startY - (messages.length - 1 - i) * 40;
    messages[i].display(20, y);
  }
}


class ControlSystem {
  constructor() {
    this.interactionCount = 0;
    this.autonomyLevel = 0;
    this.autoTimer = 0;
  }

  update() {
    this.autonomyLevel = this.interactionCount * 0.05;
    if (this.autonomyLevel > 1) this.autonomyLevel = 1;

    this.autoTimer++;

    if (this.autoTimer > 60) {
      this.generateAutoMessage();
      this.autoTimer = 0;
    }

    if (this.autonomyLevel > 0.7) {
      this.fakeCursorMovement();
    }
  }

  display() {
    fill(0);
    textSize(14);

    text("Autonomy: " + this.autonomyLevel, 20, 20);

    if (this.autonomyLevel < 0.3) {
      text("Normal system", 20, 40);
    } else if (this.autonomyLevel < 0.7) {
      text("System getting busy...", 20, 40);
    } else {
      text("System taking control!", 20, 40);
    }
  }

  registerInteraction(x, y) {
    this.interactionCount++;

    let responses = [
      "Opened",
      "Viewed",
      "Loading..."
    ];

    messages.push(new Message(random(responses)));

    this.limitMessages();
  }

  generateAutoMessage() {
    let early = [
      "Recommended for you",
      "Trending now",
      "New notification"
    ];

    let middle = [
      "You were just looking at this",
      "Keep scrolling?",
      "You might like this"
    ];

    let late = [
      "I know what you want",
      "No need to click",
      "I’ll choose for you"
    ];

    let text;

    if (this.autonomyLevel < 0.3) {
      text = random(early);
    } else if (this.autonomyLevel < 0.7) {
      text = random(middle);
    } else {
      text = random(late);
    }

    messages.push(new Message(text));

    this.limitMessages();
  }

  limitMessages() {
    if (messages.length > 8) {
      messages.shift();
    }
  }

  fakeCursorMovement() {
    let x = mouseX + random(-10, 10);
    let y = mouseY + random(-10, 10);

    fill(255, 0, 0);
    ellipse(x, y, 10);
  }
}