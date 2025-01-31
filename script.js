const inputBox = document.getElementById('inputBox');
const buttons = document.querySelectorAll('.button');
const equalsButton = document.querySelector('.samadengan');

buttons.forEach(button => button.addEventListener('click', () => {
  const buttonText = button.textContent;
  if (buttonText === 'AC') inputBox.value = '';
  else if (buttonText === 'DEL') inputBox.value = inputBox.value.slice(0, -1);
  else if (buttonText === '%') inputBox.value = (parseFloat(inputBox.value) / 100).toString();
  else if (['+', '-', 'x', '&div;'].includes(buttonText)) {
    inputBox.value += ` ${buttonText === 'x' ? '*' : buttonText === '&div;' ? '/' : buttonText} `;
  } else inputBox.value += buttonText;
}));

equalsButton.addEventListener('click', () => {
  try {
    inputBox.value = eval(inputBox.value.replace('x', '*').replace('&div;', '/'));
  } catch {
    inputBox.value = 'Error';
  }
});
