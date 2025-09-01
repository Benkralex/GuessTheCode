const game = new GuessTheCode(); // Create a new instance of GuessTheCode

function submitGuess() {
  // Überprüfen Sie, ob game.isGameOver() true ist
  if (!game.isGameOver()) {
    // Definieren Sie die Input-Variablen
    const guessInput1 = document.getElementById("guessInput1");
    const guessInput2 = document.getElementById("guessInput2");
    const guessInput3 = document.getElementById("guessInput3");
    const guessInput4 = document.getElementById("guessInput4");

    var guessValues = [
      guessInput1.textContent,
      guessInput2.textContent,
      guessInput3.textContent,
      guessInput4.textContent,
    ];

    // Überprüfen Sie, ob alle Felder ausgefüllt sind
    const allInputsFilled = guessValues.every((value) => !isNaN(value));

    // Wenn alle Felder ausgefüllt sind
    if (allInputsFilled && guessValues.every((value) => value !== "")) {
      try {
        guessValues = guessValues.map(Number);
        // Setzen Sie den Benutzerguess
        game.setUserGuess(guessValues);
        // Aktualisieren Sie das Feedback
        updateFeedback(game.correctPositions, game.correctNumbers, guessValues);
        // Leeren Sie alle Eingabefelder
        const guessInputs = document.querySelectorAll(".input-field");
        guessInputs.forEach((input) => {
          input.innerText = ""; // Clearing the input field
          input.style.backgroundColor = ""; // Clearing the background color
          input.classList.remove("filled"); // Removing the 'filled' class
          input.classList.remove("over"); // Removing the 'over' class
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      guessValues.forEach((input, index) => {
        if (input === "") {
          wobble(window["guessInput" + (index + 1)], true);
        }
      });
    }
  }
}

function updateFeedback(correctPositions, correctNumbers, userInput) {
  const feedbackTable = document.getElementById("feedback");

  const inputs = [];
  for (let i = 0; i < userInput.length; i++) {
    inputs.push(
      `<button class="button-sm btn-${userInput[i]}" disabled>${userInput[i]}</button>`
    );
  }

  if (game.isGameOver()) {
    addRow(
      `<td class="win outer-columns"></td>`,
      `<td class="win">${inputs.join("")}</td>`,
      `<td class="win outer-columns"></td>`
    );
    endRound(
      `<span style="color:#2ecc71">GEWONNEN (Versuche: ${game.getNumOfGuesses()})</span>`
    );
  } else {
    addRow(
      `<td class="outer-columns">${correctPositions}</td>`,
      `<td>${inputs.join("")}</td>`,
      `<td class="outer-columns">${correctNumbers}</td>`
    );
  }
}

function newRound() {
  location.reload();
}

function giveUp() {
  if (!game.isGameOver()) {
    var code = game.getSecretCode();
    const codeWColor = [];
    for (let i = 0; i < code.length; i++) {
      codeWColor.push(
        `<button class="button-sm btn-${code[i]}" disabled>${code[i]}</button>`
      );
    }
    addRow(
      `<td class="lose outer-columns"></td>`,
      `<td class="lose">${codeWColor.join("")}</td>`,
      `<td class="lose outer-columns"></td>`
    );
    endRound(
      `<span style="color:#c0392b">VERLOREN (Versuche: ${game.getNumOfGuesses()})</span>`
    );
  }
}

function endRound(msg) {
  const button = `<div><p>${msg}</p><br><button class="button-lg" onClick="newRound()" id="nr">Neue Runde</button></div>`;
  document.getElementById("main").innerHTML += button;
  game.stopGame();
  document.getElementById("controlls").style.display = "none";
  music();
  music();
}

function addRow(c1, c2, c3) {
  const feedbackTable = document.getElementById("feedback");
  const row = document.createElement("tr");
  const rowContent = c1 + c2 + c3;
  row.innerHTML = rowContent;
  feedbackTable.appendChild(row);
}
