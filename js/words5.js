const words5 = (p) => {
  
  let frameCounter = 0;
  //let previousDrawingState = -1;
  let previousdragCount = -1;
  let prevButton, nextButton;
  
  let initialDimension = 600;

  p.setup = () => {
    const sketchContainer = p.select('#words5');
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
    return 32 * (dimension / initialDimension);
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
    p.background(255);
    
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
    
    if (dragCount !== previousdragCount) {
      frameCounter = 0;
      previousdragCount = dragCount;
    }
    
    let introText = "My experience with architecture\ngave me skills and mindset\nto communicate complex \nconcepts visually.";
    let engageText = "\n\n\n\nthrough form,";
    let storiesText = "\n\n\n\n\ncomposition, ";
    let memoriesText = "\n\n\n\n\n\nand color.";
    let artistText = "\n\n\n\n\n\n\nIt also enabled me to think\nboth like an artist";
    let engText = "\n\n\n\n\n\n\n\n\nand an engineer.";

    let textstart = p.height * 0.27
    p.fill(0);
    p.text(introText, p.width * 0.2, textstart, p.width *0.8);
    

    if (dragCount === 1) {
      /*
      p.push();
      p.fill(199, 30, 30);
      let charactersToAdd = p.min(p.floor(frameCounter / 2), engageText.length);
      p.text(engageText.substring(0, charactersToAdd), p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();
      */
      p.text(engageText, p.width * 0.2, textstart, p.width *0.8);
    } else if (dragCount === 2) {
      /*
      p.push();
      p.fill(199, 30, 30);
      p.text(engageText, p.width * 0.2, p.height/ 3.2, p.width *0.8);
      p.pop();
      
      p.push();
      p.fill(199, 30, 30);
      let charactersToAdd = p.min(p.floor((frameCounter - (engageText.length)) / 2), storiesText.length);
      p.text(storiesText.substring(0, charactersToAdd), p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();
      */
      p.text(engageText, p.width * 0.2, textstart, p.width *0.8);
      p.text(storiesText, p.width * 0.2, textstart, p.width *0.8);
    }else if (dragCount === 3) {
      /*
      p.push();
      p.fill(199, 30, 30);
      p.text(engageText, p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();
      
      p.push();
      p.fill(199, 30, 30);
      p.text(storiesText, p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();

      p.push();
      p.fill(15, 89, 159);
      let charactersToAdd = p.min(p.floor((frameCounter - (storiesText.length) - (engageText.length)) / 2), memoriesText.length);
      p.text(memoriesText.substring(0, charactersToAdd), p.width * 0.2, p.height / 2.7, p.width *0.8);
      p.pop();
      */
      
      p.text(engageText, p.width * 0.2, textstart, p.width *0.8);
      p.text(storiesText, p.width * 0.2, textstart, p.width *0.8);
      p.text(memoriesText, p.width * 0.2, textstart, p.width *0.8);
    }else if (dragCount === 4) { 
      p.text(engageText, p.width * 0.2, textstart, p.width *0.8);
      p.text(storiesText, p.width * 0.2, textstart, p.width *0.8);
      p.text(memoriesText, p.width * 0.2, textstart, p.width *0.8);
      p.text(artistText, p.width * 0.2, textstart, p.width *0.8);
    }else if (dragCount >= 5) { 
      p.text(engageText, p.width * 0.2, textstart, p.width *0.8);
      p.text(storiesText, p.width * 0.2, textstart, p.width *0.8);
      p.text(memoriesText, p.width * 0.2, textstart, p.width *0.8);
      p.text(artistText, p.width * 0.2, textstart, p.width *0.8);
      p.text(engText, p.width * 0.2, textstart, p.width *0.8);

      drawNextButton();
      
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

new p5(words5);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}
