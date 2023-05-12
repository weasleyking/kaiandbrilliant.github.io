const words5 = (p) => {
  
  let frameCounter = 0;
  //let previousDrawingState = -1;
  let previoussnappedPiecesCount = -1;
  let prevButton, nextButton;
  
  let initialDimension = 600;

  p.setup = () => {
    const sketchContainer = p.select('#words5');
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
    
    p.textSize(calculateTextSize());
    p.textLeading(calculateTextLeading());
    
    if (snappedPiecesCount !== previoussnappedPiecesCount) {
      frameCounter = 0;
      previoussnappedPiecesCount = snappedPiecesCount;
    }
    
    let text0 = "You are looking for a problem solver";
    let text1 = "and self learner";
    let text2 = "\nwith an insatiable curiosity.";
    let text3 = "\nI’m easily bored\ninside a comfort zone.";
    let text4 = "\nFor every project,";
    let text5 = "\nI challenge myself to experiment\nwith something new.";
    let text6 = "\ncracking a new problem";
    let text7 = "\nis my greatest joy.";
    let text8 = "\n(this puzzle is made from the only known aperiodic monotile,\nmy fav shape)";

    let textstart = p.height * 0.24
    p.fill(0);
    p.text(text0, p.width * 0.2, textstart, p.width *0.8);
    

    if (snappedPiecesCount === 1) {
      
      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter / 2), text1.length);
      p.text("\n" + text1.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
            
    } else if (snappedPiecesCount === 2) {
      
      p.text("\n" + text1, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter/ 2), text2.length);
      p.text("\n" + text2.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      
    }else if (snappedPiecesCount === 3) {
      
      p.text("\n" + text1 + text2, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter/ 2), text3.length);
      p.text("\n\n" + text3.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      
    }else if (snappedPiecesCount === 4) { 
      
      p.text("\n" + text1 + text2 + text3, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter/ 2), text4.length);
      p.text("\n\n\n\n" + text4.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      
    }else if (snappedPiecesCount === 5) { 
      
      p.text("\n" + text1 + text2 + text3 + text4, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter/ 2), text5.length);
      p.text("\n\n\n\n\n" + text5.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();

      
    }else if (snappedPiecesCount === 6) { 
      
      p.text("\n" + text1 + text2 + text3 + text4 + text5, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter/ 2), text6.length);
      p.text("\n\n\n\n\n\n\n" + text6.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      
      drawNextButton();
      
    }else if (snappedPiecesCount === 7) { 
      
      p.text("\n" + text1 + text2 + text3 + text4 + text5 + text6, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(230, 176, 27);
      let charactersToAdd = p.min(p.floor(frameCounter/ 2), text7.length);
      p.text("\n\n\n\n\n\n\n\n" + text7.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      
      drawNextButton();
      
    }else if (snappedPiecesCount === 8) { 
      
      p.text("\n" + text1 + text2 + text3 + text4 + text5 + text6 + text7, p.width * 0.2, textstart, p.width *0.8);

      p.push();
      p.fill(0);
      p.textStyle(p.NORMAL);
      p.textSize(calculateTextSize() - 10);
      p.textLeading(calculateTextLeading() - 10);
      let charactersToAdd = p.min(p.floor(frameCounter), text8.length);
      p.text("\n\n\n\n\n\n\n\n\n\n\n\n" + text8.substring(0, charactersToAdd), p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      
      drawNextButton();
      
    }else if (snappedPiecesCount > 8) {
      p.text("\n" + text1 + text2 + text3 + text4 + text5 + text6 + text7, p.width * 0.2, textstart, p.width *0.8);
      
      p.push();
      p.fill(0);
      p.textStyle(p.NORMAL);
      p.textSize(calculateTextSize() - 10);
      p.textLeading(calculateTextLeading() - 10);
      p.text("\n\n\n\n\n\n\n\n\n\n\n\n" + text8, p.width * 0.2, textstart, p.width *0.8);
      p.pop();
      drawNextButton();
    }

    frameCounter++;
    
    drawPreviousButton();
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

new p5(words5);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}
