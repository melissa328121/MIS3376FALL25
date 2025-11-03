/*
Program name: hw1.js
Author: Melissa Alfaro
Date created: 9/14/25
Date last edited: 9/26/25
Version: 1.0
Description: Homework 1 Patient Registration Javascript Form
*/

// dynamic date js code 

// function to add the correct ending to a date 
function getOrdinal(num) {
  if (num > 3 && num < 21) return num + "th"; // special case for 11th–19th
  switch (num % 10) {
    case 1: return num + "st"; // st
    case 2: return num + "nd"; // nd
    case 3: return num + "rd"; // rd
    default: return num + "th"; // everything else
  }
}

// create a new today date
const d = new Date();

// get the weekday name 
const weekday = d.toLocaleString('en-US', { weekday: 'long' });

// get the full month name 
const month = d.toLocaleString('en-US', { month: 'long' });

// get the day with the correct ending 
const day = getOrdinal(d.getDate());

// get the full year 
const year = d.getFullYear();

// put the full date into the element with id="today"
document.getElementById("today").innerHTML = `${weekday}, ${month} ${day}, ${year}`;


// range slider javascript

// find the slider and the output display by their IDs
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");

// set the initial value of the output to match the slider's value
output.innerHTML = slider.value;

// update the output whenever the slider is moved
slider.oninput = function () {
  output.innerHTML = this.value;
};

