const buttons = document.querySelectorAll(".button");
const inputs = document.querySelectorAll('.input-field[data-editable="false"]');

buttons.forEach((button) => {
  button.addEventListener("dragstart", dragStart);
  //button.addEventListener("touchstart", dragStart); // Touchstart event for touchscreens
  button.addEventListener("click", num);
});

inputs.forEach((input) => {
  input.addEventListener("dragover", dragOver);
  input.addEventListener("drop", drop);
  input.addEventListener("click", clearInput);
  input.addEventListener("dragenter", dragEnter);
  input.addEventListener("dragleave", dragLeave);
  //input.addEventListener("touchmove", touchMove); // Touchmove event for touchscreens
});

function num(e) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].innerText === "") {
      var target = inputs[i];
      numBtn = e.target;
      target.style.backgroundColor =
        window.getComputedStyle(numBtn).backgroundColor; // Set background color

      setTimeout(() => {
        target.innerText = e.target.innerText;
        target.classList.add("filled"); // Adding classes for filled input style and animation
        inputFilled(target);
      }, 10); // Adding a slight delay to ensure class removal before re-adding it

      break; // Stoppen, nachdem die Zahl eingefügt wurde
    }
  }
}

function clearInput(e) {
  const target = e.target;
  target.innerText = ""; // Clearing the input field
  target.style.backgroundColor = ""; // Clearing the background color
  target.classList.remove("filled"); // Removing the 'filled' class
  target.classList.remove("over"); // Removing the 'over' class
  target.classList.add("dragging"); // Add the 'dragging' class
}

function dragStart(e) {
  const target = e.target;
  const text = target.textContent;
  const bgColor = window.getComputedStyle(target).backgroundColor;
  e.dataTransfer.setData("text/plain", text + "|" + bgColor); // Transfer text and background color data
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("input-field") && !target.innerText) {
    target.classList.add("over");
  }
}

function dragLeave(e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("input-field")) {
    target.classList.remove("over");
  }
}

function touchMove(e) {
  e.preventDefault();
  const target = e.target;
  const touch = e.touches[0];
  if (target.classList.contains("input-field") && !target.innerText) {
    const rect = target.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left - rect.width / 2;
    const offsetY = touch.clientY - rect.top - rect.height / 2;
    target.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    target.classList.add("over");
  }
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/plain").split("|")[0];
  const color = e.dataTransfer.getData("text/plain").split("|")[1]; // Get background color data
  const target = e.target;

  // Wenn das Ziel ein Input-Feld ist
  if (target.classList.contains("input-field")) {
    // Wenn das Feld bereits gefüllt ist, entferne die 'filled' Klasse, um die Animation abzuspielen
    if (target.innerText !== "") {
      target.classList.remove("filled");
    }

    // Entferne den Textinhalt des Feldes, um ihn zu überschreiben
    target.innerText = "";
    target.style.backgroundColor = color; // Set background color

    setTimeout(() => {
      target.innerText = data;
      target.classList.add("filled"); // Adding classes for filled input style and animation
      inputFilled(target);
    }, 10); // Adding a slight delay to ensure class removal before re-adding it
  }
}
