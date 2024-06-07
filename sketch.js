const G = 6.67e-11;

let balls = [];

const timeScale = 0.1;
const forceTimescale = 0.02;

const LIL_BOLS = 2;

const LIL_BOL_ACC = 1e-5;
const LIL_BOL_VEL = 1e-5;

const ORIGINAL_MASS = 5e10;
const INCREASED_MASS = 1e11;

const ACC_MAG = 1e5;
const VEL_MAG = 100;

function setup() {
  balls = [
    {
      p: createVector(mouseX, mouseY),
      v: createVector(0, 0),
      a: createVector(0, 0),
      m: ORIGINAL_MASS,
      r: 0,
    },
    {
      p: createVector(windowWidth / 2, windowHeight / 2),
      v: createVector(0.001, 0),
      a: createVector(0, 0),
      m: 5e3,
      r: 20,
    },
    ...new Array(LIL_BOLS).fill(null).map(lilBol),
  ];
  createCanvas(windowWidth, windowHeight);
  background(220);
  angleMode(DEGREES);
}

function outX(x) {
  return x < 0 || x > windowWidth;
}

function outY(y) {
  return y < 0 || y > windowHeight;
}

function stopBall(i) {
  balls[i].a.x = balls[i].a.y = balls[i].v.x = balls[i].v.y = 0;
  balls[i].stop = true;
}

function updateCircle(i) {
  if (!balls[i]) return;

  for (let j = 0; j < balls.length; j++) {
    if (i === j || !balls[j] || balls[j].stop) continue;
    const d = p5.Vector.sub(balls[j].p, balls[i].p);
    const dist = d.mag();
    if (dist < balls[j].r + balls[i].r) {
      if (i !== 0 && j !== 0) {
        stopBall(i);
        stopBall(j);
      }
    } else {
      const f = F(dist, balls[i].m, balls[j].m) * deltaTime * forceTimescale;
      const norm = d.normalize();
      balls[i].a.add(norm.mult(f).div(balls[i].m));
    }
  }

  if (!balls[i].stop) {
    balls[i].v.add(p5.Vector.mult(balls[i].a, deltaTime * timeScale));
    balls[i].p.add(p5.Vector.mult(balls[i].v, deltaTime * timeScale));
  }

  // if (outX(balls[i].p.x) || outY(balls[i].p.y)) {
  //   balls[i] = null;
  //   return;
  // }

  drawCircle(i);
}

function drawCircle(i) {
  const { v, a, p, r } = balls[i];
  {
    stroke("magenta");
    strokeWeight(1);
    line(p.x, p.y, p.x + VEL_MAG * v.x, p.y + VEL_MAG * v.y);
  }
  {
    stroke("blue");
    strokeWeight(1);
    line(p.x, p.y, p.x + ACC_MAG * a.x, p.y + ACC_MAG * a.y);
  }
  noStroke();
  circle(p.x, p.y, r * 2);
}

function draw() {
  background(220);
  balls[0].p.x = mouseX;
  balls[0].p.y = mouseY;
  for (let i = 1; i < balls.length; i++) {
    updateCircle(i);
  }
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === 32) {
    balls[1].p.x = windowWidth / 2;
    balls[1].p.y = windowHeight / 2;
  } else if (keyCode == 8) {
    balls[1].v.mult(0.5);
    balls[1].a.mult(0.5);
  }

  return false;
}

function F(d, m1, m2) {
  return (G * m1 * m2) / (d * d);
}

function lilBol() {
  return {
    p: createVector(random(0, windowWidth), random(0, windowHeight)),
    v: p5.Vector.random2D().normalize().mult(LIL_BOL_VEL),
    a: p5.Vector.random2D().normalize().mult(LIL_BOL_ACC),
    m: 5e1,
    r: 10,
  };
}

function mousePressed() {
  balls[0].m = INCREASED_MASS;
}

function mouseRelease() {
  balls[0].m = ORIGINAL_MASS;
}
