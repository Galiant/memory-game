/*
 * Create a list that holds all of your cards
 *
 */
let cards = document.getElementsByClassName('card')

let allCards = [...cards]

let openCard = []

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck')

// this adds the clicked card to the array, only allowing 2 cards to be stored at once
function showCard() {
  this.className += 'show open'
  openCard.push(this)
  var length = openCard.length
  if (length === 2) {
    compareCards()
  }
};

// this adds the event listener to all cards
for (i = 0; i < allCards.length; i++) {
  card = allCards[i]
  card.addEventListener('click', showCard)
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */