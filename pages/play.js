const url = new URL(location.href)
const rounds = Number(url.searchParams.get('rounds'))

const mainDiv = document.getElementById('main')
const modalDiv = document.getElementById('modal')
const resultDiv = document.getElementById('resultDiv')
const gameTitleDiv = document.getElementById('gameTitle')
const optionsDiv = document.getElementById('optionsDiv')

const playerScore = document.getElementById('playerScore')
const computerScore = document.getElementById('computerScore')

const resultText = document.getElementById('resultText')
const resultImg = document.getElementById('resultImg')

const roundResultText = document.getElementById("roundResult")
const playerChoiceText = document.getElementById("playerChoice")
const computerChoiceText = document.getElementById("computerChoice")

const nextRoundButton = document.getElementById('continueButton')
const restartButton = document.getElementById('restartButton')

nextRoundButton.onclick = nextRound

const drawSelections = (playerSelection, computerSelection) => {
    const playerMessage = `Your selection: ${playerSelection}`
    playerChoiceText.textContent = playerMessage

    const computerMessage = `Computer's selection: ${computerSelection}` 
    computerChoiceText.textContent = computerMessage
}

const roundHeader = document.getElementById('round')
let currentRound = rounds - (rounds - 1)
const updateRound = round => roundHeader.textContent = `Round ${round}`
function nextRound () {
    mainDiv.classList.remove('opacity-5')
    modalDiv.classList.remove('modal-open')
    modalDiv.classList.add('hidden')
    currentRound = currentRound + 1
    updateRound(currentRound)
}
updateRound(currentRound)

let playerWinCount = 0
let playerCurrentChoice = null
let computerWinCount = 0
let computerCurrentChoice = null

const ROCK = 'rock'
const SCISSORS = 'scissors'
const PAPER = 'paper'

const DRAW = 'draw'
const WON = 'won'
const LOST = 'lost'

const Result = (text, img) => ({ text, img })
const gameResults = { 
    [WON]: Result(`You ${WON}!`, 'winner'),
    [LOST]: Result(`You ${LOST}`, 'loser')
}

const playOptions = [ROCK, SCISSORS, PAPER]

function computerPlay () {
   const playSelection = Math.floor(Math.random() * playOptions.length)
   return playOptions[playSelection]
}

function playerPlay (playerOption) {
    let roundResult = playRound(playerOption, computerPlay())
      
    if (roundResult === WON) {
        playerWinCount = playerWinCount + 1
        playerScore.textContent = playerWinCount
    }
           
    if (roundResult === LOST) {
        computerWinCount = computerWinCount + 1
        computerScore.textContent = computerWinCount
    }

    if (playerWinCount === 5 || computerWinCount === 5) {
        gameTitleDiv.classList.add('hidden')
        optionsDiv.classList.add('hidden')
        resultDiv.classList.remove('hidden')

        const result = gameResults[roundResult]

        resultText.textContent = result.text
        resultImg.src = `../images/${result.img}.gif`
        resultImg.alt = roundResult
    }
}

playOptions.forEach(playOption => {
    const playOptionButton = document.getElementById(playOption)
    playOptionButton.onclick = playerPlay.bind(this, playOption)
})

const drawResult = playSelection => {
    const message = `You draw! ${playSelection} and ${playSelection} are friends `
    roundResultText.textContent = message

    return DRAW
}

const wonResult = (winnerSelection, loserSelection) => {
    const message = `You win! ${winnerSelection} beats ${loserSelection}`
    roundResultText.textContent = message

    return WON
}

const lostResult = (winnerSelection, loserSelection) => {
    const message = `You lose! ${winnerSelection} beats ${loserSelection}`
    roundResultText.textContent = message
 
    return LOST
}

const defaultResult = () => {
    const message = `game round crashed, please try again!`
    alert(message)

    return null
}

function playerSelectsRock (computerSelection) {
    if (computerSelection === ROCK) 
        return drawResult(ROCK)

    else if (computerSelection === SCISSORS) 
        return wonResult(ROCK, SCISSORS)
        
    else if (computerSelection === PAPER) 
        return lostResult(PAPER, ROCK)
    
    else 
        return defaultResult()
}

function playerSelectsPaper (computerSelection) {
    if (computerSelection === PAPER) 
        return drawResult(PAPER)
    
    else if (computerSelection === ROCK) 
        return wonResult(PAPER, ROCK)

    else if (computerSelection === SCISSORS) 
        return lostResult(SCISSORS, PAPER)
    
    else
        return defaultResult()
}

function playerSelectsScissors (computerSelection) {
    if (computerSelection === SCISSORS) 
        return drawResult(SCISSORS)

    else if (computerSelection === PAPER)
        return wonResult(SCISSORS, PAPER)

    else if (computerSelection === ROCK)
        return lostResult(ROCK, SCISSORS)

    else 
        return defaultResult()
}

function playRound (playerSelection, computerSelection) {
    mainDiv.classList.add('opacity-5')
    modalDiv.classList.add('modal-open')
    modalDiv.classList.remove('hidden')

    drawSelections(playerSelection, computerSelection)

    if (playerSelection === ROCK)
        return playerSelectsRock(computerSelection)

    else if (playerSelection === PAPER)
        return playerSelectsPaper(computerSelection)

    else if (playerSelection === SCISSORS)
        return playerSelectsScissors(computerSelection)

    else return alert('You have to choose a valid option between Rock, Paper and Scissors in order to play')
}

function restartGame () {
    currentRound = 1
    playerWinCount = 0
    computerWinCount = 0

    gameTitleDiv.classList.remove('hidden')
    optionsDiv.classList.remove('hidden')
    resultDiv.classList.add('hidden')

    playerScore.textContent = playerWinCount
    computerScore.textContent = computerWinCount
    updateRound(currentRound)
}

restartButton.onclick = restartGame
