const drawBtn = document.querySelector('.draw');
const eraseBtn = document.querySelector('.erase');
const gridContainer = document.querySelector('.grid-container');
let activeTool = '';
let size = 4;

drawGrid(size);
drawClick();

function drawGrid(size = 16){
    gridContainer.innerHTML = '';
    let nCells = Math.pow(size, 2);
    let currentElement;
    for(let i=0;i<nCells;i++){
        currentElement = document.createElement('div');
        currentElement.id = `cell-${i}`;
        currentElement.classList.add('cell');
        currentElement.addEventListener('mouseover',(e)=>{
            e.target.classList.add('cellHover');
        });
        currentElement.addEventListener('mouseout',(e)=>{
            e.target.classList.remove('cellHover');
        });
        currentElement.addEventListener('click',(e)=>{
            cellClick(e.target);
        });
        gridContainer.appendChild(currentElement);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

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
}

function gridClick(){
    size = prompt("New Grid Size",size);    
    drawGrid(size);
}

function cellClick(cell){
    if(activeTool == 'draw'){
        cell.style.backgroundColor = 'black';
    } else {
        cell.style.backgroundColor = '#F5F5F5';
    }
}