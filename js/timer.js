class CountdownTimer {

  constructor({ selector } = {}) {
   
    this.selector = selector;

    this.refs = {
      targetTime: new Date(),
      timerId: null,

      days: document.querySelector(`${this.selector} .timer__days`),
      hours: document.querySelector(`${this.selector} .timer__hours`),
      mins: document.querySelector(`${this.selector} .timer__minutes`),
      sec: document.querySelector(`${this.selector} .timer__seconds`),

      inputDate: document.querySelector(`${this.selector} .input-date-time`),

      startAction:document.querySelector(`${this.selector} [data-action="start"]`),
      stopAction :document.querySelector(`${this.selector} [data-action="stop"]`),
      resetAction:document.querySelector(`${this.selector} [data-action="reset"]`),
    };
// =========== start countdown timer ===========
    this.reset(); 
// =========== buttons ============
    this.refs.startAction.addEventListener('click', () => this.start(this.refs));
    this.refs.stopAction.addEventListener('click', () => this.stop(this.refs));
    this.refs.resetAction.addEventListener('click', () => this.reset(this.refs));
  }
  
  displayCount(diff, refs) {
    // console.log('displayCount', diff); // <<< --- отладка
    
    let days = ~~(diff / 86400);
    let hours = ~~(diff / 3600) % 24;
    let minutes = ~~(diff / 60) % 60;
    let seconds = ~~(diff) % 60;

    refs.days.textContent = days < 10 ? '0' + days : days;
    refs.hours.textContent = hours < 10 ? '0' + hours : hours;
    refs.mins.textContent = minutes < 10 ? '0' + minutes : minutes;
    refs.sec.textContent = seconds < 10 ? '0' + seconds : seconds;

    refs.days.dataset.title = 'Days';
    refs.hours.dataset.title = 'Hours';
    refs.mins.dataset.title = 'Minutes';
    refs.sec.dataset.title = 'Seconds';
  }
  
  start(refs) {
    // console.log('start'); // <<< --- отладка

    if (this.refs.timerId) return;
    this.refs.targetTime = new Date(this.refs.inputDate.value).getTime();
    
    if (this.refs.targetTime - new Date() <= 0) {
      alert('The entered date is not from the future');
      return;
    };

    if (!this.refs.targetTime) {
      alert('Enter a future date');
      return;
    };
    
    this.refs.timerId = setInterval(() => {
      // console.log('timer'); // <<< --- отладка

      const diff = (this.refs.targetTime - new Date()) / 1000;
      if (diff <= 0) clearInterval(this.refs.timerId);

      this.displayCount(diff, this.refs);
    }, 250);
  }

  stop(refs) {
    // console.log('stop'); // <<< --- отладка

    clearInterval(this.refs.timerId);
    this.refs.timerId = 0;
  }

  reset(refs) {
    // console.log('reset'); // <<< --- отладка

    clearInterval(this.refs.timerId);
    this.displayCount(0, this.refs);
    this.refs.timerId = 0;
    this.refs.inputDate.value = '';
  }
};

// ======= init timer =========
const timer1 = new CountdownTimer({ selector: '#timer-1' });
const timer2 = new CountdownTimer({ selector: '#timer-2' });
const timer3 = new CountdownTimer({ selector: '#timer-3' });
