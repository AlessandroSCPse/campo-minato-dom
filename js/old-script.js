// CONSEGNA:
// L'utente indica un livello di difficoltà (con un prompt) in base al quale decidiamo il range di numeri possibili del gioco:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.

// In seguito attraverso dei prompt l'utente inserisce un numero alla volta finche il gioco non è finito:
// se il numero è presente nella lista dei numeri generati, abbiamo calpestato una bomba, il gioco finisce con un messaggio di errore
// Altrimenti il gioco va avanti a meno di aver raggiunto il numero massimo di tentativi possibili. In questo caso il gioco finisce con un messaggio di vittoria.

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// COMMENTI
// FASE PREPARATORIA:
// 1- Chiediamo il livello all'utente (tramite prompt)
// 2- se 1: 1-100 - se 2: 1-81 - se 3: 1-49
// 3- Genero 16 bombe - range: 1 - gameMaxRange (100 o 81 o 49, vedi punto precedente)
// 4- Numero max di tentativi = gameMaxRange - numero di bombe (16)

// FASE LOGICA:
// Finche il gioco non è finito
    // Chiediamo un numero all'utente (tramite prompt)
    // - Se il numero è una bomba -> faccio finire il gioco e alert 'hai perso + punteggio'
    // - Altrimenti (numero non è bomba)
        // Mettiamo il numero corretto in un array di numeri 'azzeccati' solo se non è già presente
        // se l'utente ha raggiunto il numero max di tentaivi (lunghezza array azzeccati === numero max di tentativi)  -> faccio finire il gioco alert 'hai vinto'

// Chiediamo il livello all'utente (tramite prompt)
const numberOfBombs = 16;
const userLevel = prompt('Dimmi il livello (1-2-3)');
let gameMaxRange;
// if(userLevel === '1') {
//     gameMaxRange = 100;
// } else if(userLevel === '2') {
//     gameMaxRange = 81;
// } else if(userLevel === '3') {
//     gameMaxRange = 49;
// }
switch (userLevel) {
    case '1':
        gameMaxRange = 100;
        break;
    case '2':
        gameMaxRange = 81;
        break;
    default:
        gameMaxRange = 49;
        break;
}

// console.log(gameMaxRange);

// Genero le bombe
const bombs = generateBombs(numberOfBombs, 1, gameMaxRange);
console.log(bombs);
// Numero max tentativi
const maxAttempts = gameMaxRange - numberOfBombs;
console.log(maxAttempts);

// Array numeri azzeccati
const successfulNumbers = [];

// Inizio logica del gioco
let gameContinues = true;
while(gameContinues) {
    // Chiediamo un numero all'utente (tramite prompt)
    let userNumber = parseInt(prompt('Dammi un numero compreso tra 1 e ' + gameMaxRange));

    // Controllo se l'utente mi da un numero in range
    if(
        isNaN(userNumber) // Se il numero non è valido
        || userNumber < 1 // oppure se è inferiore a 1
        || userNumber > gameMaxRange // oppure se è maggiore del range massimo
    ) {
        userNumber = parseInt(prompt('Che fai bari? Dammi un numero compreso tra 1 e ' + gameMaxRange));
    }

    // Se userNumber si trova nell'array di bombe
    if(bombs.includes(userNumber)) {
        // Stoppo il gioco
        gameContinues = false;
        endGame('lost', successfulNumbers);
    } else {
        // Se il numero non è una bomba
        // Pusho nell'array dei numeri 'azzeccati' il numero dato dall'utente
        if(!successfulNumbers.includes(userNumber)) {
            successfulNumbers.push(userNumber);
        }
        
        // Capire se l'utente ha raggiunto il numero max di tentativi
        if(successfulNumbers.length === maxAttempts) {
            // Stoppo il gioco
            gameContinues = false;
            endGame('won', successfulNumbers);
        }
    }
}

// -------------
// FUNCTIONS
// -------------

// GameResult è una stringa 'won' se l'utente ha vinto 'lost' se ha perso
function endGame(gameResult, successNumbersArray) {
    if(gameResult === 'won') {
        alert('hai vinto');
    } else {
        alert('hai perso');
        alert('Tentativi giusti: ' + successNumbersArray.length);
    }
}

// Genera un array di x elementi in cui ogni elemento è un numero random
// numberOfElements -> numero di elementi dell'array
// rangeMin -> Range minimo dei numeri random generati
// rangeMax -> Range massimo dei numeri random generati
// return: array di numeri random con lunghezza numberOfElements
function generateBombs(numberOfElements, rangeMin, rangeMax) {
    // Per numberOfElements volte creare un numero casuale e aggiungerlo a un array vuoto (senza duplicati)
    const randomNumbersArray = [];
    while(randomNumbersArray.length < numberOfElements) {
        // Creare un numero ramdon da rangeMin a rangeMax
        const randomNumber = getRndInteger(rangeMin, rangeMax);
        // Pushiamo solo se il numero non è gia presente
        if(!randomNumbersArray.includes(randomNumber)) {
            randomNumbersArray.push(randomNumber);
        }
    }

    return randomNumbersArray;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}