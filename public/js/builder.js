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
let creatures = document.getElementById('creatures');
let spells = document.getElementById('spells');
let enchantments = document.getElementById('enchantments');
let planeswalkers = document.getElementById('planeswalkers');
let land = document.getElementById('land');
let artifacts = document.getElementById('artifacts');
let previewSideboard = document.getElementById('previewSideboard');
let mainboardToggle = document.getElementById('mainboardToggle');
let sideboardToggle = document.getElementById('sideboardToggle');
let previewErrors = document.getElementById('previewErrorWrapper');
let previewName = document.getElementById('previewName');
let previewQuant = document.getElementById('previewQuant');

let cardDiv = document.querySelector('div#cardnameWrapper');
let quantError = document.querySelector('#cardQuantityWrapper > p.hidden');
let cardError = document.querySelector('#cardnameWrapper > p.hidden');
let cardTypes = document.querySelectorAll('.cardtype');

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
    uniqueCards:[],
    mainboardCards: 0,
    sideboardCards: 0
};

let deckValid = false;
let activePanel = 'mainboard'

updatePreview.onclick = () => {
    const parsedMainboard = mainboard.value.split('\n');
    const parsedSideboard = sideboard.value.split('\n');
    console.log(parsedMainboard);

    currentDeck.name = deckTitle.value;
    // currentDeck.description = deckDescription.value;

    while (currentDeck.uniqueCards.length > 0) {
        currentDeck.uniqueCards.pop();
    };

    cardTypes.forEach((type) => {
        while (type.childNodes.length > 1) {
            type.removeChild(type.lastChild);
        }
    });

    while (previewName.firstChild) {
        previewName.removeChild(previewName.lastChild);
    };

    while (previewQuant.firstChild) {
        previewQuant.removeChild(previewQuant.lastChild);
    }
    currentDeck.mainboardCards = 0
    currentDeck.sideboardCards = 0
    previewName.classList.add('toggleOff');
    previewQuant.classList.add('toggleOff');
    previewErrors.classList.add('toggleOff');
    previewTitle.innerText = `${currentDeck.name}`;
    parsedMainboard.forEach((card, index) => {
        let numberOfCard = Number(card.slice(0, card.indexOf(" ")));
        let nameOfCard = card.slice(card.indexOf(" ") + 1);
        if (isNaN(numberOfCard)) {
            deckValid = false;
            previewErrors.classList.remove('toggleOff');
            previewQuant.classList.remove('toggleOff');
            let newError = document.createElement('li');
            newError.classList.add('previewError');
            newError.innerText = `Please check the number formatting on mainboard line ${index + 1}: <#> <Card Name>`;
            previewQuant.appendChild(newError);
            return false;
        } else {
            getQuery("http://localhost:3000/api/?cardname=" + nameOfCard, (validateCard) => {
                if (!validateCard) {
                    previewErrors.classList.remove('toggleOff');
                    previewName.classList.remove('toggleOff');
                    let newError = document.createElement('li');
                    newError.classList.add('previewError');
                    newError.innerText = `Please check the card name formatting on mainboard line ${index + 1}: <#> <Card Name>`;
                    previewName.appendChild(newError);
                    return false;
                } else {
                    deckCompiler("http://localhost:3000/builder", numberOfCard, { cardname: nameOfCard }, (currentCard) => {
                        if (currentCard.types.includes('Land')) {
                            let newCard = document.createElement("li");
                            newCard.classList.add('card');
                            newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                            land.appendChild(newCard);
                            currentDeck.mainboardCards += numberOfCard;
                        } else if (currentCard.types.includes('Creature')) {
                            let newCard = document.createElement("li");
                            newCard.classList.add('card');
                            newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                            creatures.appendChild(newCard);
                            currentDeck.mainboardCards += numberOfCard;
                        } else if (currentCard.types.includes('Artifact')) {
                            let newCard = document.createElement("li");
                            newCard.classList.add('card');
                            newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                            artifacts.appendChild(newCard);
                            currentDeck.mainboardCards += numberOfCard;
                        } else if (currentCard.types.includes('Enchantment')) {
                            let newCard = document.createElement("li");
                            newCard.classList.add('card');
                            newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                            enchantments.appendChild(newCard);
                            currentDeck.mainboardCards += numberOfCard;
                        } else if (currentCard.types.includes('Instant') || currentCard.type.includes('Sorcery')) {
                            let newCard = document.createElement("li");
                            newCard.classList.add('card');
                            newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                            spells.appendChild(newCard);
                            currentDeck.mainboardCards += numberOfCard;
                        } else if (currentCard.types.includes('Planeswalker')) {
                            let newCard = document.createElement("li");
                            newCard.classList.add('card');
                            newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                            planeswalkers.appendChild(newCard);
                            currentDeck.mainboardCards += numberOfCard;
                        } else {
                            /*Fail Case*/
                        };
                    });
                };
            });
        };
    });
    parsedSideboard.forEach((card, index) => {
        let numberOfCard = Number(card.slice(0, card.indexOf(" ")));
        let nameOfCard = card.slice(card.indexOf(" ") + 1);
        if (isNaN(numberOfCard)) {
            deckValid = false;
            previewErrors.classList.remove('toggleOff');
            previewQuant.classList.remove('toggleOff');
            let newError = document.createElement('li');
            newError.classList.add('previewError');
            newError.innerText = `Please check the number formatting on sideboard line ${index + 1}: <#> <Card Name>`;
            previewQuant.appendChild(newError);
        } else {
            getQuery("http://localhost:3000/api/?cardname=" + nameOfCard, (validateCard) => {
                if (!validateCard) {
                    previewErrors.classList.remove('toggleOff');
                    previewName.classList.remove('toggleOff');
                    let newError = document.createElement('li');
                    newError.classList.add('previewError');
                    newError.innerText = `Please check the card name formatting on sideboard line ${index + 1}: <#> <Card Name>`;
                    previewName.appendChild(newError);
                    return false;
                } else {
                    deckCompiler("http://localhost:3000/builder", numberOfCard, { cardname: nameOfCard }, (currentCard) => {
                        let newCard = document.createElement("li");
                        newCard.classList.add('card');
                        newCard.innerText = `${nameOfCard} x${numberOfCard}`;
                        previewSideboard.appendChild(newCard);
                        currentDeck.sideboardCards += numberOfCard;
                    });
                };
            });
        };
    });
};

console.log(`Hello World, we're live!`);

const pushCard = (queryResult, panel) => {
    console.log(`Found the following card: `, queryResult);
    hideError(cardError);
    hideError(quantError);
    if (!queryResult) {
        showError(cardError);
    } else {
        if (panel === 'mainboard') {
            if (mainboard.value === '') {
                mainboard.value = mainboard.value + `${quantityInput.value} ${queryResult.name}`
            } else {
                mainboard.value = mainboard.value + `\n${quantityInput.value} ${queryResult.name}`
            };
        } else if (panel === 'sideboard') {
            if (sideboard.value === '') {
                sideboard.value = sideboard.value + `${quantityInput.value} ${queryResult.name}`
            } else {
                sideboard.value = sideboard.value + `\n${quantityInput.value} ${queryResult.name}`
            };
        };
        deckValid = true;
    };
    console.log(Number(quantityInput.value));
};

mainboardToggle.onclick = () => {
    activePanel = 'mainboard';
    sideboard.classList.add('toggleOff');
    mainboard.classList.remove('toggleOff');
};

sideboardToggle.onclick = () => {
    activePanel = 'sideboard';
    mainboard.classList.add('toggleOff');
    sideboard.classList.remove('toggleOff');
};

addCard.onclick = () => {
    console.log(cardnameInput.value);
    deckValid = false;
    if (isNaN(quantityInput.value)) {
        showError(quantError);
    } else {
        if (activePanel === 'mainboard') {
            getQuery("http://localhost:3000/api/?cardname=" + cardnameInput.value, pushCard, 'mainboard');
        } else if (activePanel === 'sideboard') {
            getQuery("http://localhost:3000/api/?cardname=" + cardnameInput.value, pushCard, 'sideboard');
        } else {
            console.log(`Something has gone terribly wrong. Contact me @ emailaddress.com`)
        }
    };
};

let getQuery = (url, callback, panel) => {
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
            callback(res, panel);
        })
        .catch((err) => console.log(`Error: `, err));
};

let deckCompiler = (url, quant, data, callback) => {
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
            callback(res);
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

submit.onclick = () => {
    if (!deckValid) {
        console.log(`Deck has not been validated, please Update Preview`);
    } else {
        putRequest("http://localhost:3000/builder", currentDeck);
    };
};

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