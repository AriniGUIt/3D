document.addEventListener("DOMContentLoaded", function() {
  const clickButton = document.getElementById("click-button");
  const clicksDisplay = document.getElementById("clicks");
  const doubleClicksButton = document.getElementById("double-clicks");
  const tripleClicksButton = document.getElementById("triple-clicks");
  // Add more variables for other shop items

  let clicks = 0;

  clickButton.addEventListener("click", function() {
    clicks++;
    clicksDisplay.textContent = clicks;
  });

  doubleClicksButton.addEventListener("click", function() {
    if (clicks >= 50) {
      clicks -= 50;
      clicks *= 2;
      clicksDisplay.textContent = clicks;
    } else {
      alert("You don't have enough clicks!");
    }
  });

  tripleClicksButton.addEventListener("click", function() {
    if (clicks >= 1000) {
      clicks -= 1000;
      clicks *= 3;
      clicksDisplay.textContent = clicks;
    } else {
      alert("You don't have enough clicks!");
    }
  });

  // Add event listeners for other shop items
});
