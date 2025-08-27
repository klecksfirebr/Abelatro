let IdCartas = []

function randomizarCarta(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}

let cardId = 0
function criarCarta(){
    let divCartas = document.getElementById('cartas')
    
    IdCartas[cardId] = []
    IdCartas[cardId][1] = randomizarCarta(1,4)
    IdCartas[cardId][2] = randomizarCarta(1,14)
    
    divCartas.innerHTML += `<div class="carta" id="cartaId${cardId}"><div class="carta" id="naipeId${cardId}"></div></div>`
    
    let naipeIndex = document.getElementById(`naipeId${cardId}`)
    naipeIndex.style.backgroundImage = `url(./cartas.png)`

    cardId ++
}