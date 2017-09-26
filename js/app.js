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

    const setEventListener = function() {
        document.querySelector(DOM.deck).addEventListener('click', function(evt) {
            // Abort function when clicked element is not a list item
            if(evt.target.tagName !== 'LI') return;
            
            const selectedCard = evt.target;
            selectedCard.classList.add('open');
            selectedCard.classList.add('show');
         });
    }

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
        render();
        setEventListener();
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
 */

// TODO
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 * reduce stars if the player made a certain amount of moves
 * display timer
 * add functionality to restart game
 * add leaderboard
 * implement storage for leaderboard and game state
 */

