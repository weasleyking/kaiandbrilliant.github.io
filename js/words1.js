let textToDisplay = "We share the belief that only through interactivity can we engage people";
let textIndex = 0;
let animationSpeed = 200;
let lastAnimationTime = 0;

const words1 = (p) => {
  let frameCounter = 0;
  let previousDrawingState = -1;
  let prevButton, nextButton;
  let initialDimension = 600;

  p.setup = () => {
    const sketchContainer = p.select('#words1');
    const dimension = getDimension();
    const canvas = p.createCanvas(dimension, dimension);
    canvas.parent(sketchContainer);
    p.textFont('Poppins');
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT, p.CENTER);

    p.textWrap(p.WORD);

    
    prevButton = p.createGraphics(80, 40);
    nextButton = p.createGraphics(80, 40);

    windowVisibilityChanged();
  };
  
  //functions to recalculate text size based on window size
  const calculateTextSize = () => {
    const dimension = getDimension(p);
    return 18 * (dimension / initialDimension);
  };

  const calculateTextLeading = () => {
    const dimension = getDimension(p);
    return 35 * (dimension / initialDimension);
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
  p.mousePressed = () => {
    if (isMouseOnPreviousButton()) {
      scrollToSection("up");
    } else if (isMouseOnNextButton()) {
      scrollToSection("down");
    }
  };
  
  p.draw = () => {
    p.background(250);
    
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
    
    if (drawingState !== previousDrawingState) {
      frameCounter = 0;
      previousDrawingState = drawingState;
    }
    
    let introText = "We share the belief that only\nthrough interactivity can we ";
    let engageText = "\n\nengage people,";
    let storiesText = "\n\n\ntell stories,";
    let memoriesText = "\n\n\n\nand create memories.";

    p.fill(0);
    p.text(introText, p.width * 0.2, p.height / 2.7, p.width *0.8);

    p.push();
    p.fill(230, 176, 27);
    p.text(engageText, p.width * 0.2, p.height / 2.7, p.width *0.8);
    p.pop();

    if (drawingState === 1) {
      p.push();
      p.fill(199, 30, 30);
      let charactersToAdd = p.min(p.floor(frameCounter / 2), storiesText.length);
      p.text(storiesText.substring(0, charactersToAdd), p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();
    } else if (drawingState === 2) {
      p.push();
      p.fill(199, 30, 30);
      p.text(storiesText, p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();

      p.push();
      p.fill(15, 89, 159);
      let charactersToAdd = p.min(p.floor((frameCounter - (storiesText.length)) / 2), memoriesText.length);
      p.text(memoriesText.substring(0, charactersToAdd), p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();
      
      if(charactersToAdd === memoriesText.length){
        drawNextButton();
      }
    }

    frameCounter++;
    
    drawPreviousButton();
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

new p5(words1);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}
