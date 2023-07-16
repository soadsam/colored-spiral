const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext("2d");

// //draw rect
// c.fillStyle = "pink";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "lightblue";
// c.fillRect(300, 500, 100, 100);
// c.fillStyle = "lightgreen";
// c.fillRect(600, 300, 100, 100);

// //draw lines
// c.beginPath();
// c.strokeStyle = "blue";
// c.moveTo(50, 100);
// c.lineTo(100, 500);
// c.strokeStyle = "purple";
// c.lineTo(500, 700);
// c.stroke();

// c.beginPath();
// c.strokeStyle = "blue";
// c.moveTo(400, 100);
// c.lineTo(700, 500);
// c.stroke();

//draw arcs

// for (var i = 0; i < 100; i++) {
//   let randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   var x = Math.random();
//   var y = Math.random();
//   c.beginPath();
//   c.strokeStyle = "#"+randomColor;
//   c.fillStyle = "#"+randomColor;
//   console.log(randomColor);
//   c.arc(x * canvas.width, y * canvas.height, 30, 0, 2 * Math.PI);
//   c.stroke();
//   c.fill();
// }

var mouse = {
  x: undefined,
  y: undefined,
};
var minRadius = 5;
var colorArray = ["011936", "465362", "82a3a1", "9fc490", "c0dfa1"];
var circleArray = [];
var clearingSpace = 200;
var clearingSpeed = 10;

function init() {
  circleArray = [];
  for (var i = 0; i < 2; i++) {
    var radius = Math.random() * 10 + minRadius;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var originalSpeedX = dx;
    var originalSpeedY = dy;
    var stateOn = new Boolean(false);

    circleArray.push(new Circle(x, y, radius, dx, dy, originalSpeedX, originalSpeedY, stateOn));
  }
}

function Circle(x, y, radius, dx, dy, originalSpeedX, originalSpeedY, stateOn) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.originalSpeedX = originalSpeedX;
  this.originalSpeedY = originalSpeedY;
  let randomColor = colorArray[Math.floor(Math.random() * 5)];
  let dxNew = dx;
  let dyNew = dy;
  let diffX = mouse.x - this.x;
  let diffY = mouse.y - y;
  this.stateOn = stateOn;

  this.draw = function () {
    c.fillStyle = "#" + randomColor;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    c.fill();
  };

  this.update = function () {
    diffX = mouse.x - this.x;
    if (this.x > innerWidth - this.radius || this.x < 0 + this.radius) {
      this.dx = -this.dx;
    }

    if (this.y < 0 + this.radius || this.y > innerHeight - this.radius) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
      if (this.radius <= radius * 7) {
        this.radius += minRadius;
      }
    } else if (this.radius >= radius) {
      this.radius -= minRadius;
    }

    if (mouse.x - this.x > clearingSpace || (mouse.x - this.x < -clearingSpace && mouse.y - this.y > clearingSpace) || mouse.y - this.y < -clearingSpace) {
      if (this.stateOn === true) {
        console.log(this.originalSpeedX + ", " + this.originalSpeedY + ", " + this.dx + ", " + this.dy + ", ");
        this.dx = this.originalSpeedX;
        this.dy = this.originalSpeedY;
        this.stateOn = false;
      }
    }
  };
}

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

window.addEventListener("click", function (event) {
  mouse.x - event.clientX;
  mouse.y = event.clientY;
  console.log(mouse.x - event.clientX);
  // console.log(mouse.y);
  for (var i = 0; i < circleArray.length; i++) {
    if (mouse.x - circleArray[i].x < clearingSpace && mouse.x - circleArray[i].x > -clearingSpace && mouse.y - circleArray[i].y < clearingSpace && mouse.y - circleArray[i].y > -clearingSpace) {
      // if (mouse.y - circleArray[i].y > 100 || mouse.y - circleArray[i].y < -100) {
      dxNew = circleArray[i].dx * clearingSpeed;
      dyNew = circleArray[i].dy * clearingSpeed;
      circleArray[i].dx = dxNew;
      circleArray[i].dy = dyNew;
      // circleArray[i].radius = 100;
      circleArray[i].stateOn = true;
      // }
    }
  }
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
  // console.log(circleArray[0].dx);
  // console.log(circleArray[0].dy);
}
init();
animate();
