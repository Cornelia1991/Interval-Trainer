import { workoutPage } from "./workout_timer.js";

const entry = document.querySelector("#entry-container");
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const taskInput = document.querySelector("#task");
const submitBtn = document.querySelector(".submit-task");
const setsForm = document.querySelector("#sets-form");
export const setsInput = document.querySelector("#sets-input");
export const restInput = document.querySelector("#rest-input");
const description = document.querySelector(".description");
const suggestionsUI = document.querySelector(".suggestionsUI");
const fulldescription = document.createElement("p");
const workoutTimer = document.querySelector("#workout-timer");

//Load all event listeners
//loadEventListeners();

//Laod all event listener
export function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);

  //Remove task event
  taskList.addEventListener("click", removeTask);

  //Clear task event
  clearBtn.addEventListener("click", clearTask);

  //Submit task event
  submitBtn.addEventListener("click", submitTask);

  //Submit amount of sets
  submitBtn.addEventListener("click", setNumber);

  //Add suggestion
  suggestionsUI.addEventListener("click", addSuggestion);
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    M.toast({ html: "ADD A TASK", classes: "red darken-4" });
  } else {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item hoverable";
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create ne link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";
    //Add remove icon
    link.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
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
function removeTask(e) {
  //target the remove link - x
  if (e.target.parentElement.classList.contains("delete-item")) {
    //remove the whole li
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      M.toast({ html: "Deleted", classes: "red darken-4" });
    }
  }
}

//Clear task event
function clearTask() {
  //while there is a firstchild remove it
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Submit task event
export function submitTask() {
  let allTask = [];
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item != "") {
      allTask.push(item);
    }
  });
  return allTask;
}

//Submit amount of sets
export function setNumber() {
  if (setsInput.value === "") {
    M.toast({ html: "Enter Amount of Sets", classes: "red darken-4" });
  } else if (restInput.value === "") {
    M.toast({ html: "Enter Amount of Rest", classes: "red darken-4" });
  } else {
    workoutPage();
    submitBtn.href = "#workout-timer";
    workoutTimer.classList.remove("hide");
    entry.classList.add("hide");
  }
  //return setsInput.value;
}

//Add suggestion to list
function addSuggestion(e) {
  //only select the help links
  if (e.target.className == "help") {
    M.toast({ html: "Added!", classes: "green darken-1" });
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //Create text node and append to li
    li.appendChild(document.createTextNode(e.target.innerText));
    //Create ne link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";
    //Add remove icon
    link.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    //Append the link to the li
    li.appendChild(link);
    //Append li to ul on dom
    taskList.appendChild(li);
    //}
  }
}
