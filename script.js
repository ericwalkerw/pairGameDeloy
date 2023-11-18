const scoreEl = document.querySelector('.score');
const container = document.querySelector(".container");
const colors = ["red", "blue", "green", "yellow", "purple", "brown", "orange", "pink", "#45BAF5", "gray"]
.concat(["red", "blue", "green", "yellow", "purple", "brown", "orange", "pink", "#45BAF5", "gray"]);
let openedCards = [];
let matchedCards = [];
let score = 10000;

const shuffle = array => array.sort(() => Math.random() - 0.5);

function createCard(color) {
  const card = document.createElement('div');
  card.classList.add('cell');
  card.dataset.color = color;
  container.appendChild(card);
  card.addEventListener('click', flipCard);
}

function createBoard() {
  shuffle(colors);
  colors.forEach(createCard);
}

function flipCard() {
  const card = this;
  if (openedCards.length < 2 && !openedCards.includes(card) && !matchedCards.includes(card)) {
    card.style.backgroundColor = card.dataset.color;
    card.classList.add('hidden');
    openedCards.push(card);
    if (openedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = openedCards;
  const isMatch = card1.dataset.color === card2.dataset.color;
  countScore(isMatch);
  isMatch ? matchedCards.push(card1, card2) : resetCards(card1, card2);
  if (matchedCards.length === colors.length) {
    alert('Congratulations! You won!');
  }
  openedCards = [];
}

function resetCards(card1, card2) {
  [card1, card2].forEach(card => {
    card.style.backgroundColor = "black";
    card.classList.remove('hidden');
  });
}

function countScore(ismath){
  ismath? score+=1000 : score-=500;
  scoreEl.textContent = `SCORE: ${score}`;
}

createBoard();
