let currentDeck = {
    name:"",
    description:"",
    uniqueCards:[]
};

let deckInput = document.getElementById('deckInput');
let deckTitle = document.getElementById('deckTitle');
let deckDescription = document.getElementById('deckDescription');
let mainboard = document.getElementById('mainboard');
let sideboard = document.getElementById('sideboard');
let cardnameInput = document.getElementById('cardnameInput');
let quantityInput = document.getElementById('quantityInput');
let addCard = document.getElementById('addCard');
let submit = document.getElementById('submit')

let cardDiv = document.querySelector('div.cardnameWrapper');
let quantError = document.querySelector('.cardQuantityWrapper > p.hidden');

const showError = (errorType) => {
    errorType.classList.remove("hidden"); 
    errorType.classList.add("error");
};

const hideError = (errorType) => {
    errorType.classList.remove("error");
    errorType.classList.add("hidden");
};

addCard.onclick = () => {
        /* if card name doesn't exist in db */
        /*else*/ if (isNaN(quantityInput.value)) {
        showError(quantError);
    } else {
        if (mainboard.value === '') {
            mainboard.value = mainboard.value + `${quantityInput.value} ${cardnameInput.value}`
        } else {
            mainboard.value = mainboard.value + `\n${quantityInput.value} ${cardnameInput.value}`
        }
        hideError(quantError);
    };
    console.log(Number(quantityInput.value));
};

submit.onclick = () => {
    const arrayOfLines = mainboard.value.split('\n');
    console.log(arrayOfLines);

    let numberCheck = (str) => {
        console.log(str.slice(0, str.indexOf(" ")));
        if (isNaN(str.slice(0, str.indexOf(" ")))) {
            return false;
        } else {
            return true;
        }
    }
    if (!arrayOfLines.every(numberCheck)) {
        console.log(`Invalid Decklist`);
    } /*else if cardname not valid?*/ else {
        arrayOfLines.forEach((line) => {
            let numberOfCard = line.slice(0, line.indexOf(" "));
            let nameOfCard = line.slice(line.indexOf(" ") + 1);
            console.log(numberOfCard);
            console.log(nameOfCard);
            currentDeck.cardsInDeck.push({[nameOfCard]: {"cardname": nameOfCard, "cardQuant": numberOfCard}});
        });
        currentDeck.name = deckTitle.value;
        currentDeck.description = deckDescription.value;
    }};

console.log(`Hello World, we're live!`);

let autocomplete = (input, array) => {
    let currentFocus;
    input.addEventListener("input", () => {
        let parentBox, childBox, i, userInput = this.value;
        closeAllLists();
        if (!userInput) {
            return false;
        };
        currentFocus = -1;
        parentBox = document.createElement('div');
        parentBox.setAttribute("id", this.id + "autocomplete-list");
        parentBox.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(parentBox);
        array.forEach(object => {
            if (userInput.length <= 2) {
                if (object.toUpperCase().includes(userInput.toUpperCase())) {
                    childBox = document.createElement("div");

                }
            }
    })
})}

/* let createDeck = () => {
    let uniqueCards = [`Rat Colony`, `Bontu's Monument`, `Swamp`];
    function Deck(uniqueInstance, name, decksize, description) {
        this.name = name;
        this.cardsInDeck = uniqueInstance;
        this.decksize = decksize;
        this.description = description;
    };
    let userDeck = new Deck(uniqueCards, `Rat Colony Monument`, 60, `Make lots of rats and then hit your opponent!`);
    console.log(userDeck.cardsInDeck);
};

createDeck(); */