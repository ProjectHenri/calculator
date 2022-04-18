let displayValue = document.querySelector('.displayValue');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

document.querySelector('#clear').addEventListener('click', () => displayValue.textContent = '0');

numbers.forEach(number => number.addEventListener('click', populateDisplay));

function populateDisplay(e){
    if(!Number(displayValue.textContent)){
        displayValue.textContent = '';
    }
    displayValue.textContent += e.target.textContent;
}


function add(a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(a,b,callback){
    return callback(a,b);
}