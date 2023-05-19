import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.querySelector('button[data-start]');

const daysOfTimer = document.querySelector('.value[data-days]');
const hoursOfTimer = document.querySelector('.value[data-hours]');
const minutesOfTimer = document.querySelector('.value[data-minutes]');
const secondsOfTimer = document.querySelector('.value[data-seconds]');

startBtn.addEventListener('click', onStartCountDifference);
startBtn.disabled = true;

let selectedDate;
let dateFromCount;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    onDatePicker(selectedDate);
  },
};

flatpickr('#datetime-picker', options);

function onDatePicker(selectedDate) {
  const dateToStart = Date.parse(selectedDate);
  const currentDate = Date.now();
  if (dateToStart < currentDate) {
    Report.failure(
      'Please choose a date in the future',
      'The past is a place to learn from, not to live in',
      ' Okay'
    );

    return;
  }
  startBtn.disabled = false;
}

function onStartCountDifference() {
  const timerId = setInterval(() => {
    onDatePicker(selectedDate);
    dateFromCount = Date.now();

    const timeDifference = Date.parse(selectedDate) - dateFromCount;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    //console.log({ days, hours, minutes, seconds });
    daysOfTimer.textContent = days;
    hoursOfTimer.textContent = hours;
    minutesOfTimer.textContent = minutes;
    secondsOfTimer.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
