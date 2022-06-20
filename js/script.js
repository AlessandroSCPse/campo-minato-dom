const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', startGame);

function startGame() {
    // HTML elements
    const mainGrid = document.querySelector('#main-grid');
    const userMessageDiv = document.querySelector('#user-message');

    // Quando l'utente inizia una nouva partita svuoto la griglia
    //  e levo a maingrid tutte le classi create in precedenza
    mainGrid.innerHTML = '';
    mainGrid.className = '';
    // Svuoto anche user message div
    userMessageDiv.innerHTML = '';

    const numberOfBombs = 16;
    const userLevel = document.querySelector('#user-level').value;
    console.log(userLevel);
    let gameMaxRange;
    let mainGridClass;
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
            mainGridClass = 'easy';
            break;
        case '2':
            gameMaxRange = 81;
            mainGridClass = 'hard';
            break;
        default:
            gameMaxRange = 49;
            mainGridClass = 'crazy';
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

    // Generare la griglia
    generateGrid();

    // -----------------
    // DOM FUNCTIONS
    // messe in startGame cosi da poter aver accesso a tutto ciò che mi serve
    // -----------------

    // Popola mainGrid inserendo un tot di .square (in base a gameMaxRange)
    // e assegna a mainGrid la classe appropriata in base al livello del gioco
    function generateGrid() {
        // Dare una classe alla griglia stessa che 
        // decida le dimensioni degli square
        mainGrid.classList.add(mainGridClass);

        // Genero gli .square numeri da 1 a gameMaxRange
        for(let i = 1; i <= gameMaxRange; i++) {
            // Creare una cella
            // <div class="square"><span>12</span></div>
            const newCell = document.createElement('div');
            newCell.innerHTML = `<span>${i}</span>`;
            newCell.classList.add('square');
            newCell.addEventListener('click', handleCellClick);

            // Aggiungere il testo
            // Aggiungere una classe etc...
            mainGrid.append(newCell);
        }
    }

    // Gestisce il click su ogni singola cella
    function handleCellClick() {
        // Rendiamo la cella non più cliccabile
        this.style.pointerEvents = 'none';

        // leggere il numero nello span e fare pure un parseInt
        let cellNumber = parseInt(this.querySelector('span').innerHTML);

        // Se il numero è incluso in bombs, la cella cliccata diventa 
        // rossa e sotto la griglia compare un testo
        if(bombs.includes(cellNumber)) {
            this.classList.add('bomb');
            endGame('lost');
        } else {
            // la cella diventa azzurra
            this.classList.add('not-bomb');

            // Pusho nell'array dei numeri 'azzeccati' il numero dato dall'utente
            if(!successfulNumbers.includes(cellNumber)) {
                successfulNumbers.push(cellNumber);
            }
                
            // Capire se l'utente ha raggiunto il numero max di tentativi
            if(successfulNumbers.length === maxAttempts) {
                endGame('won');
            }
        }
    }

    // Funzione di fine gioco, stampa il messaggio finale per l'utente
    function endGame(gameResult) {
        if(gameResult === 'won') {
            userMessageDiv.innerHTML = `Hai vinto! :)`;
        } else {
            userMessageDiv.innerHTML = `Hai perso. Hai azzeccato ${successfulNumbers.length} numeri`;
        }

        // Rendo tutte le celle non cliccabili e scopro tutte le bombe
        const allSquares = document.querySelectorAll('.square');
        for(let i = 0; i < allSquares.length; i++) {
            const thisSquare = allSquares[i];

            // rendo non cliccabile
            thisSquare.style.pointerEvents = 'none';

            // se il numero in questa cella è tra le bombe 
            // gli aggiungo la classe .bomb
            const thisSquareNumber = parseInt(thisSquare.querySelector('span').innerHTML);
            if(bombs.includes(thisSquareNumber)) {
                thisSquare.classList.add('bomb');
            }
        }
    }
}

// -------------------
// UTILITY FUNCTIONS
// -------------------

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