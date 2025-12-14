let IdCartas = [[1, 1, 51], [2, 1, 50], [3, 1, 49], [4, 1, 48], [1, 2, 47], [2, 2, 46], [3, 2, 45], [4, 2, 44], [1, 3, 43], [2, 3, 42], [3, 3, 41], [4, 3, 40], [1, 4, 39], [2, 4, 38], [3, 4, 37], [4, 4, 36], [1, 5, 35], [2, 5, 34], [3, 5, 33], [4, 5, 32], [1, 6, 31], [2, 6, 30], [3, 6, 29], [4, 6, 28], [1, 7, 27], [2, 7, 26], [3, 7, 25], [4, 7, 24], [1, 8, 23], [2, 8, 22], [3, 8, 21], [4, 8, 20], [1, 9, 19], [2, 9, 18], [3, 9, 17], [4, 9, 16], [1, 10, 15], [2, 10, 14], [3, 10, 13], [4, 10, 12], [1, 11, 11], [2, 11, 10], [3, 11, 9], [4, 11, 8], [1, 12, 7], [2, 12, 6], [3, 12, 5], [4, 12, 4], [1, 13, 3], [2, 13, 2], [3, 13, 1], [4, 13, 0]] // matriz com informações de todas as cartas possíveis.

let CartasExistentes = [] // array para conferir quais cartas existem
let CartasCriadas = [] // array para criar cartas
let CartasSelecionadas = [] // array de cartas que foram selecionadas pelo jogador
let CartasVasco = [] //array de cartas que foram de vasco

const divCartas = document.getElementById('cartas')// variável para conseguir a div #cartas

//meio autoexplicativo
function randomizarCarta(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// FUNÇÃO PARA GERAR A MÃO DE JOGO 
let QuantMao = 8 // variável da quantidade de mão 
async function gerarMao() {
    let cardId = 0 // variável do id da carta
    if (CartasExistentes.length < IdCartas.length - 1) { //confere se já não foram geradas todas as cartas possíveis
        for (let i = 0; i < QuantMao; i++) { //ativa conforme a quant de mão que o jogador tem
            cardId = randomizarCarta(0, 52)
            if (CartasCriadas.includes(cardId) || CartasVasco.includes(cardId)) { // confere se essa carta já não existe
                i = i - 1
            } else { //se a carta não existir, adiciona ela para o array de cartas que serão criadas
                CartasCriadas[i] = cardId
            }
        }
        for (let i = 0; i < CartasCriadas.length; i++) { //cria a carta
            CartasExistentes = CartasCriadas
            ordenarCarta() // chama a função para ordenar as cartas
            const carta = buscarCartaPorId(CartasExistentes[i])
            criarCarta(carta[2], carta[0], carta[1], i)
            await delay(50)
        }
    }
}

// FUNÇÃO PARA ORDENAR AS CARTAS
function ordenarCarta() {
    CartasExistentes.sort((b, a) => {
         const cartaA = buscarCartaPorId(a); // Classe da carta A (1-13)
        const cartaB = buscarCartaPorId(b); // Classe da carta B (1-13)
        return cartaA[1] - cartaB[1];  // Ordena por valor: A, 2, 3... J, Q, K
    });
}

// davi esteve aqui

//i wanna fucking kill myself

// FUNÇÃO PARA CRIAR UMA NOVA CARTA
async function criarCarta(id, naipe, classe, posicao) {
    const cartas = divCartas.querySelectorAll('.carta'); //pega as cartas no html
    console.log(cartas)
    let htmlCarta = `<div class="carta spawn" id="cartaId${id}">
                     <div class="naipe naipeSpawn" id="naipeId${id}"></div>
                     </div>`; // string preset das cartas

    // essa aquí só coloca a carta no lugar certo
    if (posicao === -1 || posicao >= cartas.length) {
        divCartas.insertAdjacentHTML("beforeend", htmlCarta);
    } else if (posicao === 0) {
        divCartas.insertAdjacentHTML("afterbegin", htmlCarta);
    } else {
        cartas[posicao].insertAdjacentHTML("beforebegin", htmlCarta);
    }

    let naipeIndex = document.getElementById(`naipeId${id}`) // consegue o id do naipe
    naipeIndex.style.backgroundPosition = `-${91 - (classe * 7)}vw -${72 - (naipe * 18)}vh` // ajeita o naipe conforme qual carta é (muda o sprite)

    let ploim = new Audio("./audio/truh.wav");
    ploim.play() //toca o audio "ploim" do abel

    ajeitarCarta()

    await delay(850) //espera a animação terminar

    let cartaIndex = document.getElementById(`cartaId${id}`)
    cartaIndex.classList.remove('spawn'); //retira a classe que fazia a animação
    naipeIndex.classList.remove('naipeSpawn');
}

// FUNÇÃO PARA AJEITAR AS CARTAS ENFILEIRADINHAS
function ajeitarCarta() {
    const cartas = divCartas.querySelectorAll('.carta'); //consegue as div cartas
    const naipes = divCartas.querySelectorAll('.naipe'); // consegue as div naipe
    const numCartas = cartas.length; //confere o número de cartas

    let larguraCarta = window.innerWidth * 0.07; //consegue o width das cartas

    const novaLargura = (window.innerWidth * 0.731) / numCartas; //faz o cálculo do tamanho que as cartas deveriam ter

    if (novaLargura < larguraCarta) { //confere se está abaixando o tamanho da carta ao invés de aumentando
        for (let i = 0; i < numCartas; i++) {
            cartas[i].style.width = novaLargura + 'px'; //troca o tamanho das cartas
            naipes[i].style.width = novaLargura + 'px'; //troca o tamanho das cartas
        }
    }
}

// o jair é gay³

// isso aquí é só para o delay() funcionar
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// FUNÇÃO PARA CONSEGUIR ID DE CARTAS CLICADAS
let numCarta = 0
window.onload = function inicializarEventosCartas() {
    divCartas.addEventListener('click', (juvencio) => { // checa se a carta foi clicada
        const carta = juvencio.target.closest('.carta'); // pega a carta que foi clicada

        const idCompleto = carta.id; // aquí seria o id completo, ex: "cartaId25"
        const id = Number(idCompleto.replace('cartaId', '')) // esse aquí só pega o número (no caso ele coloca como string, mas botei um number ali pra transformar em número)
        if (CartasSelecionadas.includes(id)) { // checa se a carta já foi clicada ou não
            carta.style.transform = `translateY(0px)` // animação da carta
            CartasSelecionadas = CartasSelecionadas.filter(cartaId => cartaId !== id); // remove a carta do array 
            console.log(CartasSelecionadas + '  disselecionar')
            numCarta--
        } else {
            if (carta && CartasSelecionadas.length <= 4) { // checa se já não foram selecionadas 5 cartas
                CartasSelecionadas[numCarta] = [] //adiciona o id ao array
                CartasSelecionadas[numCarta] = id
                carta.style.transform = `translateY(-5vh)` // animação da carta
                console.log(CartasSelecionadas + '  selecionar')
                numCarta++
            }
        }
    });
}


async function descarte() {
    let cardId = 0
    let quantDescarte = CartasSelecionadas.length

    if (quantDescarte > 0) {
        let cartasParaRemover = [...CartasSelecionadas];

        CartasCriadas = []
       
        CartasVasco = [...CartasSelecionadas];
        CartasSelecionadas = [];
        numCarta = 0;

        for (let i = 0; i < quantDescarte; i++) {
            for (let j = 0; j < 1; j++) {
                cardId = randomizarCarta(0, 52)
         
                if (CartasExistentes.includes(cardId) || CartasVasco.includes(cardId)) {
                    j = -1
               
                } else {
                    CartasCriadas[i] = cardId
                
                }
            }

            console.log("cartas existentes:  ", CartasExistentes, "cartas vasco:  ", CartasVasco)
            CartasExistentes = CartasExistentes.filter(carta => !cartasParaRemover.includes(cardId));

            CartasExistentes = [...CartasExistentes, ...CartasCriadas];
            ordenarCarta();

            const carta = divCartas.querySelector(`#cartaId${cartasParaRemover[i]}`);
            if (carta) {
                carta.remove();
            }
            
            console.log("cardid: ", cardId)
            const posicao = descobPos(cardId)
            criarCarta(cardId, IdCartas[CartasCriadas[i]][0], IdCartas[CartasCriadas[i]][1], posicao);
            await delay(50);
        }
    }
}

function buscarCartaPorId(id) {
    return IdCartas.find(carta => carta[2] === id);
}

function buscarIndicePorId(id) {
    return IdCartas.findIndex(carta => carta[2] === id);
}

function descobPos(Id) {
    const carta = buscarCartaPorId(Id)
    const classeCarta = carta[1]
    let posicao = 0
    for (let i = 0; i < CartasExistentes.length; i++) {
        const CartaComparada = buscarCartaPorId(CartasExistentes[i])
        const classeCartaComparada = CartaComparada[1]

        if (classeCartaComparada < classeCarta) {
            posicao = i + 1
        } else {
            i = CartasExistentes.length
            return posicao;
        }
    }
}

// We truly live in a society...