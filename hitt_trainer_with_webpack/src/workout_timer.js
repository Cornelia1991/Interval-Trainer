import { submitTask, setsInput, restInput } from "./workout_entry";

//define DOM Elements
const coundownMinutes = document.querySelector("#countdown-minutes");
const countdownSeconds = document.querySelector("#countdown-seconds");
const setCountUI = document.querySelector(".set-count");
const startBtn = document.querySelector("#start-btn");
const pauseBtn = document.querySelector("#pause-btn");
let exerciseName = document.querySelector("#exercise-name");
const timeCardMin = document.querySelector("#time-card-1");
const timeCardSec = document.querySelector("#time-card-2");
const progressBarUI = document.querySelector(".determinate");
let liveTime;

//Main function for index.js
export function workoutPage() {
  let exercise = submitTask();
  let sets = setsInput.value;
  //include the amount of rest at the end of each set
  let rest = restInput.value;
  for (let i = 0; i < rest; i++) {
    exercise.push("BREAK");
  }

  let startingMinutes = exercise.length;
  let time = startingMinutes * 60;
  let functionCount = 0;
  let minutes;
  let seconds;
  let next = 0;
  let currentSet = 1;
  let lastSet = false;
  coundownMinutes.innerHTML = startingMinutes;

  //funtion to control the time
  function timeControl() {
    liveTime = setInterval(updateCountdown, 1000);
  }

  //start button event
  function start() {
    timeControl();
    removePulse();
  }

  //pause button event
  function pause() {
    clearInterval(liveTime);
    addPulse();
  }

  //Call setCount for start UI
  setsCount();

  //start button event
  startBtn.addEventListener("click", start);

  //pause button event
  pauseBtn.addEventListener("click", pause);

  //Call setCount for start UI
  setsCount(currentSet);

  function updateCountdown() {
    minutes = Math.floor(time / 60);
    seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    coundownMinutes.innerHTML = minutes;
    countdownSeconds.innerHTML = seconds;

    //decrease the time
    time--;

    if (time == 0) {
      //tracks and loops through sets
      setsCount(++currentSet);
    }

    //count the amount of time function called
    functionCount++;
    //change progress bar
    if (functionCount == 60) {
      functionCount = 0;
      next++;
    }
    progressBarUI.style.width = `${functionCount * 1.67}%`;

    if (next == startingMinutes) {
      next = 0;
    }
    // exercises call
    exerciseList(exercise[next]);
  }

  //function for exercises call
  function exerciseList(next_exercise) {
    if (lastSet == true) {
      exerciseName.innerHTML = "Workout Complete";
      pause();
    }
    //Break styling
    else if (next_exercise === "BREAK") {
      exerciseName.innerHTML = "REST";
      timeCardMin.classList.replace("darken-4", "darken-1");
      timeCardSec.classList.replace("darken-4", "darken-1");
      setCountUI.classList.add("hide");
    } else if (next_exercise !== "BREAK") {
      exerciseName.innerHTML = next_exercise;
      timeCardMin.classList.replace("darken-1", "darken-4");
      timeCardSec.classList.replace("darken-1", "darken-4");
      setCountUI.classList.remove("hide");
    } else {
      //get the exercise list
      exerciseName.innerHTML = next_exercise;
    }
  }

  //tracks and loops through sets
  function setsCount(count) {
    //stop the time on last set
    if (currentSet > sets) {
      lastSet = true;
      setCountUI.innerHTML = "YOU DID IT!";
      pause();
    } else {
      setCountUI.innerHTML = `Set ${count}`;
      time = startingMinutes * 60;
    }
  }
}

//Add Pulse
function addPulse() {
  timeCardSec.classList.add("pulse");
  timeCardMin.classList.add("pulse");
}

//Remove Pulse
function removePulse() {
  timeCardSec.classList.remove("pulse");
  timeCardMin.classList.remove("pulse");
}
