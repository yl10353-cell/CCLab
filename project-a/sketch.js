let phase = 0;
let ball1X, ball1Y, ball2X, ball2Y;
let ball1SpeedX, ball1SpeedY, ball2SpeedX, ball2SpeedY;
let color1R, color1G, color1B;
let color2R, color2G, color2B;

let greenX, greenY;
let greenSize = 10;
let greenTargetSize = 50;
let greenVX = 2.5;

let disappearTimer;
let isShrinking = false;

let topR, topG, topB, botR, botG, botB;
let isRaining = false;

let obs1X, obs1Y, obs1VX, obs1VY, obs1Active;
let obs2X, obs2Y, obs2VX, obs2VY, obs2Active;
let obs3X, obs3Y, obs3VX, obs3VY, obs3Active;

function resetRound() {
    ball1X = random(50, 150);
    ball1Y = random(100, height - 100);
    ball2X = random(width - 150, width - 50);
    ball2Y = random(100, height - 100);

    ball1SpeedX = random(0.5, 1.5);
    ball1SpeedY = random(-1, 1);
    ball2SpeedX = random(-1.5, -0.5);
    ball2SpeedY = random(-1, 1);

    color1R = random(100, 255);
    color1G = random(100, 255);
    color1B = random(100, 255);
    color2R = random(100, 255);
    color2G = random(100, 255);
    color2B = random(100, 255);

    phase = 0;
    isShrinking = false;
    greenSize = 10;

    obs1X = random(100, width - 100);
    obs1Y = random(100, height - 100);
    obs1VX = random(0.2, 0.6);
    obs1VY = random(0.2, 0.6);
    if (random() < 0.5) obs1VX = -obs1VX;
    if (random() < 0.5) obs1VY = -obs1VY;
    obs1Active = true;

    obs2X = random(100, width - 100);
    obs2Y = random(100, height - 100);
    obs2VX = random(0.2, 0.6);
    obs2VY = random(0.2, 0.6);
    if (random() < 0.5) obs2VX = -obs2VX;
    if (random() < 0.5) obs2VY = -obs2VY;
    obs2Active = true;

    obs3Y = random(100, height - 100);
    obs3VX = random(0.2, 0.6);
    obs3VY = random(0.2, 0.6);
    if (random() < 0.5) obs3VX = -obs3VX;
    if (random() < 0.5) obs3VY = -obs3VY;
    obs3Active = true;
}

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    resetRound();
    setRandomBackground();
}

function draw() {
    for (let y = 0; y < height; y++) {
        let amt = map(y, 0, height, 0, 1);
        stroke(lerp(topR, botR, amt), lerp(topG, botG, amt), lerp(topB, botB, amt));
        line(0, y, width, y);
    }


    fill(30, 40, 100);
    rect(70, 80, 60, 70);
    fill(220, 60, 60);
    triangle(50, 80, 150, 80, 100, 20);
    noStroke();

    if (isRaining) {
        stroke(3, 169, 244);
        noFill();
        for (let x = 0; x < width; x += 8) {
            for (let y = 0; y < height; y += 15) {
                let n = noise(x * 0.02, y * 0.02 + frameCount * 0.03);
                let len = map(n, 0, 1, 5, 10);
                line(x, y, x, y + len);
            }
        }
    }

    if (phase === 0) {
        if (obs1Active) {
            obs1X = obs1X + obs1VX;
            obs1Y = obs1Y + obs1VY;
            if (obs1X < 15 || obs1X > width - 15) obs1VX = -obs1VX;
            if (obs1Y < 15 || obs1Y > height - 15) obs1VY = -obs1VY;

            fill(100, 255, 100);
            circle(obs1X, obs1Y, 30);

            let d1 = dist(ball1X, ball1Y, obs1X, obs1Y);
            let d2 = dist(ball2X, ball2Y, obs1X, obs1Y);
            if (d1 < 40) {
                color1R = random(100, 255);
                color1G = random(100, 255);
                color1B = random(100, 255);
                obs1Active = false;
            } else if (d2 < 40) {
                color2R = random(100, 255);
                color2G = random(100, 255);
                color2B = random(100, 255);
                obs1Active = false;
            }
        }

        if (obs2Active) {
            obs2X = obs2X + obs2VX;
            obs2Y = obs2Y + obs2VY;
            if (obs2X < 15 || obs2X > width - 15) obs2VX = -obs2VX;
            if (obs2Y < 15 || obs2Y > height - 15) obs2VY = -obs2VY;

            fill(255, 100, 100);
            square(obs2X - 15, obs2Y - 15, 30);

            let d1 = dist(ball1X, ball1Y, obs2X, obs2Y);
            let d2 = dist(ball2X, ball2Y, obs2X, obs2Y);
            if (d1 < 40) {
                ball1SpeedX = ball1SpeedX * 1.8;
                ball1SpeedY = ball1SpeedY * 1.8;
                obs2Active = false;
            } else if (d2 < 40) {
                ball2SpeedX = ball2SpeedX * 1.8;
                ball2SpeedY = ball2SpeedY * 1.8;
                obs2Active = false;
            }
        }

        if (obs3Active) {
            obs3X = obs3X + obs3VX;
            obs3Y = obs3Y + obs3VY;
            if (obs3X < 15 || obs3X > width - 15) obs3VX = -obs3VX;
            if (obs3Y < 15 || obs3Y > height - 15) obs3VY = -obs3VY;

            fill(100, 100, 255);
            triangle(
                obs3X, obs3Y - 15,
                obs3X - 15, obs3Y + 15,
                obs3X + 15, obs3Y + 15
            );

            let d1 = dist(ball1X, ball1Y, obs3X, obs3Y);
            let d2 = dist(ball2X, ball2Y, obs3X, obs3Y);
            if (d1 < 40) {
                ball1SpeedX = ball1SpeedX * 0.4;
                ball1SpeedY = ball1SpeedY * 0.4;
                obs3Active = false;
            } else if (d2 < 40) {
                ball2SpeedX = ball2SpeedX * 0.4;
                ball2SpeedY = ball2SpeedY * 0.4;
                obs3Active = false;
            }
        }

        ball1X = ball1X + ball1SpeedX;
        ball1Y = ball1Y + ball1SpeedY;
        ball2X = ball2X + ball2SpeedX;
        ball2Y = ball2Y + ball2SpeedY;

        if (ball1X < 25 || ball1X > width - 25) ball1SpeedX = -ball1SpeedX;
        if (ball1Y < 25 || ball1Y > height - 25) ball1SpeedY = -ball1SpeedY;
        if (ball2X < 25 || ball2X > width - 25) ball2SpeedX = -ball2SpeedX;
        if (ball2Y < 25 || ball2Y > height - 25) ball2SpeedY = -ball2SpeedY;

        let d1mouse = dist(mouseX, mouseY, ball1X, ball1Y);
        let d2mouse = dist(mouseX, mouseY, ball2X, ball2Y);
        if (d1mouse < 100) {
            ball1X = ball1X + (mouseX - ball1X) * 0.05;
            ball1Y = ball1Y + (mouseY - ball1Y) * 0.05;
        }
        if (d2mouse < 100) {
            ball2X = ball2X + (mouseX - ball2X) * 0.05;
            ball2Y = ball2Y + (mouseY - ball2Y) * 0.05;
        }

        fill(color1R, color1G, color1B, 220);
        circle(ball1X, ball1Y, 50);
        fill(color2R, color2G, color2B, 220);
        circle(ball2X, ball2Y, 50);

        if (dist(ball1X, ball1Y, ball2X, ball2Y) < 50) {
            phase = 1;
            greenX = (ball1X + ball2X) / 2;
            greenY = (ball1Y + ball2Y) / 2;
            disappearTimer = millis();
            isShrinking = true;
        }
    }
    else if (phase === 1) {
        let elapsed = (millis() - disappearTimer) / 1000;
        let size1 = map(elapsed, 0, 5, 50, 0);
        let size2 = map(elapsed, 0, 5, 50, 0);
        size1 = max(0, size1);
        size2 = max(0, size2);

        if (size1 > 0) {
            fill(color1R, color1G, color1B, 200);
            circle(ball1X, ball1Y, size1);
        }
        if (size2 > 0) {
            fill(color2R, color2G, color2B, 200);
            circle(ball2X, ball2Y, size2);
        }

        greenSize = map(elapsed, 0, 5, 10, 50);
        greenSize = min(greenSize, 50);

        let dGreen = dist(mouseX, mouseY, greenX, greenY);
        if (dGreen < 100) {
            greenX = greenX + (mouseX - greenX) * 0.05;
            greenY = greenY + (mouseY - greenY) * 0.05;
        }

        fill(120, 220, 180, 230);
        circle(greenX, greenY, greenSize);

        if (elapsed >= 5) {
            phase = 2;
        }
    }

    else if (phase === 2) {
        greenX = greenX + greenVX;
        greenY = greenY + sin(frameCount * 0.05) * 2;
        fill(120, 220, 180, 230);
        circle(greenX, greenY, 50);

        if (greenX > width + 50) {
            resetRound();
        }
    }
}

function mousePressed() {
    setRandomBackground();
    isRaining = random() < 0.5;
}

function setRandomBackground() {
    topR = random(200, 255);
    topG = random(200, 255);
    topB = random(200, 255);
    botR = random(200, 255);
    botG = random(200, 255);
    botB = random(200, 255);
}