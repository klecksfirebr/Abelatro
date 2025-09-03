let IdCartas = [[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3], [1, 4], [2, 4], [3, 4], [4, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [2, 6], [3, 6], [4, 6], [1, 7], [2, 7], [3, 7], [4, 7], [1, 8], [2, 8], [3, 8], [4, 8], [1, 9], [2, 9], [3, 9], [4, 9], [1, 10], [2, 10], [3, 10], [4, 10], [1, 11], [2, 11], [3, 11], [4, 11], [1, 12], [2, 12], [3, 12], [4, 12], [1, 13], [2, 13], [3, 13], [4, 13]]

function randomizarCarta(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

let cardId = 0
function teste() {
    cardId = randomizarCarta(0, 51)
    criarCarta(cardId, IdCartas[cardId][0], IdCartas[cardId][1])
}

function criarCarta(id, naipe, classe) {
    let divCartas = document.getElementById('cartas')

    divCartas.innerHTML += `<div class="carta" id="cartaId${id}"><div class="naipe" id="naipeId${id}"></div></div>`

    let naipeIndex = document.getElementById(`naipeId${id}`)
    naipeIndex.style.backgroundPosition = `${classe * 7}vw ${naipe * 18}vh`

    let ploim = new Audio("ploim.mp3");
    ploim.play()
}