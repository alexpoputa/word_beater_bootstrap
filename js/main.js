// Available levels
const levels = {
  easy: 7,
  medium: 5,
  hard: 3
};

let currentLevel = levels.easy;

// Globals
let time = currentLevel;
let score = 0;
let isPlaying;

const words = [
  "ability",
  "able",
  "about",
  "above",
  "accept",
  "according",
  "account",
  "across",
  "bad",
  "bag",
  "ball",
  "bank",
  "bar",
  "base",
  "be",
  "beat",
  "beautiful",
  "because",
  "become",
  "bed",
  "before",
  "child",
  "choice",
  "choose",
  "church",
  "citizen",
  "city",
  "civil",
  "claim",
  "college",
  "color",
  "come",
  "cost",
  "could",
  "country",
  "couple",
  "course",
  "court"
];

const wordInput = $("#word-input");
const currentWord = $("#current-word");
const scoreDisplay = $("#score");
const timeDisplay = $("#time");
const message = $("#message");
const seconds = $("#seconds");
const reset = $("#resetButton");
const start = $("#startButton");

wordInput.prop("disabled", true);
wordInput.attr("placeholder", "");

$(document).ready(function() {
  // Initialize game
  function init() {
    wordInput.prop("disabled", false);
    wordInput.attr("placeholder", "Start typing...");
    // Show seconds in the UI
    seconds.html(currentLevel);
    // Load word from array
    showWord(words);
    // Start matching word from input
    wordInput.change("input", startMatch);
    // Countdown seconds
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
  }

  function startGame() {
    init();
  }

  function resetGame() {
    location.reload();
  }

  start.click(startGame);

  reset.click(resetGame);

  // Start match function
  function startMatch() {
    if (matchWords()) {
      isPlaying = true;
      time = currentLevel + 1;
      showWord(words);
      wordInput.val("");
      score++;
    }

    // When score is -1, display 0
    if (score === -1) {
      score.html(0);
    } else {
      scoreDisplay.html(score);
    }
  }

  // Match words
  function matchWords() {
    if (wordInput.val() === currentWord.html()) {
      message
        .removeClass("text-danger")
        .addClass("text-success")
        .html("Correct!Keep going!");
      return true;
    } else {
      message
        .removeClass("text-success")
        .addClass("text-danger")
        .html("Wrong word!Try again!");
      wordInput.val("");
      return false;
    }
  }

  // Show random word
  function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.html(words[randIndex]);
  }

  // Timer
  function countdown() {
    if (time > 0) {
      time--;
    } else if (time === 0) {
      isPlaying = false;
      wordInput.prop("disabled", true);
    }

    // Show time
    timeDisplay.html(time);
  }

  // Check game status
  function checkStatus() {
    if (!isPlaying && time === 0) {
      message.html("Game over!You completed " + score + " words!");
    }
  }
});
