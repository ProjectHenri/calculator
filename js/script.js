const calcHistory = document.querySelector('.calcHistory')
const currentValue = document.querySelector('.currentValue');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const deleteNumber = document.querySelector('.backspace');
const negation = document.querySelector('.negation');

let currentNumber = '0';
let previousNumber = '';
let operator = null;
let result = null;

function addNumber(value){
    if(result !== null) {
        // Remove the result from the screen if the user starts typing a new number after a calculation
        result = null;
        currentNumber = '';
    }
    if(value === '.' && currentNumber.includes('.')) return; // Prevent user from adding multiple decimals to the number
    if (currentNumber.startsWith('0') && currentNumber.length === 1 && value != '.'){
        // If the first number is zero, prevent user from adding additional zeros to the screen
        currentNumber = value; 
        return;
    }
    if (value === '.' && currentNumber.length === 0){
        // If the first number chosen is a decimal, add a zero to the start of it
        currentNumber = '0.';
    }else{
        currentNumber = currentNumber + value;
    }
}

function removeNumber(){
    if(currentNumber.length === 1 || result !== null || 
       currentNumber.length === 2 && currentNumber.startsWith('-') ||
       currentNumber === '-0.'
    ){
        // Handle unexpected situations
        currentNumber = '0';
    }else{
        currentNumber = currentNumber.slice(0, currentNumber.length-1);
    }
}

function negateNumber(){
    if(currentNumber == '0'|| currentNumber === '' || result !== null) return;
    currentNumber = currentNumber.startsWith('-') ? currentNumber.slice(1) : `-${currentNumber}`;
}

function addOperator(input){
    if(currentNumber === '' && operator !== null){
        // Let the user change the operator if they have not entered a second operand
        operator = input;
    }else if(operator !== null){
        // Let the user string multiple calculations together
        operate();
        operator = input;
        previousNumber = currentNumber;
        currentNumber = '';
    }else{
        operator = input;
        previousNumber = currentNumber;
        currentNumber = '';
    }
}

function clearAll(){
    currentNumber = '0';
    previousNumber = '';
    operator = null;
    result = null;
}

function operate(){
    if(currentNumber === '' || operator === null) return; // Prevent unexpected results
    currentNumber = Number(currentNumber);
    previousNumber = Number(previousNumber);
    switch(operator){
        case '+':
            result = previousNumber + currentNumber;
        break;
        case '-':
            result = previousNumber - currentNumber;
        break;
        case 'x':
            result = previousNumber * currentNumber;
        break;
        case '÷':
            if(currentNumber === 0){
                result = 0;
                alert(`Please don't break the universe`);
            }else{
                result = previousNumber / currentNumber;
            }
        break
        default:
            return;
    }
    result = result.toString();
    currentNumber = result;
    previousNumber = '';
    operator = null;
}

function updateScreen(){
    // If the previous number is not empty, transform it to a number for readability purposes 
    // E.g "x.000" is displayed as "x" and "x." is displayed as "x"
    calcHistory.textContent = previousNumber === '' ? '' : Number(previousNumber);
    currentValue.textContent = currentNumber;
    if(operator !== null){
        calcHistory.textContent = `${Number(previousNumber)} ${operator}`;
    }
}

/* Adding functions to the calculator's buttons */

numbers.forEach(number => number.addEventListener('click', e =>{
    addNumber(e.target.textContent);
    updateScreen();
}));

clear.addEventListener('click', () => {
    clearAll();
    updateScreen();
})

operators.forEach(operator => operator.addEventListener('click', e =>{
    addOperator(e.target.textContent);
    updateScreen();
}));

equals.addEventListener('click', () => {
    operate();
    updateScreen();
})

deleteNumber.addEventListener('click', () => {
    removeNumber();
    updateScreen();
});

negation.addEventListener('click', () => {
    negateNumber();
    updateScreen();
});

/* Keyboard support */

window.addEventListener('keydown', e => {
    buttons.forEach(button => {
        if(e.key === button.getAttribute('data-key')){
            button.click(e);
        }
    })
});
