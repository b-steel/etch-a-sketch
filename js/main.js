// HTML object references
const mainContainer = document.getElementById('main');
const controlsContainer = document.getElementById('controls');
const drawingBoardContainer  = document.getElementById('drawing-board');
// HTML input references
const numberOfSquaresInput = document.getElementById('number-of-grid-squares');
const colorInput = document.getElementById('color-picker');
const drawModeInput = document.getElementById('draw-mode');
const resetButton = document.getElementById('reset');
const toggleGridInput = document.getElementById('toggle-grid');

// Default Variables
let color = '#000000';
let gridSize = 25;
const drawingBoardSize = getComputedStyle(drawingBoardContainer).getPropertyValue('--main-grid-size'); 
let drawMode = 'basic';

// Functions for creating a blank grid
function drawGrid (numberOfSquares) {
    // Empty the Grid
    drawingBoardContainer.innerHTML = '';

    // Calculate grid-item sizes
    let gridItemSize = `${parseInt(drawingBoardSize.slice(0, -2)) / numberOfSquares}vw`
    console.log(gridItemSize);
    // Loop through rows and columns and create each grid element
    let gridItems = [];
    for (let row = 0; row < numberOfSquares; row++) {
        gridItems[row] = [];
        for (let col = 0; col < numberOfSquares; col++) {
            gridItems[row][col] = document.createElement('div');
            gridItems[row][col].id = `row${row}col${col}`;

            drawingBoardContainer.appendChild(gridItems[row][col]);
            let tempReference = document.getElementById(`row${row}col${col}`);
            tempReference.style.backgroundColor = 'orange';
            tempReference.style.width = `${gridItemSize}`;
            tempReference.style.height = `${gridItemSize}`;
            tempReference.classList.add('grid-item');
            
        }
    }

    // Set the Grid Container's min-size to be current size
return gridItems;
}


// Event Listeners
resetButton.addEventListener('click', );
colorInput.addEventListener();
gridSizeInput.addEventListener();
drawMode.addEventListener();
