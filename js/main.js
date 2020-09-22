// HTML object references
const mainContainer = document.getElementById('main');
const controlsContainer = document.getElementById('controls');
const drawingBoardContainer = document.getElementById('drawing-board');
let grid;

// HTML input references
const numberOfSquaresInput = document.getElementById('number-of-grid-squares');
const colorWell = document.getElementById('color-picker');
const drawModeInput = document.getElementById('draw-mode');
const resetButton = document.getElementById('reset');
const btnToggleGrid = document.getElementById('toggle-grid');

// Default Variables
const defaultColor = '#000000';
const defaultDrawMode = 'basic';
const defaultGridSize = 25;
const drawingBoardSize = getComputedStyle(drawingBoardContainer).getPropertyValue('--main-grid-size');
const modeOrder = {'Normal': 'Rainbow', 'Rainbow': 'Shading', 'Shading': 'Normal'};

// Variables
let enableDrawing;
let desiredColor;
let gridSize;
let drawMode;
let isGridOn;


// Functions for creating a blank grid
function drawGrid(numberOfSquares) {
    // Empty the Grid
    let child = drawingBoardContainer.firstChild
    while (child) {
        drawingBoardContainer.removeChild(child);
        child = drawingBoardContainer.firstChild;
    }

    // Calculate grid-item sizes
    let gridItemSize = `${parseInt(drawingBoardSize.slice(0, -2)) / numberOfSquares}vmin`

    // Loop through rows and columns and create each grid element
    let gridItems = [];
    for (let row = 0; row < numberOfSquares; row++) {
        gridItems[row] = [];
        for (let col = 0; col < numberOfSquares; col++) {
            //Create element and assign ID
            gridItems[row][col] = document.createElement('div');
            gridItems[row][col].id = `row${row}col${col}`;
            // Add to board
            drawingBoardContainer.appendChild(gridItems[row][col]);
            let tempReference = document.getElementById(`row${row}col${col}`);
            // Set size and class
            tempReference.style.width = `${gridItemSize}`;
            tempReference.style.height = `${gridItemSize}`;
            if (isGridOn) {
                tempReference.classList.add('grid-item');
            } else {
                tempReference.classList.add('no-border-grid-item');
            }
            // Set event listener
            tempReference.addEventListener('mouseover', changeGridtileColor);

        }
    }

    // Set the Grid Container's min-size to be current size
    return gridItems;
}
function changeGridtileColor(event) {
    if (enableDrawing) {
        switch (drawMode) {
            case 'Rainbow':
                event.target.style.backgroundColor = randomColor();
                break;
            case 'Shading':
                let op = event.target.style.opacity;
               
                if (op === '') {
                   event.target.style.opacity = '0.1';
                   event.target.style.backgroundColor = desiredColor;
                   break;
                } else if (op < 1) {
                    event.target.style.opacity = `${Number.parseFloat(op) + 0.1}`;
                    break;
                } else {
                    break;
                }
            
            case 'Normal':
                event.target.style.backgroundColor = desiredColor;
                break;
            default: // draw current color
                event.target.style.backgroundColor = desiredColor;
                break;
        }
    } else { return; }
}
function randomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
function resetGrid() {
    grid = drawGrid(gridSize);
}
function toggleDraw() {
    enableDrawing = !enableDrawing;
}

function toggleGridOnOff() {
    if (isGridOn) {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid.length; col++) {
                grid[row][col].classList.remove('grid-item');
                grid[row][col].classList.add('no-border-grid-item');


            }
        }
    } else {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid.length; col++) {
                grid[row][col].classList.add('grid-item');
                grid[row][col].classList.remove('no-border-grid-item');
            }
        }
    }
    isGridOn = !isGridOn;
}
function changeDrawMode() {
    drawModeInput.innerText = `Mode: ${modeOrder[drawModeInput.innerText.slice(6)]}`;
    drawMode = drawModeInput.innerText.slice(6);
    if(drawMode === 'Rainbow') {
        colorWell.disabled = true;
    } else {
        colorWell.disabled = false;
    }
}

function startup() {
    desiredColor = defaultColor;
    gridSize = defaultGridSize;
    drawMode = defaultDrawMode;
    colorWell.value = defaultColor;
    numberOfSquaresInput.value = gridSize;
    enableDrawing = true;
    isGridOn = true;


    // Button Event Listeners
    resetButton.addEventListener('click', resetGrid);
    colorWell.addEventListener('change', function (e) {
        desiredColor = e.target.value;
    });
    numberOfSquaresInput.addEventListener('change', e => {
        gridSize = e.target.value;
        grid = drawGrid(gridSize)
    });
    drawModeInput.addEventListener('click', changeDrawMode);
    btnToggleGrid.addEventListener('click', toggleGridOnOff);

    // Spacebar event listener
    const keyListener = document.addEventListener('keydown', function (e) {
        if (e.key === 'd') {
            toggleDraw();
        } else { return; }
    });
    grid = drawGrid(gridSize);
}


// Startup Event Listener
window.addEventListener('load', startup);
