const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let windowX = window.innerWidth;
let windowY = window.innerHeight;
canvas.width = windowX;
canvas.height = windowY;

let mouseX = 0;
let mouseY = 0;

addEventListener("mousemove", function() {
  mouseX = event.clientX;
  mouseY = event.clientY;
});


let grav = 0.99;
c.strokeWidth=5;
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.startradius = this.radius;
  this.x = Math.random() * (windowX - this.radius * 2) + this.radius;
  this.y = Math.random() * (windowY - this.radius);
  this.moveY = Math.random() * 2;
  this.moveX = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };
}

let bal = [];
for (let i=0; i < 40; i++){
    bal.push(new Ball());
}

function animate() {    
  if (windowX != window.innerWidth || windowY != window.innerHeight) {
    windowX = window.innerWidth;
    windowY = window.innerHeight;
    canvas.width = windowX;
    canvas.height = windowY;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, windowX, windowY);
  for (let i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].y += bal[i].moveY;
    bal[i].x += bal[i].moveX;
    if (bal[i].y + bal[i].radius >= windowY) {
      bal[i].moveY = -bal[i].moveY * grav;
    } else {
      bal[i].moveY += bal[i].vel;
    }    
    if(bal[i].x + bal[i].radius > windowX || bal[i].x - bal[i].radius < 0){
        bal[i].moveX = -bal[i].moveX;
    }
    if(mouseX > bal[i].x - 20 && 
      mouseX < bal[i].x + 20 &&
      mouseY > bal[i].y - 50 &&
      mouseY < bal[i].y +50 &&
      bal[i].radius < 70){
        bal[i].x += +1;
        bal[i].radius +=5; 
      } else {
        if(bal[i].radius > bal[i].startradius){
          bal[i].radius += -5;
        }
      }
    }

}

animate();

setInterval(function() {
  bal.push(new Ball());
  bal.splice(0, 1);
}, 400);



