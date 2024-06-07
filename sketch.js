const M1 =  500;
const M2 =  500;
const G = 6.67e-11;

let b1 = [150, 150];
let b2 = [200, 200];

function setup() {
  createCanvas(400, 400);
  background(220);
}

function face() {
  noStroke();
  background("#79bec3");

  fill("#fde7b1");
  ellipse(200, 200, 200, 200);

  fill("#000000");
  dEye += deltaTime / 100;
  eyeHeight[0] = 20 * cos(0.5 * dEye);
  eyeHeight[1] = 20 * cos(0.5 * dEye + PI / 2);
  ellipse(150, 210, 20, eyeHeight[0]);
  ellipse(250, 210, 20, eyeHeight[1]);

  fill("#ffd5b399");
  ellipse(140, 240, 25, 25);
  ellipse(260, 240, 25, 25);

  fill("#ffa791");
  dMouth += deltaTime / 100;
  mouthHeight = 20 * sin(dMouth * 0.3);
  ellipse(200, 240, 20, mouthHeight);
}

function draw() {
  if (mouseX - pmouseX < 1e-6 && mouseY - pmouseY < 1e-6) {
    return
  }
  stroke(random(0, 255), random(0, 255), random(0, 255));
  strokeWeight(10)
  line(mouseX, mouseY, pmouseX, pmouseY);
}


function f() {

}