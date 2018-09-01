/* 
4 Distinct zones: Hand, Library,(bottom of library?) Graveyard, Exile.
User can pull unique cards from database, add them to a "deck" array. 
Add property to objects to denote number of cards in array.
Add functions for buttons to decrease number in zone by 1, while increasing number in a separate zone by 1.
All unique cards exist in each zone, hidden when number in zone is 0.
Cards show up in a list in each zone, sorted by CMC.
*/

let deck = {
    name: '',
    description: '',
    uniqueCards: {
        swamp: {
            //pull from db
            numberInZone: 24
        },

    }
};
let library = deck;
let hand = {};
let graveyard = {};
let exile = {};

const drawCard = (location, uniqueCard) => {
    location.uniqueCard.numberInZone--;
    hand.uniqueCard.numberInZone++;
}

const discardCard = (location, uniqueCard) => {
    location.uniqueCard.numberInZone--;
    graveyard.uniqueCard.numberInZone++;
}

const exileCard = (location, uniqueCard) => {
    location.uniqueCard.numberInZone--;
    exile.uniqueCard.numberInZone++;
}