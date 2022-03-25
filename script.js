'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreElO = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// the ways above for selecting elements are almost the same
// the getElementById method should be a little bit faster

const scores = [0, 0]; // Obased arrays for keeping scores / player 1 is at 0 position
let currentScore = 0;
let activePlayer = 0; // so player 1
let playing = true;

// now we set the scores to 0
scoreElO.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');

// function for switching the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // toggling the class player--active
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if it is 1: if true
    if (dice !== 1) {
      currentScore += dice;
      // currentEl0.textContent = currentScore; //Later we have to keep track of the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // change to the next player
    else {
      // before switching we set again the current score content to o
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('hold button');
    // 1. Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector('.dice').classList.add('hidden');
    } else {
      // Switch to another player by using a function
      switchPlayer();
    }
  }
});

// resetting the game
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  currentScore = 0;
  scoreElO.textContent = currentScore;
  scoreEl1.textContent = currentScore;
  currentEl0.textContent = currentScore;
  currentEl1.textContent = currentScore;
  document.querySelector('.dice').classList.add('hidden');
  playing = true;
});
