function inputFilled(target) {
  setTimeout(() => {
    target.classList.add("animated"); // Adding class for animation

    setTimeout(() => {
      target.classList.remove("animated"); // Removing class after animation duration
    }, 500);
  }, 10); // Adding a slight delay to ensure class removal before re-adding it
}

function wobble(target, border) {
  if (border) {
    target.classList.add("redBorder");
  }
  target.classList.add("wobbleAnimation");
  setTimeout(function () {
    target.classList.remove("redBorder", "wobbleAnimation");
  }, 900);
}
