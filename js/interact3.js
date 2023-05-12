let dragCount = 0;

const interact3 = (p) => {
  
  let circleRadius = 70;
  let circleX, circleY;

  let isDragging = false;

  let damping = 0.75;
  let velocityX = 0;
  let velocityY = 0;
  let restingDistance = 10;
  let stiffness = 0.2;

  let sprites = [];
  let totalFramesArray = [32, 30, 33, 28, 24];
  let spriteColsArray = [6, 5, 6, 5, 5];
  let spriteRows = 6;
  let animFrameRate = 15;
  let animFrame = 0;
  let canvasFrame = 0;
  let interpolation;
  let isPlaying = false;
  
  let backgroundImage1;
  let backgroundImage2;
  
  let initialDimension = 600;

  p.preload = () => {
    for (let i = 1; i <= 5; i++) {
      sprites.push(p.loadImage(`assets/anim${i}.png`));
    }
    backgroundImage1 = p.loadImage('assets/Interact3BG.png');
    backgroundImage2 = p.loadImage('assets/Interact3BG2.png');
  };

  p.setup = () => {
    const sketchContainer = p.select('#interact3');
    const dimension = getDimension();
    const canvas = p.createCanvas(dimension, dimension);
    canvas.parent(sketchContainer);
    
    p.frameRate(60);
    circleX = p.width / 2;
    circleY = p.height / 2;
    interpolation = p.floor(60 / animFrameRate);
    
    windowVisibilityChanged();
  };

  p.draw = () => {
    p.background(255);
    Physics();
    displaySprite();
    displayText();
    if (dragCount === 0 && isDragging === false){
      p.image(backgroundImage1, 0, 0, p.width, p.height);
    }
    if (dragCount === 1 && isDragging === false && isPlaying === false){
      p.image(backgroundImage2, 0, 0, p.width, p.height);
    }
  };

  function displaySprite() {
    let frameWidth = 600;
    let frameHeight = 600;

    const spriteIndex = (dragCount) % 5;
    const currentSprite = sprites[spriteIndex];
    const totalFrames = totalFramesArray[spriteIndex];
    const spriteCols = spriteColsArray[spriteIndex];

    if (isPlaying) {
      canvasFrame++;
      animFrame = p.floor(canvasFrame / interpolation);
    }

    if (animFrame >= totalFrames) {
      animFrame = 0;
      canvasFrame = 0;
      isPlaying = false;
    }

    let frameX = (animFrame % spriteCols) * frameWidth;
    let frameY = p.floor(animFrame / spriteCols) * frameHeight;

    p.image(currentSprite, circleX - p.width/2, circleY - p.height/2, p.width, p.height, frameX, frameY, frameWidth, frameHeight);
  }

  function Physics() {
    if (isDragging) {
      circleX = p.mouseX;
      circleY = p.mouseY;
    } else {
      let dx = circleX - p.width / 2;
      let dy = circleY - p.height / 2;
      let distance = p.sqrt(dx * dx + dy * dy);

      if (distance > restingDistance) {
        let force = (restingDistance - distance) * stiffness;
        velocityX += (force * dx) / distance;
        velocityY += (force * dy) / distance;
      }

      velocityX *= damping;
      velocityY *= damping;
      circleX += velocityX;
      circleY += velocityY;
    }
  }

  p.mousePressed = () => {
    let d = p.dist(p.mouseX, p.mouseY, circleX, circleY);
    if (d < circleRadius) {
      isDragging = true;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
    let d = p.dist(p.mouseX, p.mouseY, circleX, circleY);
    if (d < circleRadius) {
      dragCount++;
      isPlaying = true;
    }
    //console.log("dragCount:", window.dragCount);
  };
  
  function windowVisibilityChanged() {
    let sections = Array.from(document.getElementsByClassName("section"));
    let windowHeight = window.innerHeight;
    sections.forEach((section) => {
      let sectionTop = section.offsetTop;
      let sectionBottom = sectionTop + section.offsetHeight;

      let sketch = section.p5;
      if (sketch) {
        if (
          window.scrollY + windowHeight > sectionTop &&
          window.scrollY < sectionBottom
        ) {
          if (sketch.isLooping() === false) {
            sketch.loop();
          }
        } else {
          if (sketch.isLooping() === true) {
            sketch.noLoop();
          }
        }
      }
    });
  }
  
  p.windowResized = () => {
    const dimension = getDimension(p);
    p.resizeCanvas(dimension, dimension);
    //p.textSize(calculateTextSize());
    //p.textLeading(calculateTextLeading());
  };
  
  window.addEventListener("scroll", windowVisibilityChanged);
  
  function displayText() {
  fill(0);
  textSize(16);
  text(`Drags: ${dragCount}`, 10, 50);
  text(isPlaying, 10, 70);
  text(interpolation, 10, 90);
  text(animFrame, 10, 110);
  text(canvasFrame, 10, 130);
  }
};

new p5(interact3);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}