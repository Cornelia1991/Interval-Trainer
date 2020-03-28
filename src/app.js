const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const taskInput = document.querySelector('#task');
const submitBtn = document.querySelector('.submit-task')
const setsForm = document.querySelector('#sets-form');
const setsInput = document.querySelector('#sets-input');
const description = document.querySelector('.description');
const suggestionsUI = document.querySelector('.suggestionsUI');
const fulldescription = document.createElement('p');

let allTask = []; //used in submitTask()
let setsInputValue; 

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
  submitBtn.addEventListener('click', submitTask);

  //Submit amount of sets
  submitBtn.addEventListener('click', setNumber);

  //Add suggestion
  suggestionsUI.addEventListener('click', addSuggestion);
}


//Add Task
function addTask(e)
{
  if(taskInput.value ==='')
    {
      M.toast({html: 'ADD A TASK', classes: 'red'})
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
      link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
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
        M.toast({html: 'Deleted', classes: 'red lighten-2'})
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
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item != '')
      {
        allTask.push(item);
      }
  });
  return allTask;
  //console.log(allTask);
}

//Submit amount of sets
function setNumber()
{
  if(setsInput.value ==='')
  {
    M.toast({html: 'Enter Amount of Sets', classes: 'red lighten-2'});
  }
  else if( allTask.length === 0)
  {
    M.toast({html: 'ADD A TASK', classes: 'red lighten-2'})
  }
  else
  {
    setsInputValue = setsInput.value;
    //submitBtn.href = "workout.html";
  }
  //console.log(setsInput.value);
  //console.log(taskInput.value);
}

//Add suggestion to list
function addSuggestion(e)
{
  //only select the help links
  if (e.target.className == 'help')
  {
    //Add item to list
    if(confirm('Add To Excise List?'))
    {
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
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append li to ul on dom
    taskList.appendChild(li);

    //place description in div
    e.target.style.color = '#bdbdbd';
    let descriptionHead = document.querySelector('.description-head');
    descriptionHead.classList.remove('hide');
    descriptionHead.classList.add('show');
    descriptionHead.innerHTML = 'Exercise Description';
    fulldescription.innerHTML = e.target.innerText;
    fulldescription.innerHTML += ':';
    description.appendChild(fulldescription);
    }
  }
}