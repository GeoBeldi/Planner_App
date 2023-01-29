// Select saveBtn and store it in a variable
const saveBtn = $(".saveBtn");
const timeDisplayEl = $("#time-display");

// Display the current day at the top of the calender when a user opens the planner
// handle displaying the time
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  timeDisplayEl.text(rightNow);
}

// Each time the block is color-coded in order to indicate
// whether it is in the past, present or future
function timeBlockColor() {
  var hour = moment().hours();

  $(".time-block").each(function () {
    var currHour = parseInt($(this).attr("id"));

    // console.log(this); //each time-block

    if (currHour > hour) {
      $(this).addClass("future");
    } else if (currHour === hour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("past");
    }
  });
}
// When I click the save button for my time block
saveBtn.on("click", function () {
  // console.log(this); //save button
  var time = $(this).siblings(".hour").text();
  var plan = $(this).siblings(".plan").val();
  // THEN the text for that event is saved in local storage
  localStorage.setItem(time, plan);
});
// WHEN I refresh the page
// THEN the saved events persist
function usePlanner() {
  $(".hour").each(function () {
    var currHour = $(this).text();
    var currPlan = localStorage.getItem(currHour);

    // console.log(this);
    // console.log(currHour);

    if (currPlan !== null) {
      $(this).siblings(".plan").val(currPlan);
    }
  });
}

// We call the functions
timeBlockColor();
usePlanner();
setInterval(displayTime, 1000);
