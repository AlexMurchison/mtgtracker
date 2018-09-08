let deckInput = document.getElementById('deckInput');
let deckTitle = document.getElementById('deckTitle');
let deckDescription = document.getElementById('deckDescription');
let mainboard = document.getElementById('mainboard');
let sideboard = document.getElementById('sideboard');
let cardnameInput = document.getElementById('cardnameInput');
let quantityInput = document.getElementById('quantityInput');
let addCard = document.getElementById('addCard');
let updatePreview = document.getElementById('updatePreview');
let submit = document.getElementById('submit');
let previewTitle = document.getElementById('previewTitle');
let previewDecklist = document.getElementById('previewDecklist');

let cardDiv = document.querySelector('div.cardnameWrapper');
let quantError = document.querySelector('.cardQuantityWrapper > p.hidden');
let cardError = document.querySelector('.cardnameWrapper > p.hidden');

const showError = (errorType) => {
    errorType.classList.remove("hidden"); 
    errorType.classList.add("error");
};

const hideError = (errorType) => {
    errorType.classList.remove("error");
    errorType.classList.add("hidden");
};

let currentDeck = {
    name:"",
    description:"",
    uniqueCards:[]
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

//this is actually an "Update" button, change submit to "Save" later for final push to db
updatePreview.onclick = () => {
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
        currentDeck.name = deckTitle.value;
        currentDeck.description = deckDescription.value;
        while (currentDeck.uniqueCards.length > 0) {
            currentDeck.uniqueCards.pop();
        }
        while (previewDecklist.firstChild) {
            previewDecklist.removeChild(previewDecklist.firstChild);
        }
        arrayOfLines.forEach((line) => {
            let numberOfCard = Number(line.slice(0, line.indexOf(" ")));
            let nameOfCard = line.slice(line.indexOf(" ") + 1);
            /*for i < numberOfCard, query db.cards by cardname (AJAX req), get the card,
            delete the ID, push to array*/
            deckCompiler("http://localhost:3000/builder", numberOfCard, { cardname: nameOfCard })
            let uniqueCard = document.createElement("li");
            uniqueCard.classList.add('card');
            uniqueCard.innerText = `${nameOfCard} x${numberOfCard}`;
            previewDecklist.appendChild(uniqueCard);
        });
        previewTitle.innerText = `${currentDeck.name}`;
    };
};

console.log(`Hello World, we're live!`);

let deckCompiler = (url, quant, data) => {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            delete res._id;
            res.quant = quant;
            currentDeck.uniqueCards.push(res);
            console.log(res);
        })
        .catch((err) => console.log(`Error: `, err));
};

/*This will be the actual save (submit) button*/
let putRequest = (url, data) => {
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({
            "Content-Type": "application/json"
        }),
    })
    .then((res) => res.json())
    .then((res) => console.log(`Success: `, res))
    .catch((err) => console.error(`Error: `, err));
};

// submit.onclick = () => {
//     let payload = {};
//     payload.cardname = cardnameInput.value;
//     console.log(payload.cardname);
//     ("http://localhost:3000/builder", payload)
// };

// submit.onclick = () => {
//     putRequest("http://localhost:3000/builder", currentDeck);
// };

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

                };
            };
    });
})};

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
