let exercise = ["JUMPING JACKS", "PUSH UPS"];
exercise.push('BREAK');
let sets = 2;
let startingMinutes = exercise.length;
let time = startingMinutes * 60;
const coundownMinutes = document.querySelector('#countdown-minutes');
const countdownSeconds = document.querySelector('#countdown-seconds');
const setCountUI = document.querySelector('.set-count');
const startBtn = document.querySelector('#start-btn');
const pauseBtn = document.querySelector('#pause-btn');
let exerciseName = document.querySelector('#exercise-name');
const timeCardMin = document.querySelector('#time-card-1');
const timeCardSec = document.querySelector('#time-card-2');
const progressBarUI = document.querySelector('.determinate');
let functionCount = 0;
let liveTime;
let minutes;
let seconds;
let next = 0;
let currentSet = 1;
let lastSet = false;

// import allTask from './app';
// import setsInputValue from './app';
// import test from './app';
//console.log(setsInputValue, test);

//set beginning munites
coundownMinutes.innerHTML= startingMinutes;
setsCount();

//Load all event listeners
loadEventListeners();

function loadEventListeners()
{
  //start button event
  startBtn.addEventListener("click", start);

  //pause button event
  pauseBtn.addEventListener("click", pause);
}

//funtion to control the time
function timeControl ()
{
  liveTime = setInterval(updateCountdown, 1000);
}

//start button event
function start()
{
  timeControl();
  removePulse();
}


//pause button event
function pause()
{
  clearInterval(liveTime);
  addPulse();
}

//Call setCount for start UI
setsCount(currentSet);

function updateCountdown()
{
  minutes = Math.floor(time / 60);
  seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  coundownMinutes.innerHTML = minutes;
  countdownSeconds.innerHTML = seconds;

  //decrease the time
  time--;
  
  if (time == 0)
  {
    //tracks and loops through sets
    setsCount(++currentSet);
  }
  
  //count the amount of time function called
  functionCount++;
  //change progress bar
  if(functionCount == 60) 
  {
    functionCount = 0;
    next++;
  }
  progressBarUI.style.width = `${functionCount * 1.67}%`;
  
  if(next == startingMinutes)
  {
    next = 0;
  }
    // exercises call
    exerciseList(exercise[next]);
}



//function for exercises call
function exerciseList(next_exercise)
{
  if(lastSet == true)
  {
    console.log(exercise[2]);
    exerciseName.innerHTML = 'Workout Complete';
    pause();
  }
  //Break styling
  else if (next_exercise === "BREAK")
  {
    exerciseName.innerHTML = 'REST';
    timeCardMin.classList.remove('teal');
    timeCardMin.classList.add('grey');
    timeCardSec.classList.remove('teal');
    timeCardSec.classList.add('grey');
  }
  else if(next_exercise !== "BREAK")
  {
  exerciseName.innerHTML = next_exercise;
  timeCardMin.classList.remove('grey');
  timeCardMin.classList.add('teal');
  timeCardSec.classList.remove('grey');
  timeCardSec.classList.add('teal');
  }
  else
  {
    //get the exercise list
    exerciseName.innerHTML = next_exercise;
  }
}



//tracks and loops through sets
function setsCount(count)
{
  //stop the time on last set
  if (currentSet > sets)
  {
    lastSet = true;
    setCountUI.innerHTML = 'YOU DID IT!';
    pause();
  }
  else
  {
    setCountUI.innerHTML = `Set ${count}`;
    time = startingMinutes * 60;
  }
}


//Add Pulse
function addPulse()
{
    timeCardSec.classList.add('pulse');
    timeCardMin.classList.add('pulse');
}

//Remove Pulse
function removePulse()
{
    timeCardSec.classList.remove('pulse');
    timeCardMin.classList.remove('pulse');
}