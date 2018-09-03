/* 
4 Distinct Librarys: Hand, Library,(bottom of library?) Graveyard, Exile.
User can pull unique cards from database, add them to a "deck" array. 
Add property to objects to denote number of cards in array.
Add functions for buttons to decrease number in Library by 1, while increasing number in a separate Library by 1.
All unique cards exist in each Library, hidden when number in Library is 0.
Cards show up in a list in each Library, sorted by CMC.
*/

let activeDeck = {
    //pull from users.db
    'name': 'Mono-Red Aggro',
    'description': "Burn 'em",
    'uniqueCards': [
        {
            'name': 'Mountain',
            'totalNumber': 24,
            'numberInLibrary': 24,
            'numberInHand': 0,
            'numberInGraveyard': 0,
            'numberInExile': 0
        },
        {
            'name': 'Goblin Chainwhirler',
            'totalNumber': 4,
            'numberInLibrary': 4,
            'numberInHand': 0,
            'numberInGraveyard': 0,
            'numberInExile': 0
        },
        {
            'name': 'Hazoret the Fervent',
            'totalNumber': 4,
            'numberInLibrary': 4,
            'numberInHand': 0,
            'numberInGraveyard': 0,
            'numberInExile': 0
        },
        {
            'name': 'Soul-Scar Mage',
            'totalNumber': 4,
            'numberInLibrary': 4,
            'numberInHand': 0,
            'numberInGraveyard': 0,
            'numberInExile': 0
        },
        {
            'name': 'Bomat Courier',
            'totalNumber': 4,
            'numberInLibrary': 4,
            'numberInHand': 0,
            'numberInGraveyard': 0,
            'numberInExile': 0
        },
        {
            'name': 'Glorybringer',
            'totalNumber': 4,
            'numberInLibrary': 4,
            'numberInHand': 0,
            'numberInGraveyard': 0,
            'numberInExile': 0
        }
    ]
};

let updateZones = () => {
    // update the dom to new object properties
};

// Make an object for each unique card.

function Buttons(location, card) {
    this.name = card
    this.exile = function() {
        if(card.numberInExile === card.totalNumber) {
            alert('error')
        } else {
        card[location]--
        card.numberInExile++;
        updateZones();
        };
    };
    this.discard = function() {
        if(card.numberInGraveyard === card.totalNumber) {
            alert('error')
        } else {
        card[location]--
        card.numberInGraveyard++;
        updateZones();
        };

    };
    this.draw = function() {
        if(card.numberInHand === card.totalNumber) {
            alert('error')
        } else {
        card[location]--
        card.numberInHand++;
        updateZones();
        }
    };
    this.library = function() {
        if(card.numberInLibrary === card.totalNumber) {
            alert('error')
        } else {
        card[location]--
        card.numberInLibrary++;
        updateZones();
        };
    };
};

let library = document.getElementById('libraryCards');

//I'm cheating here, activeDeck should be pulled from DB

let cardButtons = ['exile', 'graveyard', 'library', 'placespace'];

activeDeck.uniqueCards.forEach(cardName => {
    let uniqueCard = document.createElement('li');
    cardButtons[i] = document.createElement('button')
    uniqueCard.innerText = `${cardName.name}`
    library.appendChild(uniqueCard);
});

let deckToPlayspace = document.querySelector('.library > .playspace');

