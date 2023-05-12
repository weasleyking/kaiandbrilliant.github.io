// Declare drawingState as a global variable that controls both sketches on this page
let drawingState = 0;

const interact1 = (p) => {
  let drawingCanvas;
  let circle1, circle2, circle3;
  let dia;
  let drawingStarted = false;
  let tempCanvas;
  let lastLerpedX = null;
  let lastLerpedY = null;
  const smoothingFactor = 0.15;
  let resetButton;
  let glowingEffectActive = true;
  let glowingEffectCounter = 0;
  
  let backgroundImage1;
  let backgroundImage2;
  let backgroundImage3;
  let backgroundImage4;
  
  let startColor1 = p.color(230, 176, 27); // Yellow
  let targetColor1 = p.color(199, 30, 30); // Red
  let startColor2 = p.color(199, 30, 30); // Red
  let targetColor2 = p.color(15, 89, 159); // Blue

  let glowEffect = {
    active: false,
    x: 0,
    y: 0,
    diameter: 0,
    opacity: 100,
  };

  p.preload = () => {
    backgroundImage1 = p.loadImage('assets/BG1.png');
    backgroundImage2 = p.loadImage('assets/BG2.png');
    backgroundImage3 = p.loadImage('assets/BG3.png');
    backgroundImage4 = p.loadImage('assets/BG4.png');
  };

  
  p.setup = () => {
    
    p.frameRate(60);
    
    const sketchContainer = p.select('#interact1');
    const dimension = getDimension(p);
    const canvas = p.createCanvas(dimension, dimension);
    canvas.parent(sketchContainer);
    
    //p.createCanvas(dimension, dimension);
    drawingCanvas = p.createGraphics(dimension, dimension);
    tempCanvas = p.createGraphics(dimension, dimension);

    p.strokeWeight(5);
    p.stroke(0);

    resetButton = p.createGraphics(100, 40);

    // Initialize circle positions
    circle1 = { x: p.width * 0.26, y: p.height * 0.125, radius: dia };
    circle2 = { x: p.width * 0.62, y: p.height * 0.56, radius: dia };
    circle3 = { x: p.width * 0.6, y: p.height * 0.165, radius: dia+5 };
  };

  p.draw = () => {
    dia = p.width * 0.12;
    p.background(255);
    
    if (drawingState === 0 && drawingStarted === false){
      p.image(backgroundImage1, 0, 0, p.width, p.height);
    }else if(drawingState === 0){
      p.image(backgroundImage2, 0, 0, p.width, p.height);
    }else if(drawingState === 1){
      p.image(backgroundImage3, 0, 0, p.width, p.height);
    }else if(drawingState === 2){
      p.image(backgroundImage4, 0, 0, p.width, p.height);
    }
    
    p.image(drawingCanvas, 0, 0);

    if (p.mouseIsPressed && !isMouseOnResetButton()) {
      if (drawingState === 0 && p.dist(circle1.x, circle1.y, p.mouseX, p.mouseY) <= dia/2) {
        drawingStarted = true;
      } else if (drawingState === 1 && p.dist(circle2.x, circle2.y, p.mouseX, p.mouseY) <= dia/2) {
        drawingStarted = true;
      }

      if (drawingStarted) {
        drawSmoothLine(tempCanvas);
        drawCircle(p.mouseX, p.mouseY);
      }
    } else {
      if (drawingState === 0 && drawingStarted && p.dist(circle2.x, circle2.y, p.mouseX, p.mouseY) <= dia/2+10) {
        drawingCanvas.image(tempCanvas, 0, 0);
        drawingState = 1;
        glowingEffectActive = true; // Activate the glowing effect
      } else if (drawingState === 1 && drawingStarted && p.dist(circle3.x, circle3.y, p.mouseX, p.mouseY) <= dia/2+30) {
        drawingCanvas.image(tempCanvas, 0, 0);
        drawingState = 2;
        glowingEffectActive = true; // Activate the glowing effect
      }
      drawingStarted = false;
      tempCanvas.clear();
    }

    p.image(tempCanvas, 0, 0);
    
    
    // Draw glowing effect for connected circles
    if (drawingState === 0) {
      drawGlowingEffect(drawingCanvas, circle1);
    } else if (drawingState === 1) {
      drawGlowingEffect(drawingCanvas, circle2);
    } else if (drawingState === 2) {
      drawGlowingEffect(drawingCanvas, circle3);
    }

    /*
    // Draw circles
    drawCircle(circle1.x, circle1.y);
    drawCircle(circle2.x, circle2.y);
    drawCircle(circle3.x, circle3.y);
    

    // Draw circle inside circle to indicated connection
    p.fill(171,24,24);
    p.noStroke();
    if (drawingState === 0) {
      p.circle(circle1.x, circle1.y, dia);
    } else if (drawingState === 1) {
      p.circle(circle1.x, circle1.y, dia);
      p.circle(circle2.x, circle2.y, dia);
    } else if (drawingState === 2) {
      p.circle(circle1.x, circle1.y, dia);
      p.circle(circle2.x, circle2.y, dia);
      p.circle(circle3.x, circle3.y, dia);
    }
    */

    
    // Draw reset button
    drawResetButton();
  };

  const drawGlowingEffect = (canvas, circle) => {    
    if (glowingEffectActive) {
      if (glowEffect.diameter < 200 && glowEffect.opacity > 0) {
        p.noStroke();
        
        //controll glow color based on drawing state
        if (drawingState === 0) {
          p.fill(230, 176, 27, glowEffect.opacity);
        } else if (drawingState === 1) {
          p.fill(199, 30, 30, glowEffect.opacity);
        } else if (drawingState === 2) {
          p.fill(39, 123, 201, glowEffect.opacity);
        }
        p.ellipse(circle.x, circle.y, glowEffect.diameter, glowEffect.diameter);
        glowEffect.diameter += 6;
        glowEffect.opacity -= 3;
      } else if (glowEffect.diameter >= 200 && glowEffect.opacity <= 0 && drawingState === 0 && drawingStarted === false){
          glowEffect.diameter += 6;
          glowEffect.opacity -= 3;
          if (glowEffect.diameter >= 600 && glowEffect.opacity <= -200) {
            glowEffect.diameter = 0;
            glowEffect.opacity = 100;  
          }
      } else {
        glowingEffectActive = false;
        glowEffect.diameter = 0;
        glowEffect.opacity = 100;
      }
    }
  };
  
  const drawSmoothLine = (canvas) => {
    
    //smoothng
    let lerpedX = p.lerp(lastLerpedX !== null ? lastLerpedX : p.pmouseX, p.mouseX, smoothingFactor);
    let lerpedY = p.lerp(lastLerpedY !== null ? lastLerpedY : p.pmouseY, p.mouseY, smoothingFactor);
    
    let currentColor;
    if (drawingState === 0) {
      let colorProgress = p.dist(circle1.x, circle1.y, lerpedX, lerpedY) / p.dist(circle1.x, circle1.y, circle2.x, circle2.y);
      currentColor = p.lerpColor(startColor1, targetColor1, colorProgress);
    } else if (drawingState === 1) {
      let colorProgress = p.dist(circle2.x, circle2.y, lerpedX, lerpedY) / p.dist(circle2.x, circle2.y, circle3.x, circle3.y);
      currentColor = p.lerpColor(startColor2, targetColor2, colorProgress);
    }
    
    canvas.strokeWeight(6);
    canvas.stroke(currentColor);
    
    //draw smoothed line
    canvas.line(lastLerpedX || p.pmouseX, lastLerpedY || p.pmouseY, lerpedX, lerpedY);
    
    // Calculate the distance between the current and previous mouse positions and scale the densty of dots
    let distance = p.dist(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    let numDots = p.map(distance, 0, 50, 5, 120);
    numDots = p.constrain(numDots, 5, 120);
    
    
    // Draw small dots around the line to simulate a wool-like texture
    
    canvas.strokeWeight(1);
    
    /*
    for (let i = 0; i < numDots/2; i++) {
    let offsetX = p.randomGaussian() * 3.5;
    let offsetY = p.randomGaussian() * 3.5;
    let dotX = lerpedX + offsetX;
    let dotY = lerpedY + offsetY;
    canvas.point(dotX, dotY);
    }
    */
    
    for (let i = 0; i < numDots; i++) {
    let offsetX = p.randomGaussian() * 2;
    let offsetY = p.randomGaussian() * 2;
    let dotX = lerpedX + offsetX;
    let dotY = lerpedY + offsetY;
    canvas.point(dotX, dotY);
    }
    
    
    lastLerpedX = lerpedX;
    lastLerpedY = lerpedY;
  };

  const drawCircle = (x, y) => {
    p.stroke(0);
    p.strokeWeight(4);
    p.fill(255);
    p.ellipse(x, y, 20, 20);
  };

  const isMouseOnResetButton = () => {
    let distanceFromCenter = p.dist(p.mouseX, p.mouseY, p.width - (resetButton.width / 2) - 10, 10 + (resetButton.height / 2));
    return distanceFromCenter <= 20;
  };

  p.mouseClicked = () => {
    if (isMouseOnResetButton()) {
      drawingCanvas.clear();
      tempCanvas.clear();
      drawingState = 0;
      glowingEffectActive = true;
    }
  };
  
  p.mouseReleased = () => {
    lastLerpedX = null;
    lastLerpedY = null;
  };

  const drawResetButton = () => {
    if (isMouseOnResetButton()) {
      drawInvertedResetButton();
    } else {
      drawNormalResetButton();
    }
  };

  const drawNormalResetButton = () => {
    const cornerRadius = 12;
    //resetButton.background(255);
    resetButton.fill(255);

    resetButton.stroke(0);
    resetButton.strokeWeight(2);
    resetButton.rect(1, 1, resetButton.width - 2, resetButton.height - 2, cornerRadius);
    resetButton.strokeWeight(1);
    resetButton.textFont('Poppins');
    resetButton.textSize(15);
    resetButton.textStyle(p.NORMAL);
    resetButton.textAlign(p.CENTER, p.CENTER);
    resetButton.fill(0); 
    resetButton.noFill();
    resetButton.text("R e s e t", resetButton.width / 2, resetButton.height / 2);
    p.image(resetButton, p.width - resetButton.width - 10, 10);
  };

  const drawInvertedResetButton = () => {
    const cornerRadius = 12;
    //resetButton.background(0);
    resetButton.fill(0);
    resetButton.stroke(255);
    resetButton.strokeWeight(2);
    resetButton.rect(1, 1, resetButton.width - 2, resetButton.height - 2, cornerRadius);
    resetButton.strokeWeight(1);
    resetButton.textFont('Poppins');
    resetButton.textSize(15);
    resetButton.textStyle(p.NORMAL);
    resetButton.textAlign(p.CENTER, p.CENTER);
    //resetButton.fill(255);
    resetButton.noFill();
    resetButton.text("R e s e t", resetButton.width / 2, resetButton.height / 2);
    p.image(resetButton, p.width - resetButton.width - 10, 10);
  };

  p.windowResized = () => {
    const dimension = getDimension(p);
    p.resizeCanvas(dimension, dimension);
    let tempDrawingCanvas = drawingCanvas;
    let tempTempCanvas = tempCanvas;

    drawingCanvas = p.createGraphics(dimension, dimension);
    tempCanvas = p.createGraphics(dimension, dimension);

    drawingCanvas.image(tempDrawingCanvas, 0, 0);
    tempCanvas.image(tempTempCanvas, 0, 0);

    // Update circle positions
    circle1 = { x: p.width * 0.26, y: p.height * 0.125, radius: dia };
    circle2 = { x: p.width * 0.62, y: p.height * 0.56, radius: dia };
    circle3 = { x: p.width * 0.6, y: p.height * 0.165, radius: dia+5 };
  };

  const drawCursor = (x, y) => {
    if (drawingStarted) {
      p.stroke(0);
      p.strokeWeight(2);
      p.fill(255);
      p.ellipse(x, y, 10, 10);
    }
  };
};

// Instantiate the p5 object with the sketch
new p5(interact1);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}

