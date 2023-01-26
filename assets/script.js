let unixCode = dayjs().unix();
let i;
let task = document.querySelector("#task");

let section = document.querySelector("#color");
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  for (i = 9; i < 17; i++) {


    let currentTime = dayjs().format("H");
    console.log(i + "  " + currentTime)
    if (i == currentTime) {
      $("#color").addClass("present");
      console.log(currentTime);
    } else if (i > currentTime) {
      $("#color").addClass("future");
    } else {
      $("#color").addClass("past");
    }
    
    $("#color").clone().appendTo("main"); //copying whole section with id of color and pasting it 8 times into the main body
    $("#color").attr("id", i); //giving all sections an id number of i
    let time = document.getElementById(i).children[0];
    time.textContent = (dayjs().set("hour", i).format("ha"));

  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").click(function (event) {
    event.preventDefault();

    console.log("ello mate" + $("section"));
    localStorage.setItem("task", task.value);
    localStorage.getItem("task");

    //for whichever section's button is pressed, save values into an object


  })


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  // console.log(currentTime);
  // console.log(JSON.stringify(time));
  // console.log($("div"));






  //figure out how to time difference

  //if hour= time make red

  //if hour > time, make green

  //if hour < time, make grey

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  //calling the function that makes all the rows


  // TODO: Add code to display the current date in the header of the page.

  $("#currentDay").text(dayjs().format("dddd, MMMM DD"));
});



/////////////function copying and pasting section ///////////
// https://www.w3schools.com/jsref/met_node_clonenode.asp



//let current2 = dayjs.unix(unixCode).format("h"); //12 hour time