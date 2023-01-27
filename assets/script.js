let task = document.getElementsByClassName("task");
let currentTime = dayjs().format("H");
let history = [];

$(function () {
  createSections();

  //////////////////// Display saved text ////////////////////
  history = JSON.parse(localStorage.getItem("history")) || []; //retrieveing the stored data and making it into js object
  let display = history.map(obj => obj.hour); //making an array of previous hours with entries

  for (let j = 0; j < display.length; j++) { //going through the length of the array
    let elementId = display[j]; //setting elementId to the values of the array
    let previousText = document.getElementById(elementId).children[1]; //targeting the text area of each section
    previousText.textContent = history[j].task; //displaying the values we got from history
  }


  //////////////////// Listening if button is clicked ////////////////////
  $(".saveBtn").click(function (event) {
    event.preventDefault();
    let btnId = event.currentTarget.parentElement.id; //finds the id of the button pressed
    let taskInput = document.getElementById(btnId).children[1].value.trim(); //getting the input value of the text

    let saveTask = {  //creating an object with "hour" and "task" for each entry
      hour: btnId,
      task: taskInput
    };

    //seeing if text is already entered for that hour
    let previous = history.map(obj => obj.hour); //getting an array of hours with previous text entries

    if (previous.includes(btnId)) { //checks if the btnId() is already in the array
      let index = previous.findIndex(x => x == btnId); //finding the index of the old text
      history.splice(index, 1, saveTask); //removing the value in the previous index and replacing it with the new one
    } else {
      history.push(saveTask); //otherwise, add it to history array
    }

    localStorage.setItem("history", JSON.stringify(history)); //saving history list to our local storage
  })


  //////////////////// displaying the current date ////////////////////
  $("#currentDay").text(dayjs().format("dddd, MMMM DD"));
});



/////////////duplicating sections and setting the color ///////////
// https://www.w3schools.com/jsref/met_node_clonenode.asp

let createSections = function () {

  for (let i = 9; i < 18; i++) { //starting at 9 for 9am-5pm work day

    //setting the color blocks for present(red), future(green), and past(grey)
    if (i == currentTime) {
      $("#color").addClass("present");
    } else if (i > currentTime) {
      $("#color").addClass("future");
    } else {
      $("#color").addClass("past");
    }

    //duplicating the section with id="color" 9 times
    $("#color").clone().appendTo("main"); //copying whole section node and attaching it to the main element
    $("#color").attr("id", i); //giving all sections an id number of i (also corresponds to the hour)

    //targeting each section and displaying the time in 12hr format
    let time = document.getElementById(i).children[0];
    time.textContent = (dayjs().set("hour", i).format("ha"));
  }
  $("#color").remove(); //removing the original empty section
}