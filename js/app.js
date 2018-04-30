/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName("card");
let allCards = [...cards];
let openCard = [];
let matchedCards = document.getElementsByClassName('match');

const deck = document.querySelector(".deck");

let interval;
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let timeStart = false;

const movesCount = document.querySelector(".moves");
let moves = 0;

const star = document.getElementById("stars").querySelectorAll(".star");
let starCount = 3;

let modal = document.getElementById('myModal');
let closeModal = document.getElementsByClassName('close')[0];

// Moves counter
function movesCounter() {
  // Update the html for the moves counter
  movesCount.innerHTML++;
  // Keep track of the number of moves for every pair checked
  moves++;
};

// Star rating
function starRating() {
  if (moves === 10) {
    // First element child is the <i> within the <li>
    star[2].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
  if (moves === 16) {
    star[1].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
};

// Add the clicked card to the array, only allowing 2 cards to be stored at once
function showCard() {
  this.className += ' show open';
  openCard.push(this);
  var length = openCard.length;
  if (length === 2) {
    compareCards();
    movesCounter();
    starRating();
  }
};

// Add the event listener to all cards 
for (i = 0; i < allCards.length; i++) {
  card = allCards[i];
  card.addEventListener('click', showCard);
};

// Keep matched cards open
function matchCard() {
  openCard[1].classList.add('match');
  openCard[0].classList.add('match');
  if (openCard === 2) {
    openCard = [];
  }
};

// Add class to opened wrong card
function wrongCard() {
  for (let n of openCard) {
    n.classList.add('wrong');
  }
};

// Hide opened card if they don't match
function hideCards() {
  for (let n of openCard) {
    n.classList.remove('open', 'show', 'wrong');
  }
};

// Compare open cards and do action on them
function compareCards() {
  if (openCard[0].innerHTML === openCard[1].innerHTML) {
    matchCard();
    openCard = [];
  } else {
    wrongCard();
    setTimeout(function () {
      hideCards();
      openCard = [];
    }, 700);
  };
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// Shuffle cards in deck and remove all classes from each card
function shuffleCards() {
  for (var j = 0; j < cards.length; j++) {
    cards[j].classList.remove("open", "show", "match");
  };

  allCards = shuffle(allCards);
  for (var i = 0; i < allCards.length; i++) {
    deck.innerHTML = "";
    for (const e of allCards) {
      deck.appendChild(e);
    }
  }
};

// Timer functionality
function startTimer() {
  interval = setInterval(function () {
    timer.textContent = minute + "minutes " + second + "seconds";
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
  }, 1000);
};

function stopTimer() {
  minute = 0;
  second = 0;
  timer.textContent = minute + "minutes " + second + "seconds";
  clearInterval(interval);
};

deck.addEventListener('click', function (event) {
  if (!timeStart) {
    startTimer();
    timeStart = true;
  }
});

// Modal
function displayModal() {
  if (matchedCards.length == 16) {
    modal.style.cssText = "display: block";
    closeMyModal();
  }
};

function closeMyModal() {
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
};

// Restart 
const restart = document.querySelector('.restart');
restart.addEventListener('click', function (event) {
  // Reset timer
  stopTimer();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  shuffleCards();
  // Reset moves count
  moves = 0;
  movesCount.innerHTML = 0;
  // Reset star count and add the class back to show stars again
  star[1].firstElementChild.classList.add("fa-star");
  star[2].firstElementChild.classList.add("fa-star");
  starCount = 3;
});

// Shuffle cards in deck on window load
window.addEventListener('load', shuffleCards());