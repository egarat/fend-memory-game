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
        card: '.card',
        match: '.match',
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
    freezeGame = false,
    moves = 0,
    stars = 3;
    
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

    const finishTurn = function() {
        firstCard = null;
        freezeGame = false;
    };

    const gameWon = function() {
        return document.querySelectorAll(DOM.card).length === document.querySelectorAll(DOM.match).length;
    };

    const showCards = function(evt) {
        // Silently return function when clicked element is not a list item or is currently being shown
        if(evt.target.tagName !== 'LI' || evt.target.classList.contains('open') || freezeGame) return;
        
        const selectedCard = evt.target;
        selectedCard.classList.add('open');

        // Increment move counter and update the display
        updateMoves();
        updateStars();
        
        // Check if it is the second shown card in this turn
        if(firstCard) {
            // Check if cards match
            freezeGame = true;
            if(cardsMatch(selectedCard)) {
                setTimeout(function() {
                    toggleCardsStyle(firstCard, selectedCard, 'match');
                    finishTurn();
                    
                    // Check if game is won
                    if(gameWon()) {
                        alert('You win!');
                    }
                }, 400);
            } else {
                setTimeout(function() {
                    toggleCardsStyle(firstCard, selectedCard, 'mismatch');
                    
                    // Hide cards again after indicating the mismatch
                    setTimeout(function() {
                        toggleCardsStyle(firstCard, selectedCard, 'open');
                        toggleCardsStyle(firstCard, selectedCard, 'mismatch');
                        finishTurn();
                    }, 500);
                }, 400)
            }
        } else {
            // If this is the first card uncovered this turn, then store it to a variable to compare it with the next card
            firstCard = selectedCard;
        }
    };
    
    const setEventHandler = function() {
        document.querySelector(DOM.deck).addEventListener('click', showCards);
        document.querySelector(DOM.restartBtn).addEventListener('click', restartGame);
    };
    
    const displayStars = function() {
        let html = '';
        for(let i = 0; i < 3; i++) {
            if(stars > i) {
                if(stars === i + 0.5) {
                    html += '<i class="fa fa-star-half-o"></i>';
                } else {
                    html += '<i class="fa fa-star"></i>';
                }
            } else {
                html += '<i class="fa fa-star-o"></i>';
            }
        }
        
        document.querySelector(DOM.stars).innerHTML = html;
    };
    
    const updateStars = function() {
        // Stars cannot be lower than 0
        if(stars === 0 || moves <= deckArray.length) return;
        
        // Reduce half a star for every 6 moves over the amount of cards in the deck
        if((moves - deckArray.length) % 6 === 0) {
            stars -= 0.5;
            displayStars();
        }
    };
    
    const displayMoveCounter = function() {
        document.querySelector(DOM.moves).textContent = moves;
    };
    
    const updateMoves = function() {
        moves++;
        displayMoveCounter();
    };

    const createListItem = function(icon, index) {
        return `<li class="card" data-index="${index}"><i class="fa ${icon}"></i></li>`;
    };

    const generateDeck = function() {
        let html = deckArray.map(function(icon, index) {
            return createListItem(icon, index);
        }).join('');

        document.querySelector(DOM.deck).innerHTML = html;
    }

    const render = function() {
        generateDeck();
        displayMoveCounter();
        displayStars();
    };

    const restartGame = function() {
        moves = 0;
        stars = 3;
        deckArray.splice(0,deckArray.length);
        init();
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
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 * reduce stars if the player made a certain amount of moves
 * add functionality to restart game
 * display stars
 */

// TODO
/*
 * add modal when user wins
 * display timer
 * add leaderboard
 * implement storage for leaderboard and game state
 */

