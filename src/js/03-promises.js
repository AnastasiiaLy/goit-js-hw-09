import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

const form = document.querySelector('.form');
let delay = parseInt(delayInput.value);

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (delay < 0 || step < 0 || amount <= 0) {
    Notify.failure('These values should be higher than 0');
  }

  {
    for (let i = 1; i <= amount; i += 1) {
      const position = i;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
    }
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
