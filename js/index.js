const refs = {
  days: document.querySelector('.timer__days'),
  hours: document.querySelector('.timer__hours'),
  minutes: document.querySelector('.timer__minutes'),
  seconds: document.querySelector('.timer__seconds'),
};

let targetTime = new Date();

let timerId = null;

function displayCounter(diff) {
  let days = ~~(diff / 86400);
  let hours = ~~(diff / 3600) % 24;
  let minutes = ~~(diff / 60) % 60;
  let seconds = ~~(diff) % 60;

  refs.days.textContent = days < 10 ? '0' + days : days;
  refs.hours.textContent = hours < 10 ? '0' + hours : hours;
  refs.minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
  refs.seconds.textContent = seconds < 10 ? '0' + seconds : seconds;

  refs.days.dataset.title = 'Days';
  refs.hours.dataset.title = 'Hours';
  refs.minutes.dataset.title = 'Minutes';
  refs.seconds.dataset.title = 'Seconds';
};

function start() {
  if (timerId) return;
  targetTime = new Date(document.querySelector('.input-date-time').value).getTime();
  if (targetTime - new Date() <= 0) {
    alert('The entered date is not from the future');
    return;
  };
  timerId = setInterval(() => {
    const diff = (targetTime - new Date()) / 1000;
    if (diff <= 0) clearInterval(timerId);
    displayCounter(diff);
    }, 250);
};

function stop() {
  clearInterval(timerId);
  timerId = 0;
};

function reset() {
  clearInterval(timerId);
  displayCounter(0);
  timerId = 0;
  document.querySelector('.input-date-time').value = '';
};

reset();

document.querySelector('[data-action="start"]').addEventListener('click', start);
document.querySelector('[data-action="stop"]').addEventListener('click', stop);
document.querySelector('[data-action="reset"]').addEventListener('click', reset);