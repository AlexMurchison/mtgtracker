let createDeck = () => {
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

createDeck();

let autocomplete = (input, array) => {
    let currentFocus;
    input.addEventListener("input", () => {
        let parentBox, childBox, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        };
        currentFocus = -1;
        parentBox = document.createElement('div');
        parentBox.setAttribute("id", )


    })
}