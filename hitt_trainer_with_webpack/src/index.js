import './style.css';
import {loadEventListeners} from './workout_entry.js';
import {workoutPage} from './workout_timer.js';

//for the suggeations modal
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

//used for workout_entry.js
loadEventListeners();

//used for workout_timer.js
workoutPage();
