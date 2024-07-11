// Variables globales
let currentNumber = '';
let previousNumber = '';
let currentOperator = '';
let shouldResetScreen = false;

// Seleccionar elementos del DOM
const upperScreen = document.querySelector('.upper-screen');
const currentScreen = document.querySelector('.current-screen');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.special');
const equalsButton = document.querySelector('.number:nth-child(3)');
const clearButton = document.querySelector('.first:nth-child(1)');
const deleteButton = document.querySelector('.first:nth-child(2)');

currentScreen.textContent = 0;

// Mapeo de teclas
const keyboardMap = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': '.', 
  '+': '+', '-': '-', '*': 'x', '/': '÷',
  'Enter': '=', '=': '=',
  'Backspace': 'DELETE', 'Delete': 'DELETE',
  'Escape': 'CLEAR', 'c': 'CLEAR', 'C': 'CLEAR'
};

// Funciones de la calculadora
function appendNumber(number) {
  if (currentScreen.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }

  currentScreen.textContent += number;
}

function resetScreen() {
  currentScreen.textContent = '';
  shouldResetScreen = false;
}

function setOperator(operator) {
  if (currentOperator !== '') {
    calculate();
  }
  previousNumber = currentScreen.textContent;
  currentOperator = operator;
  upperScreen.textContent = `${previousNumber} ${currentOperator}`;
  shouldResetScreen = true;
}

function calculate() {
  if (currentOperator === '' || shouldResetScreen) return;
  
  const current = parseFloat(currentScreen.textContent);
  const previous = parseFloat(previousNumber);
  const result = operate(currentOperator, previous, current);
  
  upperScreen.textContent = `${previousNumber} ${currentOperator} ${current} =`;
  currentScreen.textContent = result;
  currentOperator = '';
}

function clear() {
  currentScreen.textContent = '0';
  upperScreen.textContent = '';
  previousNumber = '';
  currentOperator = '';
}

function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent.slice(0, -1);
  if (currentScreen.textContent === '') {
    currentScreen.textContent = '0';
  }
}

// Función para manejar entradas de teclado
function handleKeyboardInput(e) {
  if (keyboardMap.hasOwnProperty(e.key)) {
    e.preventDefault();
    const key = keyboardMap[e.key];
    
    if ('0123456789.'.includes(key)) {
      appendNumber(key);
    } else if ('+-x÷'.includes(key)) {
      setOperator(key);
    } else if (key === '=') {
      calculate();
    } else if (key === 'DELETE') {
      deleteNumber();
    } else if (key === 'CLEAR') {
      clear();
    }
  }
}

// Event listeners
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === '=') {
      calculate();
    } else {
      appendNumber(button.textContent);
    }
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => setOperator(button.textContent));
});

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);

// Añadir event listener para entradas de teclado
document.addEventListener('keydown', handleKeyboardInput);

// Funciones matemáticas
function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number2 !== 0 ? number1 / number2 : 'Error';
}

function operate(operator, number1, number2) {
  const operationMap = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '÷': divide,
  };

  if (!operationMap[operator]) {
    console.log('Error: Operador no soportado');
    return;
  }

  return operationMap[operator](number1, number2);
}