const interact2 = (p) => {
  
  let img1, img2, img3;
  let initialDimension = 600;
  
  p.preload = () => {
    // Load the images
    img1 = p.loadImage('assets/image1.jpg');
    img2 = p.loadImage('assets/image2.jpg');
    img3 = p.loadImage('assets/image3.jpg');
  };

  p.setup = () => {
    const sketchContainer = p.select('#interact2');
    const dimension = getDimension()
    const canvas = p.createCanvas(dimension, dimension);
    canvas.parent(sketchContainer);
    
    p.textAlign(p.RIGHT);
    p.textFont('Poppins');
    p.textStyle(p.BOLD);
    //p.textSize(40);
    //p.textLeading(30);
    p.imageMode(p.CENTER);
    
    img1.resize(p.height*1.5, 0);
    img2.resize(p.height*1.3, 0);
    img3.resize(p.height*1.4, 0);
    
    windowVisibilityChanged();
  };
  
  //functions to recalculate text size based on window size
  const calculateTextSize = () => {
    const dimension = getDimension(p);
    return 32 * (dimension / initialDimension);
  };

  const calculateTextLeading = () => {
    const dimension = getDimension(p);
    return 35 * (dimension / initialDimension);
  };

  // Function to check if the mouse is over an image
  function isMouseOverImage(x, y, img, scaleFactor) {
    let w = img.width / 2 * scaleFactor;
    let h = img.height / 2 * scaleFactor;
    return p.mouseX > x - w / 2 && p.mouseX < x + w / 2 && p.mouseY > y - h / 2 && p.mouseY < y + h / 2;
  }
  
  // Function to render and wrap text
  function renderText(text, x, y, maxWidth, lineHeight) {
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
    let words = text.split(' ');
    let line = '';
    let offsetY = 0;

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' ';
      let testWidth = p.textWidth(testLine);

      if (testWidth > maxWidth && i > 0) {
        p.text(line, x, y + offsetY);
        line = words[i] + ' ';
        offsetY += lineHeight;
      } else {
        line = testLine;
      }
    }
    p.text(line, x, y + offsetY);
  }
  
  p.draw = () => {
    p.background(250);
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
    
    p.push();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(calculateTextSize()/2.5);
    p.fill(220);
    p.text('Hover to Zoom', p.width / 2, p.height / 2);
    p.pop();
    
    // Calculate distance from the mouse to the center of each image container
    let d1 = p.dist(p.mouseX, p.mouseY, p.width / 4, p.height / 4);
    let d2 = p.dist(p.mouseX, p.mouseY, 3 * p.width / 4, p.height / 4);
    let d3 = p.dist(p.mouseX, p.mouseY, p.width / 2, 3 * p.height / 4);

    // Calculate the scale factor for each image container based on distance
    let scaleFactor1 = p.map(d1, 0, p.width/3, 1.2, 0.5, true);
    let scaleFactor2 = p.map(d2, 0, p.width/3, 1.2, 0.5, true);
    let scaleFactor3 = p.map(d3, 0, p.width/3, 1.2, 0.5, true);
    
    // Calculate the scale factor for each image container based on distance
    let moveFactor1 = p.map(scaleFactor1, 1, 0.5, 1, 0, true);
    let moveFactor2 = p.map(scaleFactor2, 1, 0.5, 1, 0, true);
    let moveFactor3 = p.map(scaleFactor3, 1, 0.5, 1, 0, true);

    // Find the index of the closest image container if the mouse is over an image
    let closestIndex = -1;
    if (isMouseOverImage(p.width / 4, p.height / 4, img1, scaleFactor1)) {
      closestIndex = 0;
    } else if (isMouseOverImage(3 * p.width / 4, p.height / 4, img2, scaleFactor2)) {
      closestIndex = 1;
    } else if (isMouseOverImage(p.width / 2, 3 * p.height / 4, img3, scaleFactor3)) {
      closestIndex = 2;
    }

    // Display and scale the image containers
    for (let i = 0; i < 3; i++) {
      if (i === closestIndex) continue;
      
      let lerpFactor;
      let x, y, img, text;
      if (i === 0) {
        x = p.width / 4;
        y = p.height / 4;
        img = img1;
        lerpFactor =  moveFactor1
        text = 'urban displacement and filter bubble';
      } else if (i === 1) {
        x = 3.2 * p.width / 4;
        y = 1.2 * p.height / 4;
        img = img2;
        lerpFactor = moveFactor2
        text = 'climate change and rare-earth minerals in a global infrastructure';
      } else {
        x = p.width / 2;
        y = 3 * p.height / 4;
        img = img3;
        lerpFactor = moveFactor3
        text = 'hyper consumerism, surveillance, and data privacy';
      }


      
      let targetX = p.width / 2;
      let targetY = p.height / 2;
      let newX = p.lerp(x, targetX, lerpFactor);
      let newY = p.lerp(y, targetY, lerpFactor);
      
      p.push();
      p.translate(newX, newY);
      p.scale(i === 0 ? scaleFactor1 : i === 1 ? scaleFactor2 : scaleFactor3);
      p.image(img, 0, 0, img.width / 2, img.height / 2);
      p.fill(0, 0, 0, 255 * 0.4);
      p.noStroke();
      p.rect(-img.width / 4, -img.height / 4, img.width / 2, img.height / 2);
      p.fill(255);
      p.textAlign(p.LEFT, p.TOP);
      let textX = -(img.width / 4) * 0.8;
      let maxWidth = img.width * 0.4;
      let lineHeight = p.textAscent() + p.textDescent();
      
      // Calculate the number of lines to center the text vertically
      let numLines = Math.ceil(p.textWidth(text) / maxWidth);
      let totalTextHeight = numLines * lineHeight;
      let textY = -(totalTextHeight / 2);
      
      renderText(text, textX, textY, maxWidth, lineHeight);
      
      p.pop();
    }

    // Render the closest image container on top and move its position closer to the center
    if (closestIndex !== -1) {
      let lerpFactorClosest
      let closestX, closestY, closestImg;
      if (closestIndex === 0) {
        closestX = p.width / 4;
        closestY = p.height / 4;
        closestImg = img1;
        lerpFactorClosest = moveFactor1
      } else if (closestIndex === 1) {
        closestX = 3.2 * p.width / 4;
        closestY = 1.2 * p.height / 4;
        closestImg = img2;
        lerpFactorClosest = moveFactor2
      } else {
        closestX = p.width / 2;
        closestY = 3 * p.height / 4;
        closestImg = img3;
        lerpFactorClosest = moveFactor3
      }

      let targetX = p.width / 2;
      let targetY = p.height / 2;
      let newClosestX = p.lerp(closestX, targetX, lerpFactorClosest);
      let newClosestY = p.lerp(closestY, targetY, lerpFactorClosest);

      p.push();
      p.translate(newClosestX, newClosestY);
      p.scale(closestIndex === 0 ? scaleFactor1 : closestIndex === 1 ? scaleFactor2 : scaleFactor3);
      p.stroke(250);
      p.strokeWeight(10);
      p.rect(-closestImg.width / 4, -closestImg.height / 4, closestImg.width / 2, closestImg.height / 2);
      p.image(closestImg, 0, 0, closestImg.width / 2, closestImg.height / 2);
      p.pop();
    }
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
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
    img1.resize(p.height*1.5, 0);
    img2.resize(p.height*1.3, 0);
    img3.resize(p.height*1.4, 0);
  };
  
  window.addEventListener("scroll", windowVisibilityChanged);
};

const myp5 = new p5(interact2);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}