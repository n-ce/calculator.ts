const operationButtons = Array.from(document.getElementsByClassName('operation'));

const numberButtons = Array.from(document.getElementsByClassName('number'));

const display = <HTMLInputElement>document.getElementById('display');

const backspaceButton = document.getElementById('backspace');

const resultButton = document.getElementById('result');

const clearButton = document.getElementById('clear');


let storedNumber = 0;
let storedOperator = '';
let operationActive = false;

for (const button of operationButtons) {
  button.addEventListener('click', () => {
    if (operationActive) return;
    operationActive = true;
    storedNumber = parseInt(display.value);
    storedOperator = button.textContent || '';
    display.value = '';
    operationButtons
      .filter(btn => btn.textContent !== button.textContent)
      .map(e => e.classList.add('hide'));

  })
}

for (const button of numberButtons) {
  button.addEventListener('click', () => {
    if (display.value.length === 11) {
      alert('Limit for Digits Reached.');
      return;
    }
    display.value += button.textContent;
  })
}


function calculate(operator: string, num1: number, num2: number): number {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '×':
      return num1 * num2;
    case '÷':
      return num1 / num2;
    default:
      throw new Error('Failed operator');
  }
}


resultButton?.addEventListener('click', () => {
  if (!operationActive) return;
  display.value =
    calculate(
      storedOperator,
      storedNumber,
      parseInt(display.value)
    ).toString();

  for (const button of operationButtons)
    button.classList.remove('hide');

  operationActive = false;
});



function backspace() {
  display.value = display.value.slice(0, -1);
}

backspaceButton?.addEventListener('click', backspace);

document.addEventListener('keydown', e => {
  if (e.key === "Backspace") backspace();
});

clearButton?.addEventListener('click', () => {
  display.value = '';
  storedNumber = 0;
})