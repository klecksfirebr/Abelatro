let IdCartas = [[1, 1, 0], [2, 1, 1], [3, 1, 2], [4, 1, 3], [1, 2, 4], [2, 2, 5], [3, 2, 6], [4, 2, 7], [1, 3, 8], [2, 3, 9], [3, 3, 10], [4, 3, 11], [1, 4, 12], [2, 4, 13], [3, 4, 14], [4, 4, 15], [1, 5, 16], [2, 5, 17], [3, 5, 18], [4, 5, 19], [1, 6, 20], [2, 6, 21], [3, 6, 22], [4, 6, 23], [1, 7, 24], [2, 7, 25], [3, 7, 26], [4, 7, 27], [1, 8, 28], [2, 8, 29], [3, 8, 30], [4, 8, 31], [1, 9, 32], [2, 9, 33], [3, 9, 34], [4, 9, 35], [1, 10, 36], [2, 10, 37], [3, 10, 38], [4, 10, 39], [1, 11, 40], [2, 11, 41], [3, 11, 42], [4, 11, 43], [1, 12, 44], [2, 12, 45], [3, 12, 46], [4, 12, 47], [1, 13, 48], [2, 13, 49], [3, 13, 50], [4, 13, 51]] // matriz com informações de todas as cartas possíveis.

let CartasExistentes = [] // array para conferir quais cartas existem
let CartasCriadas = []
let CartasSelecionadas = [] // array de cartas que foram selecionadas pelo jogador

const divCartas = document.getElementById('cartas')// variável para conseguir a div #cartas


//meio autoexplicativo
function randomizarCarta(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

// FUNÇÃO PARA GERAR A MÃO DE JOGO
let QuantMao = 8 // variável da quantidade de mão 
let cardId = 0 // variável do id da carta
async function gerarMao() {
    for (let i = 0; i < QuantMao; i++) { //ativa conforme a quant de mão que o jogador tem
        if (CartasExistentes.length < IdCartas.length - 1) { //confere se já não foram geradas todas as cartas possíveis
            cardId = randomizarCarta(0, 51)
            if (CartasCriadas.includes(IdCartas[cardId])) { // confere se essa carta já não existe
                i = i - 1
            } else { //se a carta não existir, adiciona ela para o array de cartas que serão criadas
                CartasCriadas[i] = []
                CartasCriadas[i] = IdCartas[cardId]
            }
        }
    }
    ordenarCarta(CartasCriadas.length) // chama a função para ordenar as cartas
    for (let i = 0; i < CartasCriadas.length; i++) { //cria a carta
        criarCarta(CartasCriadas[i][2], CartasCriadas[i][0], CartasCriadas[i][1], CartasCriadas.length)
        await delay(50)
    }
    console.log(CartasCriadas)
    console.log(CartasExistentes)
}

// FUNÇÃO PARA ORDENAR AS CARTAS
function ordenarCarta(qtde) {
    let valor = [] // variável para guardar o valor
    for (let j = 0; j < qtde; j++) { // for's para comparar as cartas
        for (let i = 0; i < qtde - (j + 1); i++) {
            if (CartasCriadas[i][1] > CartasCriadas[i + 1][1]) { // checa se a carta é maior que a próxima carta
                valor = CartasCriadas[i][1] //se for, move a carta 1 espaço pra frente e move o outro pra trás.
                CartasCriadas[i][1] = CartasCriadas[i + 1][1]
                CartasCriadas[i + 1][1] = valor
            }
        }
    }
}


//i wanna fucking kill myself


// FUNÇÃO PARA CRIAR UMA NOVA CARTA
async function criarCarta(id, naipe, classe, posicao) {
    const cartas = divCartas.querySelectorAll('.carta'); //pega as cartas no html
    let htmlCarta = `<div class="carta spawn" id="cartaId${id}">
                     <div class="naipe naipeSpawn" id="naipeId${id}"></div>
                     </div>`; // string preset das cartas

    // essa aqui eu simplesmente não consigo entender o porque, mas ele necessita que tenha que ter o if e o else if , mas eu acho que só precisava ter o último que era o de colocar na posição especifica, sei lá o porquê mas só funciona assim. e eu não estou com vontade de quebrar minha cabeça pra arrumar, então só vou seguir o ditado: if it ain't broke, don't fix it.

    // essa aquí só coloca acarta no lugar certo
    if (posicao === -1 || posicao >= cartas.length) {
        divCartas.insertAdjacentHTML("beforeend", htmlCarta);
    } else if (posicao === 0) {
        divCartas.insertAdjacentHTML("afterbegin", htmlCarta);
    } else {
        cartas[posicao].insertAdjacentHTML("beforebegin", htmlCarta);
    }

    let naipeIndex = document.getElementById(`naipeId${id}`) // consegue o id do naipe
    naipeIndex.style.backgroundPosition = `${classe * 7}vw ${naipe * 18}vh` // ajeita o naipe conforme qual carta é (muda o sprite)

    CartasExistentes.push(IdCartas[id])

    let ploim = new Audio("ploim.mp3");
    ploim.play() //toca o audio "ploim" do abel

    ajeitarCarta()

    await delay(250) //espera a animação terminar

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

// o jair é gay

// isso aquí é só para o delay() funcionar
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// FUNÇÂO PARA CONSEGUIR ID DE CARTAS CLICADAS
window.onload = function inicializarEventosCartas() {
    divCartas.addEventListener('click', (event) => { // checa se a carta foi clicada
        const carta = event.target.closest('.carta');

        if (carta) {
            const idCompleto = carta.id; // aquí seria o id completo, ex: "cartaId25"
            const id = idCompleto.replace('cartaId', ''); // esse aquí só pega o número

            console.log('Carta clicada! ID:', id); // isso aquí é só teste.

            const naipe = IdCartas[id][0]; //meio autoexplicativo
            const classe = IdCartas[id][1];
            console.log('Naipe:', naipe, 'Classe:', classe);  // isso aquí é só teste.

            // selecionarCarta(id, naipe, classe);
        }
    });
}
