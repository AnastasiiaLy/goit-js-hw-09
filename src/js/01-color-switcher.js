const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBtn.disabled = false;
let timerId = null;

const DELAY = 1000;
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalSetup();
  startBtn.disabled = true;
}

function intervalSetup() {
  timerId = setInterval(() => {
    onChangeBackgroundColor();
  }, DELAY);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onChangeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function onStopBtnClick() {
  startBtn.disabled = false;
  clearInterval(timerId);
}
