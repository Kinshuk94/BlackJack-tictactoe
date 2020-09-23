blackJackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#player-board', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-board', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardValues': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
    'wins': 0,
    'loses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}
const YOU = blackJackGame['you'];

const DEALER = blackJackGame['dealer'];

const HitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-btn').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-btn').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-btn').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackJackGame['isStand'] === false) {
        let pickedNumber = randomPicks();


        showCards(YOU, pickedNumber);
        updateScore(YOU, pickedNumber);
        showScore(YOU);
    }

    //console.log(DEALER['score']);


}

function showCards(activePlayer, pickedNumber) {
    if (activePlayer['score'] <= 21) {


        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${pickedNumber}.png`;
        //cardImage.src = cardImage.src+ pickedNumber+'.png';
        //alert('clicked on Hit buttons');
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        HitSound.play();
    }
}

function blackjackDeal() {

    if (blackJackGame['turnsOver']) {
        blackJackGame['isStand'] = false;
        let yourImages = document.querySelector(YOU['div']).querySelectorAll('img');
        let dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).style.color = '#ffffff';
        document.querySelector(YOU['scoreSpan']).style.color = '#ffffff';

        DEALER['score'] = 0;
        YOU['score'] = 0;

        document.querySelector('#blackjack-result').textContent = "Lets Play";
        document.querySelector('#blackjack-result').style.color = 'Black';
        blackJackGame['turnsOver'] = false;
    }



}

function randomPicks() {
    let cards = blackJackGame['cards'];
    return cards[Math.floor(Math.random() * 13)];
}


function updateScore(activePlayer, card) {
    // if adding 11 keeps below 21, add 11 otherwise 1
    if (card == 'A') {
        if (activePlayer['score'] + 11 <= 21) {
            activePlayer['score'] += blackJackGame['cardValues'][card][1];
        }
        else {
            activePlayer['score'] += blackJackGame['cardValues'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackJackGame['cardValues'][card];
    }


}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

    }
    else
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function dealerLogic() {
    blackJackGame['isStand'] = true;
    while(DEALER['score']<=15 && blackJackGame['isStand']==true){

   
    let pickedNumber = randomPicks();


    showCards(DEALER, pickedNumber);
    updateScore(DEALER, pickedNumber);
    showScore(DEALER);
    await sleep(1000);
}
   
        blackJackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
 
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        //conditions dealer bust, 
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackJackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']) {
            blackJackGame['loses']++;
            winner = DEALER;
        }
        else if (YOU['score'] == DEALER['score']) {
            blackJackGame['draws']++;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackJackGame['loses']++;
        winner = DEALER;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['draws']++;
    }
    console.log("WINNER IS " + winner);
    console.log(blackJackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (blackJackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message = 'You Won';
            messageColor = 'green';
            winSound.play();

        }
        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackJackGame['loses'];
            message = 'You LOST';
            messageColor = 'Red';
            loseSound.play();

        }
        else {
            document.querySelector('#draws').textContent = blackJackGame['draws'];
            message = 'You DREW ';
            messageColor = 'Black';

        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
