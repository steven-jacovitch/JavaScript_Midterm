const timeOutput = document.querySelector('#time-output')
// This function updates timeOutput with the current datetime.
const updateTime = () => {
  timeOutput.textContent = new Date();
}
// DO NOT CHANGE 👆🏻 CODE ABOVE

//
// @TODO: Get this to match the example
// -- the datetime shows as soon as the page loads
// -- when you click the button, the datetime updates with a blue
//    outline around it because the element it is in now has the
//    `from-a-button-click` class.
// TIP TIP TIP: Look at the code provided above and USE IT.

// Answer key solution is 5 additional lines.
updateTime();
const button = document.querySelector('#check-time');
button.addEventListener('click', () => {
  updateTime();
  timeOutput.classList.add('from-a-button-click');
});

