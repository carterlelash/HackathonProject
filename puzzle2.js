const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

const iEngine = Engine.create();
const iRunner = Runner.create();

const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

const iRender = Render.create({
  element: document.getElementById("simulation-container"),
  engine: iEngine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: "lightblue",
  },
});

const centerX = iRender.options.width / 2;
const centerY = iRender.options.height / 2;
const spawnPoint = Math.random() < 0.5;
let point;
if (spawnPoint) {
  point = 150;
} else {
  point = 1000;
}

const ballA = Bodies.circle(point, 50, 30);
ballA.friction = 0;
ballA.render.fillStyle = "red";
ballA.isStatic = true;

function startGame() {
  ballA.isStatic = false;

  // Set all objects in the array to be static
  objects.forEach((object) => {
    object.isStatic = true;
  });
}

function check() {
  const x = ballA.position.x;
  const y = ballA.position.y;

  console.log("X: " + x + " " + "Y: " + y);

  // Compare x and y values to preset values
  if (x >= 510 && x <= 640 && y >= 310 && y <= 330) {
    console.log("You win!");
    document.getElementById("next").style.visibility = "visible";
  } else {
    console.log("You lose!");
  }
}

const objects = []; // Array to store the random objects
const numObjects = Math.floor(Math.random() * (30 - 15 + 1) + 15); // Random whole value between 15 and 30

// Create and add the objects to the array with random types and positions
for (let i = 0; i < numObjects; i++) {
    const isBox = Math.random() < 0.5; // Randomly determine if it should be a box or triangle
    let object;
  
    if (isBox) {
      const x = Math.random() * 470; // Random x position between 0 and 470
      const y = Math.random() * 400 + 100; // Random y position between 100 and 500
      const width = Math.random() * (100 - 50) + 50; // Random width between 50 and 100
      const height = Math.random() * (100 - 50) + 50; // Random height between 50 and 100
      object = Bodies.rectangle(x, y, width, height);
    } else {
      const x = Math.random() * 320 + 680; // Random x position between 680 and 1000
      const y = Math.random() * 400 + 100; // Random y position between 100 and 500
      const scale1 = Math.random() * (150 - 75) + 75; // Random scale value 1 between 75 and 150
      const scale2 = Math.random() * (150 - 75) + 75; // Random scale value 2 between 75 and 150
      const vertices = [
        { x: 0, y: 0 },
        { x: scale1, y: 0 },
        { x: 0, y: scale2 },
      ]; // Scale up the vertices
      object = Bodies.fromVertices(x, y, vertices);
    }
  
    object.friction = 0; // Increase friction for better bouncing
    object.restitution = 0; // Set restitution to 0
    object.render.fillStyle = "blue";
    object.isStatic = false; // Make the object movable
    objects.push(object);
  }
  
  

const ground = Bodies.rectangle(centerX, iRender.options.height - 30, iRender.options.width, 60, {
  isStatic: true,
});
const leftWall = Bodies.rectangle(0, centerY, 10, iRender.options.height, { isStatic: true });
const rightWall = Bodies.rectangle(iRender.options.width, centerY, 10, iRender.options.height, { isStatic: true });
const topWall = Bodies.rectangle(centerX, 0, iRender.options.width, 10, { isStatic: true });

const goalBottom = Bodies.rectangle(centerX, centerY + 50, 200, 10, { isStatic: true });
const goalWall = Bodies.rectangle(672, 320, 10, 100, { isStatic: true });
const goalWall2 = Bodies.rectangle(480, 320, 10, 100, { isStatic: true });
const goal = Bodies.rectangle(centerX, centerY + 40, 180, 10, { isStatic: true });
goal.render.fillStyle = "green";

Composite.add(iEngine.world, [ballA, ground, leftWall, rightWall, topWall, goal, goalBottom, goalWall, goalWall2, ...objects]);

// Mouse Constraint
const mouse = Mouse.create(iRender.canvas);
const mouseConstraint = MouseConstraint.create(iEngine, {
  mouse: mouse,
});
Composite.add(iEngine.world, mouseConstraint);

Render.run(iRender);
Runner.run(iRunner, iEngine);
