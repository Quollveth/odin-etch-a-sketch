// DOM ELEMENTS
const drawBtn = document.querySelector('.draw');
const eraseBtn = document.querySelector('.erase');
const gridBtn = document.querySelector('.grid');
const rainbowBtn = document.querySelector('.rainbowImg');
const gridContainer = document.querySelector('.grid-container');
const gridSizeSlider = document.getElementById('gridSize');
const gridSizeText = document.getElementById('gridSizeText');
const colorInput = document.getElementById('drawColor');


//VARIABLES
let activeTool = 'draw';
let size = 16;
let currentColor = '#000000';
let nCells;
let mouseDown = false;
let bordersActive = true;
let rainbowActive = false;
let previousCell = null;
colorInput.value = currentColor;

//EVENT LISTENERS
gridContainer.addEventListener('mousedown',()=>{
    mouseDown = true;
});
gridContainer.addEventListener('mouseup',()=>{
    mouseDown = false;
});

gridSizeSlider.addEventListener('input',()=>{
    gridSizeText.innerText = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
})
gridSizeSlider.addEventListener('mouseup',()=>{
    size = gridSizeSlider.value;
    drawGrid(size);
})

colorInput.addEventListener('input',()=>{
    currentColor = colorInput.value;
    console.log(currentColor);
})

//FUNCTIONS
function drawGrid(size = 16){ //DRAWS THE GRID
    gridContainer.innerHTML = '';
    nCells = Math.pow(size, 2);
    let currentElement;
    for(let i=0;i<nCells;i++){
        currentElement = document.createElement('div');
        currentElement.id = `cell-${i}`;
        currentElement.classList.add('cell');
        if(bordersActive){
            currentElement.classList.add('cellBorder');
        }
        currentElement.addEventListener('mouseover',(e)=>{
            e.target.classList.add('cellHover');
        });
        currentElement.addEventListener('mouseout',(e)=>{
            e.target.classList.remove('cellHover');
        });
        currentElement.addEventListener('mousemove',(e)=>{
            cellClick(e.target); //it didn't work when calling the cellClick function directly in the addEventListener for some reason
        });
        currentElement.addEventListener('click',(e)=>{
            cellClick(e.target,true); //same as before
        });
        currentElement.addEventListener('dragstart', e => {
            e.preventDefault();
          });
        gridContainer.appendChild(currentElement);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

//BUTTON CLICKED
function drawClick(){
    activeTool = 'draw';
    drawBtn.classList.add('active');
    eraseBtn.classList.remove('active');
}

function eraseClick(){
    activeTool = 'erase';
    eraseBtn.classList.add('active');
    drawBtn.classList.remove('active');
}

function wipeClick(){
    drawGrid(size);
    previousCell = null;
}

function gridClick(){
    let cellList = document.querySelectorAll('.cell');
    if(bordersActive){
        for(let i=0;i<nCells;i++){
            cellList[i].classList.remove('cellBorder');
            gridBtn.classList.remove('active');
            bordersActive = false;
        }
    } else{        
        for(let i=0;i<nCells;i++){
            cellList[i].classList.add('cellBorder');
            gridBtn.classList.add('active');
            bordersActive = true;
        }
    }
}

function rainbowClick(){
    if(rainbowActive){
        rainbowActive = false;
        rainbowBtn.src = 'imgs/rainbow-svgrepo-com(2).svg';
    } else {
        rainbowActive = true;
        rainbowBtn.src = 'imgs/rainbow-svgrepo-com.svg';
    }
}

//clicked on a cell
function cellClick(cell,clicked = false){
    if(mouseDown || clicked){
        if(cell.id == previousCell){
            //do nothing
        } else {
            previousCell = cell.id;
            if(activeTool == 'draw'){
                if(rainbowActive){
                    currentColor = `#${((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")}`;
                    colorInput.value = currentColor;
                }
                cell.style.backgroundColor = `${currentColor}`;
            } else {
                cell.style.backgroundColor = '#F5F5F5';
            }
        }
    }
}
//INITIALIZE THE PROGRAM
drawGrid(size);