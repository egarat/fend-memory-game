const memory = (function() {
    // This array determines which cards takes which position on the game board
    const deckArray = [],
    // This object holds the strings for the query selector in a central place
    DOM = {
        scorePanel: '.score-panel',
        stars: '.stars',
        moves: '.moves',
        restartBtn: '.restart',
        deck: '.deck',
    },
    // Cards for the game
    cards = [
        'fa-diamond',
        'fa-anchor',
        'fa-bolt',
        'fa-leaf',
        'fa-cube',
        'fa-bicycle',
        'fa-bomb',
        'fa-paper-plane-o'
    ];

    // This variable will hold the node of the first card shown this turn
    let firstCard,
    // During card animations this variable will be set to true to prevent clicking on other cards while the animation is still ongoing
    freezeGame = false;
    
    // Shuffle function from http://stackoverflow.com/a/2450976
    const shuffleCards = function(cards) {
        let currentIndex = cards.length, temporaryValue, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = cards[currentIndex];
                cards[currentIndex] = cards[randomIndex];
                cards[randomIndex] = temporaryValue;
            }
        return cards;
    };

    const toggleCardsStyle = function(cardOne, cardTwo, className) {
        cardOne.classList.toggle(className);
        cardTwo.classList.toggle(className);
    };

    const cardsMatch = function(selectedCard) {
        return deckArray[firstCard.dataset.index] === deckArray[selectedCard.dataset.index];
    };

    const showCards = function(evt) {
        // Silently return function when clicked element is not a list item or is currently being shown
        if(evt.target.tagName !== 'LI' || evt.target.classList.contains('open') || freezeGame) return;
        
        const selectedCard = evt.target;
        selectedCard.classList.add('open');
        
        // Check if it is the second shown card in this turn
        if(firstCard) {
            // Check if cards match
            freezeGame = true;
            if(cardsMatch(selectedCard)) {
                setTimeout(function() {
                    toggleCardsStyle(firstCard, selectedCard, 'match');
                    firstCard = null;
                    freezeGame = false;
                }, 400);
            } else {
                setTimeout(function() {
                    toggleCardsStyle(firstCard, selectedCard, 'mismatch');
                    
                    // Hide cards again after indicating the mismatch
                    setTimeout(function() {
                        toggleCardsStyle(firstCard, selectedCard, 'open');
                        toggleCardsStyle(firstCard, selectedCard, 'mismatch');
                        firstCard = null;
                        freezeGame = false;
                    }, 500);
                }, 400)
            }
            // Clear firstCard for the next turn
        } else {
        // Store show and store card to variable to compare with the second card
            firstCard = selectedCard;
        }
    };

    const setEventHandler = function() {
        document.querySelector(DOM.deck).addEventListener('click', showCards);
    };

    const createListItem = function(icon, index) {
        return `<li class="card" data-index="${index}"><i class="fa ${icon}"></i></li>`;
    };

    const render = function() {
        let html = deckArray.map(function(icon, index) {
            return createListItem(icon, index);
        }).join('');
        console.log('html', html);
        document.querySelector(DOM.deck).innerHTML = html;
    };

    const init = function() {
        // Duplicate provided cards and shuffle them
        deckArray.push(...shuffleCards([...cards, ...cards]));
        setEventHandler();
        render();
    };

    return {
        init,
    };
})();

memory.init();

// DONE
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 */

// TODO
/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 * reduce stars if the player made a certain amount of moves
 * display timer
 * add functionality to restart game
 * add leaderboard
 * implement storage for leaderboard and game state
 */

