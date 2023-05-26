const DEFAULT_SIZE = 16;

function createGridElements(size)
{
    const board = document.querySelector('.board');
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i=0; i < size*size; i++)
    {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        board.append(gridElement);
    }
}

function setMode(value)
{
    if(value === "paint")
        return document.getElementById('color').value;
    else if(value === "eraser")
        return "white";
    else
    {
        console.log("Error: setMode()");
        return -1;
    }
}

function changeSize(value) 
{
    updateSizeValue(value)
    clearCanvas(value);
}
  
function updateSizeValue(value) 
{
    sizeValue.innerHTML = `${value} x ${value}`
}
  
function clearCanvas() {
    const board = document.querySelector('.board');
    board.innerHTML = ''
    const sizeSlider = document.getElementById('sizeSlider');
    createGridElements(sizeSlider.value);
}

function drawingCanvas(value)
{
    const gridElements = document.getElementsByClassName('grid-element');
    let drawing = false;
    Array.from(gridElements).forEach((gridElement) => {
        gridElement.addEventListener('mouseup', () => {
            drawing = false;
        });
        gridElement.addEventListener('mousedown', () => {
            drawing = true;
        });
        gridElement.addEventListener('mousemove', (e) => {
            if(drawing === true)
                e.target.style.backgroundColor = setMode(value);
        });
        });
}

function buttons()
{
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if(button.id === "clear")
                clearCanvas();
            else
                drawingCanvas(button.id);
        });
        });
}

function slider()
{
    const sizeSlider = document.getElementById('sizeSlider');
    sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
    sizeSlider.onchange = (e) => changeSize(e.target.value)
}

createGridElements(DEFAULT_SIZE);
buttons();
slider();