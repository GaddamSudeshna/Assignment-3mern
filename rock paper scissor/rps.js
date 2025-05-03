

const score = {
  wins: 0,
  losses: 0,
  ties: 0
};

const resultElement = document.querySelector('.js-result');
const movesElement = document.querySelector('.js-moves');
const scoreElement = document.querySelector('.js-score');
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');

const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  } else {
    return 'lose';
  }
};

const updateScoreElement = () => {
  scoreElement.textContent = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
  localStorage.setItem('score', JSON.stringify(score));
};

const showResult = (playerChoice, computerChoice, result) => {
  movesElement.textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}.`;
  if (result === 'tie') {
    resultElement.textContent = "It's a tie!";
  } else if (result === 'win') {
    resultElement.textContent = 'You win!';
    score.wins++;
  } else {
    resultElement.textContent = 'You lose!';
    score.losses++;
  }
  updateScoreElement();
};

rockButton.addEventListener('click', () => {
  const playerChoice = 'rock';
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  showResult(playerChoice, computerChoice, result);
});

paperButton.addEventListener('click', () => {
  const playerChoice = 'paper';
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  showResult(playerChoice, computerChoice, result);
});

scissorsButton.addEventListener('click', () => {
  const playerChoice = 'scissors';
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  showResult(playerChoice, computerChoice, result);
});

const autoPlay = () => {
  const choices = ['rock', 'paper', 'scissors'];
  const playerChoice = choices[Math.floor(Math.random() * choices.length)];
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);
  showResult(playerChoice, computerChoice, result);
};

const resetButton = document.querySelector('.js-reset-score-button');
resetButton.addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
  score.wins = savedScore.wins || 0;
  score.losses = savedScore.losses || 0;
  score.ties = savedScore.ties || 0;
  updateScoreElement();
}
