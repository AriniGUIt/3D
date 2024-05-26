document.addEventListener("DOMContentLoaded", function() {
  const clickButton = document.getElementById("click-button");
  const scoreDisplay = document.getElementById("score");
  let score = 0;

  clickButton.addEventListener("click", function() {
    score++;
    scoreDisplay.textContent = score;
  });
});
