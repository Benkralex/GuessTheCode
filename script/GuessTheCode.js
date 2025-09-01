class GuessTheCode {
  constructor() {
    this._secretCode = this._generateSecretCode();
    this._userGuess = Array(4).fill(0); // Assuming the code length is 4
    this._numberOfGuesses = 0;
    this._gameOver = false;
    this.correctPositions = 0;
    this.correctNumbers = 0;
    this.feedbackText = "";
  }

  _generateSecretCode() {
    const secretCode = [];
    for (let i = 0; i < 4; i++) {
      secretCode.push(Math.floor(Math.random() * 8) + 1); // Zufällige Zahl von 1 bis 8 generieren
    }
    return secretCode;
  }

  getSecretCode() {
    return this._secretCode;
  }

  isGameOver() {
    return this._gameOver;
  }

  stopGame() {
    this._gameOver = true;
  }

  startRound() {
    this._secretCode = this._generateSecretCode();
    this._userGuess = Array(4).fill(0);
    this._numberOfGuesses = 0;
    this._gameOver = false;
    this.correctPositions = 0;
    this.correctNumbers = 0;
    this.feedbackText = "";
  }

  getNumOfGuesses() {
    return this._numberOfGuesses;
  }

  setUserGuess(guess) {
    if (guess.length !== 4) {
      throw new Error("Guess must be of length 4.");
    }
    this._userGuess = [...guess];
    this._numberOfGuesses++;
    this._checkUserGuess();
  }

  _checkUserGuess() {
    try {
      if (this._userGuess.every((element) => element !== null)) {
        // Check if user guessed the correct code
        if (this._userGuess.toString() === this._secretCode.toString()) {
          this.feedbackText = "Congratulations! You guessed the correct code.";
          this._gameOver = true;
        } else {
          this.correctPositions = 0;
          this.correctNumbers = 0;

          // Check for correct positions
          for (let i = 0; i < this._secretCode.length; i++) {
            if (this._userGuess[i] === this._secretCode[i]) {
              this.correctPositions++;
            }
          }

          // Check for correct numbers at wrong positions
          const secretCodeCopy = [...this._secretCode];
          for (let i = 0; i < this._userGuess.length; i++) {
            if (
              /*this._userGuess[i] !== this._secretCode[i] && */ secretCodeCopy.includes(
                this._userGuess[i]
              )
            ) {
              this.correctNumbers++;
              secretCodeCopy.splice(
                secretCodeCopy.indexOf(this._userGuess[i]),
                1
              );
            }
          }
          this.correctNumbers -= this.correctPositions;
          if (this.correctNumbers < 0) {
            this.correctNumbers = 0; // Ensure correctNumbers doesn't become negative
          }

          this.feedbackText = `Correct positions: ${this.correctPositions}, Correct numbers (but wrong position): ${this.correctNumbers}`;
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

//module.exports = GuessTheCode;
