/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');

let allCards = [...cards];

let openCard = [];

const deck = document.querySelector(".deck");

// Add the clicked card to the array, only allowing 2 cards to be stored at once
function showCard() {
  this.className += ' show open';
  openCard.push(this);
  var length = openCard.length;
  if (length === 2) {
    compareCards();
  }
};

// Add the event listener to all cards 
for (i = 0; i < allCards.length; i++) {
  card = allCards[i];
  card.addEventListener('click', showCard);
}

// Keep matched cards open
function matchCard() {
  openCard[1].classList.add('match');
  openCard[0].classList.add('match');
  if (openCard > 2) {
    openCard = [];
  }
}

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

// Shuffle cards in deck on window load
window.addEventListener('load', shuffleCards());