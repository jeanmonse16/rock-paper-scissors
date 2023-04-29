let rounds = 1

const roundsInput = document.getElementById("rounds-quantity")
roundsInput.value = rounds

roundsInput.addEventListener('change', e => {
    rounds = e.target.value
})

const startGame = () => {
    window.open(`./pages/play.html?rounds=${rounds}`, "Let's play")
}

const playButton = document.getElementById('play-button')

playButton.addEventListener('click', startGame)