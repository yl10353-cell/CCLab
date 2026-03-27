/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YuqiLiangDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YuqiLiangDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(80, 150);
    this.offset = random(1000);
    this.col = color(30, 30, 30, 200);
    this.t = random(1000);
  }
  update() {
    this.x += map(noise(this.t), 0, 1, -1, 1);
    this.y += map(noise(this.t + 100), 0, 1, -1, 1);
    this.y += sin(frameCount * 0.05) * 0.5;
    this.t += 0.01;
  }
  display() {



    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    noStroke();
    let d = dist(mouseX, mouseY, this.x, this.y);
    let react = map(d, 0, 200, 1.5, 1, true);

    scale(react);
    fill(this.col);

    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.3) {
      let r = this.size * 0.4;
      let n = noise(cos(angle) + this.offset, sin(angle) + this.offset);
      let flow = map(n, 0, 1, -20, 20);

      let x = (r + flow) * cos(angle);
      let y = (r + flow) * sin(angle);

      vertex(x, y);
    }
    endShape(CLOSE);

    for (let i = 0; i < 6; i++) {
      let x = map(i, 0, 5, -this.size * 0.3, this.size * 0.3);

      let wave = sin(frameCount * 0.1 + i) * 10;

      fill(20, 20, 20, 180);
      ellipse(x, this.size * 0.3 + wave, this.size * 0.2, this.size * 0.4);
    }

    fill(0);
    ellipse(-10, -10, 10, 15);
    ellipse(10, -10, 10, 15);

    pop();
  }
  // ⬆️ draw your dancer above ⬆️
  // ******** //

  // the next function draws a SQUARE and CROSS
  // to indicate the approximate size and the center point
  // of your dancer.
  // it is using "this" because this function, too, 
  // is a part if your Dancer object.
  // comment it out or delete it eventually.

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}




/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/