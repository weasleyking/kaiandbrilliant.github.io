const words6 = (p) => {

  let frameCounter = 0;
  let prevButton, nextButton;
  
  let initialDimension = 600;

  p.setup = () => {
    const sketchContainer = p.select('#words6');
    const dimension = getDimension();
    const canvas = p.createCanvas(dimension, dimension);
    canvas.parent(sketchContainer);
    p.textFont('Poppins');
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT, p.CENTER);

    p.textWrap(p.WORD);

    
    prevButton = p.createGraphics(80, 40);
    nextButton = p.createGraphics(80, 40);

    windowVisibilityChanged();
  };
  
  
  p.draw = () => {
    p.background(255);
    
    p.textSize(calculateTextSize()-3);
    p.textLeading(calculateTextLeading()-3);
    
    let allText = "That’s why as a violinist\nI apprenticed and learned to\ncraft my own instrument;\n\nor for a VR film I invented\nan advanced locomotion technique\nthat allowed viewers to walk\nboth space & time of the footage;\n\nor, for a (secret) project going on NASA’s zero-G flight,\nI taught myself how to make a\nmechanical gyroscopic inertial navigation system\n\n(many of these thanks to brilliant.org!)";
    
    p.fill(0);
    p.text(allText, p.width * 0.2, p.height *0.2, p.width *0.8);
    
    
    /*
    let charactersToAdd = p.min(p.floor(frameCounter / 2), allText.length);
    p.text(allText.substring(0, charactersToAdd), 100, p.height / 2.7, p.width - 200);
    
    if(charactersToAdd === allText.length){
      drawNextButton();
    }
    */
    
    frameCounter++;
    drawPreviousButton();
    drawNextButton();
  };
  
  //functions to recalculate text size based on window size
  const calculateTextSize = () => {
    const dimension = getDimension();
    return 16 * (dimension / initialDimension);
  };

  const calculateTextLeading = () => {
    const dimension = getDimension();
    return 30 * (dimension / initialDimension);
  };
  
  //functions to draw interactive prev and next buttons 
  const isMouseOnPreviousButton = () => {
    return (
      p.mouseX > 10 &&
      p.mouseX < 10 + prevButton.width &&
      p.mouseY > 10 &&
      p.mouseY < 10 + prevButton.height
    );
  };
  const isMouseOnNextButton = () => {
    return (
      p.mouseX > 10 &&
      p.mouseX < 10 + nextButton.width &&
      p.mouseY > p.height - 50 &&
      p.mouseY < p.height - 50 + nextButton.height
    );
  };
  const drawPreviousButton = () => {
    if (isMouseOnPreviousButton()) {
      drawInvertedPreviousButton();
    } else {
      drawNormalPreviousButton();
    }
  };
  const drawNextButton = () => {
    if (isMouseOnNextButton()) {
      drawInvertedNextButton();
    } else {
      drawNormalNextButton();
    }
  };
  const drawNormalPreviousButton = () => {
    prevButton.fill(255);
    prevButton.stroke(0);
    prevButton.strokeWeight(2);
    prevButton.rect(1, 1, prevButton.width - 2, prevButton.height - 2, 12);
    prevButton.strokeWeight(1);
    prevButton.textFont("Poppins");
    prevButton.textSize(15);
    prevButton.textAlign(p.CENTER, p.CENTER);
    prevButton.fill(0);
    prevButton.text("P r e v", prevButton.width / 2, prevButton.height / 2);
    p.image(prevButton, 10, 10);
  };
  const drawInvertedPreviousButton = () => {
    prevButton.fill(0);
    prevButton.stroke(255);
    prevButton.strokeWeight(2);
    prevButton.rect(1, 1, prevButton.width - 2, prevButton.height - 2, 12);
    prevButton.strokeWeight(1);
    prevButton.textFont("Poppins");
    prevButton.textSize(15);
    prevButton.textAlign(p.CENTER, p.CENTER);
    prevButton.fill(255);
    prevButton.text("P r e v", prevButton.width / 2, prevButton.height / 2);
    p.image(prevButton, 10, 10);
  };
  const drawNormalNextButton = () => {
    nextButton.fill(255);
    nextButton.stroke(0);
    nextButton.strokeWeight(2);
    nextButton.rect(1, 1, nextButton.width - 2, nextButton.height - 2, 12);
    nextButton.strokeWeight(1);
    nextButton.textFont("Poppins");
    nextButton.textSize(15);
    nextButton.textAlign(p.CENTER, p.CENTER);
    nextButton.fill(0);
    nextButton.text("N e x t", nextButton.width / 2, nextButton.height / 2);
    p.image(nextButton, 10, p.height - 50);
  };
  const drawInvertedNextButton = () => {
    nextButton.fill(0);
    nextButton.stroke(255);
    nextButton.strokeWeight(2);
    nextButton.rect(1, 1, nextButton.width - 2, nextButton.height - 2, 12);
    nextButton.strokeWeight(1);
    nextButton.textFont("Poppins");
    nextButton.textSize(15);
    nextButton.textAlign(p.CENTER, p.CENTER);
    nextButton.fill(255);
    nextButton.text("N e x t", nextButton.width / 2, nextButton.height / 2);
    p.image(nextButton, 10, p.height - 50);
  };
  p.mousePressed = p.touchStarted = () => {
    if (isMouseOnPreviousButton()) {
      scrollToSection("up");
    } else if (isMouseOnNextButton()) {
      scrollToSection("down");
    }
    return false;
  };
  
  p.windowResized = () => {
    const dimension = getDimension(p);
    p.resizeCanvas(dimension, dimension);
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
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

  window.addEventListener("scroll", windowVisibilityChanged);
};

new p5(words6);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}
