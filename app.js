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

function init() {
  circleArray = [];
  for (var i = 0; i <= 1000; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var originalSpeedX = dx;
    var originalSpeedY = dy;
    var radius = Math.random() * 25 + minRadius;
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

function Circle(x, y, radius, dx, dy, originalSpeedX, originalSpeedY) {
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
  this.draw = function () {
    c.fillStyle = "#" + randomColor;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    c.fill();
  };

  this.update = function () {
    if (this.x > innerWidth - 30 || this.x < 30) {
      this.dx = -this.dx;
    }

    if (this.y < 30 || this.y > innerHeight - 30) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
      if (this.radius <= 50) {
        this.radius += minRadius;
      }    if (mouse.x - this.x > 100 && mouse.x - this.x < -100 && mouse.y - this.y > 100 && mouse.y - this.y < -100) {
      this.dx = this.originalSpeedX;
      this.dy = this.originalSpeedY;
    }
    }

    else if (this.radius >= radius) {
      this.radius -= minRadius;
    }
  };

  this.scatter = function () {
    if (mouse.x - this.x < 100 && mouse.x - this.x > -100 && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
      dxNew = this.dx * 2;
      dyNew = this.dy * 2;
      this.dx = dxNew;
      this.dy = dyNew;
      this.radius = 100;
      //   if (mouse.x - this.x > 100 && mouse.x - this.x < -100 && mouse.y - this.y > 100 && mouse.y - this.y < -100){
      //     this.radius=2000;
      // }
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
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  // console.log(mouse.x);
  // console.log(mouse.y);
  for (let i = 0; i <= circleArray.length; i++) {
    console.log(circleArray[i].dx);
    console.log(circleArray[i].dy);
    circleArray[i].scatter();
  }
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }
}
init();
animate();
