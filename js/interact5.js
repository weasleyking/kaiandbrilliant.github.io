let snappedPiecesCount = 0; // global variable to track snapped pieces

const interact5 = (p) => {
  
  let resetButton, toggleHintButton;
  let drawEllipse = true;
  
  let dimension = Math.max(window.innerWidth * 0.48, window.innerHeight * 0.48);

  
  let pieces = [];
  let gridSize = 3;
  let pieceSize = 0.2 * dimension;
  let snapThreshold = 0.15 * dimension;
  //let win = false;
  let pieceImages = [];
  //let pieceScale = 0.5;
  let initialDimension = 600;
  let backgroundImage1;

  // define target positions manually for each group
  let groupPositions = [
    [{ x: 0.285298 * dimension, y: 0.654871 * dimension }, { x: 0.457895 * dimension, y: 0.455573 * dimension }, { x: 0.457895 * dimension, y: 0.555222 * dimension }],
    [{ x: 0.175182 * dimension, y: 0.654871 * dimension }, { x: 0.261481 * dimension, y: 0.505397 * dimension }, { x: 0.34778 * dimension, y: 0.455573 * dimension }],
    [{ x: 0.351415 * dimension, y: 0.576997 * dimension }, { x: 0.610311 * dimension, y: 0.626821 * dimension }]
  ];
  
  // initialize the groupSnapped array to keep track of which slot has been filled
  let groupSnapped = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
  
  p.preload = function() {
    for (let i = 1; i <= gridSize * gridSize - 1; i++) {
      pieceImages[i - 1] = p.loadImage(`assets/piece${i}.png`);
    }
    backgroundImage1 = p.loadImage('assets/puzzleBG.png');
  }

  p.setup = () => {
    const sketchContainer = p.select('#interact5');
    const dimension = getDimension();
    const canvas = p.createCanvas(dimension, dimension);
    canvas.parent(sketchContainer);
    
    //pieceSize = (p.min(p.width, p.height) / (gridSize + 1)) * pieceScale;

    for (let i = 0; i < gridSize; i++) {
       for (let j = 0; j < (i < 2 ? gridSize : gridSize - 1); j++) {
        let x = p.random(p.width - pieceSize);
        let y = p.random(p.height / 2 - pieceSize);
        let piece = {
          x: x,
          y: y,
          groupIndex: i,
          offsetX: 0,
          offsetY: 0,
          dragging: false,
          snapped: false,
          img: pieceImages[i * gridSize + j]
        };
        pieces.push(piece);
      }
    }
    
    resetButton = p.createGraphics(100, 40);
    toggleHintButton = p.createGraphics(130, 40);
    
    windowVisibilityChanged();
  };

  p.draw = () => {
    p.background(255);
    p.image(backgroundImage1, 0, 0, p.width, p.height);

    for (let piece of pieces) {
      if (piece.dragging && drawEllipse) {
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(255);

        // draw an ellipse for each target in the group that is not already snapped
        for (let i = 0; i < groupPositions[piece.groupIndex].length; i++) {
          if (!groupSnapped[piece.groupIndex][i]) {
            let pos = groupPositions[piece.groupIndex][i];
            p.ellipse(pos.x + pieceSize / 2, pos.y + pieceSize / 2, 20, 20);
          }
        }
      }

      if (piece.dragging) {
        piece.x = p.mouseX + piece.offsetX;
        piece.y = p.mouseY + piece.offsetY;
      }

      p.image(piece.img, piece.x, piece.y, pieceSize, pieceSize);
    }

    /*
    if (!win && checkWin()) {
      dragCount = 5;
    }
    */
    
    drawResetButton();
    drawToggleHintButton();
    updateSnappedPiecesCount();
    
    //console.log("Snapped Pieces: " + snappedPiecesCount);


  };
  
  function updateSnappedPiecesCount() {
    snappedPiecesCount = 0;
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].snapped) {
        snappedPiecesCount++;
      }
    }
  }
  
  const isMouseOnResetButton = () => {
    let distanceFromCenter = p.dist(p.mouseX, p.mouseY, p.width - (resetButton.width / 2) - 10, 10 + (resetButton.height / 2));
    return distanceFromCenter <= 20;
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
  
  const isMouseOnToggleHintButton = () => {
    let distanceFromCenter = p.dist(p.mouseX, p.mouseY, toggleHintButton.width / 2 + 10, 10 + (toggleHintButton.height / 2));
    return distanceFromCenter <= 20;
  };

  const drawToggleHintButton = () => {
    if (isMouseOnToggleHintButton()) {
      drawInvertedToggleHintButton();
    } else {
      drawNormalToggleHintButton();
    }
  };

  const drawNormalToggleHintButton = () => {
    const cornerRadius = 12;
    toggleHintButton.fill(255);
    toggleHintButton.stroke(0);
    toggleHintButton.strokeWeight(2);
    toggleHintButton.rect(1, 1, toggleHintButton.width - 2, toggleHintButton.height - 2, cornerRadius);
    toggleHintButton.strokeWeight(1);
    toggleHintButton.textFont('Poppins');
    toggleHintButton.textSize(15);
    toggleHintButton.textStyle(p.NORMAL);
    toggleHintButton.textAlign(p.CENTER, p.CENTER);
    toggleHintButton.fill(0);
    toggleHintButton.noFill();
    if (drawEllipse) {
      toggleHintButton.text("H i n t s  O n", toggleHintButton.width / 2, toggleHintButton.height / 2);
    } else {
    toggleHintButton.text("H i n t s  O f f ", toggleHintButton.width / 2, toggleHintButton.height / 2);
    }
    p.image(toggleHintButton, 10, 10);
  };

  const drawInvertedToggleHintButton = () => {
    const cornerRadius = 12;
    toggleHintButton.fill(0);
    toggleHintButton.stroke(255);
    toggleHintButton.strokeWeight(2);
    toggleHintButton.rect(1, 1, toggleHintButton.width - 2, toggleHintButton.height - 2, cornerRadius);
    toggleHintButton.strokeWeight(1);
    toggleHintButton.textFont('Poppins');
    toggleHintButton.textSize(15);
    toggleHintButton.textStyle(p.NORMAL);
    toggleHintButton.textAlign(p.CENTER, p.CENTER);
    toggleHintButton.noFill();
    if (drawEllipse) {
      toggleHintButton.text("H i n t s  O n", toggleHintButton.width / 2, toggleHintButton.height / 2);
    } else {
    toggleHintButton.text("H i n t s  O f f ", toggleHintButton.width / 2, toggleHintButton.height / 2);
    }
    p.image(toggleHintButton, 10, 10);
  };
  
  const resetGame = () => {
    pieces.forEach((piece, index) => {
      piece.x = p.random(p.width - pieceSize);
      piece.y = p.random(p.height/2 - pieceSize);
      piece.snapped = false;
    });
    groupSnapped = Array.fromgroupSnapped = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
  }

 p.mousePressed = function() {
    for (let i = pieces.length - 1; i >= 0; i--) {
      let piece = pieces[i];
      if (!piece.snapped && p.mouseX > piece.x && p.mouseX < piece.x + pieceSize && p.mouseY > piece.y && p.mouseY < piece.y + pieceSize) {
        piece.dragging = true;
        piece.offsetX = piece.x - p.mouseX;
        piece.offsetY = piece.y - p.mouseY;
        break;
      }
    }
    if (isMouseOnResetButton()) resetGame();
    if (isMouseOnToggleHintButton()) drawEllipse = !drawEllipse;

  }

  p.mouseReleased = function() {
    for (let piece of pieces) {
      if (piece.dragging) {
        piece.dragging = false;

        let closest = null;
        let closestIndex = -1;
        let minDist = Infinity;
        for (let i = 0; i < groupPositions[piece.groupIndex].length; i++) {
          let pos = groupPositions[piece.groupIndex][i];
          let dist = p.dist(piece.x, piece.y, pos.x, pos.y);
          if (!groupSnapped[piece.groupIndex][i] && dist < snapThreshold && dist < minDist) {
            minDist = dist;
            closest = pos;
            closestIndex = i;
          }
        }

        if (closest !== null) {
          piece.x = closest.x;
          piece.y = closest.y;
          piece.snapped = true;
          groupSnapped[piece.groupIndex][closestIndex] = true;
        }
      }
    }
  }
  
  /*
  function checkWin() {
      for (let i = 0; i < groupPositions.length; i++) {
        let piecesInGroup = pieces.filter(piece => piece.groupIndex === i && piece.snapped);
        if (piecesInGroup.length < gridSize) { // grid size represents the number of pieces per group
          return false;
        }
      }
      return true;
  }
  */
  
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
    dimension = getDimension(p);
    p.resizeCanvas(dimension, dimension);
    groupPositions = [
    [{ x: 0.285298 * dimension, y: 0.654871 * dimension }, { x: 0.457895 * dimension, y: 0.455573 * dimension }, { x: 0.457895 * dimension, y: 0.555222 * dimension }],
    [{ x: 0.175182 * dimension, y: 0.654871 * dimension }, { x: 0.261481 * dimension, y: 0.505397 * dimension }, { x: 0.34778 * dimension, y: 0.455573 * dimension }],
    [{ x: 0.351415 * dimension, y: 0.576997 * dimension }, { x: 0.610311 * dimension, y: 0.626821 * dimension }]
    ];
    pieceSize = 0.2 * dimension;
    snapThreshold = 0.15 * dimension;
  };

  
  window.addEventListener("scroll", windowVisibilityChanged);
};

new p5(interact5);

function getDimension(p) {
  const parentWidth = window.innerWidth * 0.48;
  const parentHeight = window.innerHeight * 0.48;
  return Math.max(parentWidth, parentHeight);
}

