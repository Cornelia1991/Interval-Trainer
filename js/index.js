const entry = document.querySelector('#entry-container');
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const taskInput = document.querySelector('#task');
const submitBtn = document.querySelector('.submit-task')
const setsForm = document.querySelector('#sets-form');
const setsInput = document.querySelector('#sets-input');
const restInput = document.querySelector('#rest-input');
const description = document.querySelector('.description');
const suggestionsUI = document.querySelector('.suggestionsUI');
const fulldescription = document.createElement('p');
const workoutTimer = document.querySelector('#workout-timer');
//let workoutPage = false;


//Load all event listeners
loadEventListeners();

//Laod all event listener
function loadEventListeners()
{
  //Add task event
  form.addEventListener('submit', addTask);
  
  //Remove task event
  taskList.addEventListener('click', removeTask);
  
  //Clear task event
  clearBtn.addEventListener('click', clearTask);
  
  //Submit task event
  //submitBtn.addEventListener('click', submitTask);

  //Submit amount of sets
  //submitBtn.addEventListener('click', setNumber);

  //Add suggestion
  suggestionsUI.addEventListener('click', addSuggestion);
}


//Add Task
function addTask(e)
{
  if(taskInput.value ==='')
    {
      M.toast({html: 'ADD A TASK', classes: 'red darken-4'})
    }
    else
    {
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item hoverable';
      //Create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));
      //Create ne link element
      const link = document.createElement('a');
      //Add class
      link.className = 'delete-item secondary-content';
      //Add remove icon
      link.innerHTML = '<i class="fas fa-trash-alt"></i>';
      //Append the link to the li
      li.appendChild(link);
      
      //Append li to ul on dom
      taskList.appendChild(li);
      
      //Clear input
      taskInput.value = "";
    }

  e.preventDefault();
}

//Remove Task
function removeTask(e)
{
  //target the remove link - x
  if(e.target.parentElement.classList.contains('delete-item'))
    {
      //remove the whole li
      if(confirm('Are You Sure?'))
      {
        e.target.parentElement.parentElement.remove();
        M.toast({html: 'Deleted', classes: 'red darken-4'})
      }
    }
}

//Clear task event
function clearTask()
{
  //while there is a firstchild remove it
  while(taskList.firstChild)
    {
      taskList.removeChild(taskList.firstChild);
    }
}



//Submit task event
function submitTask()
{
  let allTask = [];
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item != '')
      {
        allTask.push(item);
      }
  });
    return allTask;
}


//Submit amount of sets
function setNumber()
{
  if(setsInput.value ==='' )
  {
    M.toast({html: 'Enter Amount of Sets', classes: 'red darken-4'});
  }
  else if(restInput.value ==='' )
  {
    M.toast({html: 'Enter Amount of Rest', classes: 'red darken-4'});
  }
  else
  {
    workoutPage();
    submitBtn.href = "#workout-timer";
    workoutTimer.classList.remove("hide");
    entry.classList.add("hide");
  }
  //return setsInput.value;
}

//Add suggestion to list
function addSuggestion(e)
{
  //only select the help links
  if (e.target.className == 'help')
  {
    M.toast({html: 'Added!', classes: 'green darken-1'});
    //Add item to list
    // if(confirm('Add To Excise List?'))
    // {
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(e.target.innerText));
    //Create ne link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add remove icon
    link.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append li to ul on dom
    taskList.appendChild(li);
    //}
  }
}







//WORKOUT AREA


function workoutPage()
{
  let exercise = submitTask();
  let sets = setsInput.value;
  let rest = restInput.value;
  for (let i = 0; i < rest; i++)
  {
    exercise.push("BREAK")
  }
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
  coundownMinutes.innerHTML= startingMinutes;



  setsCount();
  
  //start button event
  startBtn.addEventListener("click", start);

  //pause button event
  pauseBtn.addEventListener("click", pause);
  
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
      exerciseList(exercise[next].toUpperCase());
  }
  
  
  
  //function for exercises call
  function exerciseList(next_exercise)
  {
    if(lastSet == true)
    {
      exerciseName.innerHTML = 'Workout Complete';
      pause();
    }
    //Break styling
    else if (next_exercise === "BREAK")
    {
      exerciseName.innerHTML = 'REST';
      timeCardMin.classList.replace('darken-4', 'darken-1');
      timeCardSec.classList.replace('darken-4', 'darken-1');
      setCountUI.classList.add('hide');
    }
    else if(next_exercise !== "BREAK")
    {
    exerciseName.innerHTML = next_exercise;
    timeCardMin.classList.replace('darken-1', 'darken-4');
    timeCardSec.classList.replace('darken-1', 'darken-4');
    setCountUI.classList.remove('hide');
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
}