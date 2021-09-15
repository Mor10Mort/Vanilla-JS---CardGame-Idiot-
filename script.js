'use strict';

//object for the cardgame
const playersDeck = {
    theDeckOnTable: [],
    playersSelectedCardOnTable: [],
    thePlayersCardsOnHand: [],
    cardSteps: 0,
    cardsClickable: []
};


const deckMechanics = {
    firstPlayerUp: false,
    allPlayers: [],
    myCard: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Knekt", "Dronning", "Kongen", "Ess"],
    mySuit: ["hjerte", "diamant", "klover", "spar"],
    allCards: [],
    stepThroughEachPlayer: function () {
        if (this.firstPlayerUp == false) {
            this.firstPlayerUp = true;
            return this.countNextPlayer = 0;
        }
        let thePlayerCounter = this.countNextPlayer == deckMechanics.allPlayers.length - 1;
        if (thePlayerCounter) {
            this.countNextPlayer = 0;
        } else {
            this.countNextPlayer++;
        }
        return this.countNextPlayer;

    },
    getValueOfCard: function (str) {
        let makeItAString = String(str);
        return makeItAString.split(" ")[0];

    },
    countNextPlayer: 0,
    returnCurentPlayer: function () {
        return this.allPlayers[this.countNextPlayer];
    },
    createTheDeck: function getCard() {
        for (let rep = 0; rep < this.myCard.length; rep++) {
            const card = this.myCard[rep];
            for (let suity = 0; suity < this.mySuit.length; suity++) {
                const cardWithSuit = this.mySuit[suity];
                this.allCards.push(card + " " + cardWithSuit);
            }
        }
    },
    randoNumber: function () {
        return Math.floor(Math.random() * this.allCards.length);
    },
    forEachRemove: function (theArray, theClass) {
        theArray.forEach(function (el) {
            el.classList.remove(theClass)
        })
    },
    drawCards: function (amountCards) {
        for (let i = 0; i < amountCards; i++) {
            for (let i = 0; i < this.allPlayers.length; i++) {
                let player = this.allPlayers[i];
                if (playersDeck[player] === undefined) {
                    playersDeck[player] = [];
                }
                playersDeck[player].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
            };
        }
    },
    getKeys: function (query) {
        var keys = Object.keys(datasets).filter(function (key) {
            return !!~key.indexOf(query);
        });

        return keys;
    },
    placeTheVisibleCards: function (numberOfCards) {

        const container = document.getElementById('cards');

        this.allPlayers.forEach(function (count, index) {
            let playerMainDiv = document.createElement('div');
            playerMainDiv.id = count;
            playerMainDiv.className = 'playerDeck';
            if (index == 0) {
                playerMainDiv.className = 'playerDeck activePlayer';

            }
            let playerName = document.createElement('h2');
            playerName.innerHTML = count.charAt(0).toUpperCase() + count.slice(1);
            container.appendChild(playerMainDiv).appendChild(playerName);

            for (let i = 0; i < numberOfCards; i++) {
                let playersCards = document.createElement('div');
                playersCards.className = 'card';
                playersCards.innerHTML = playersDeck[count][i, i + 3];
                document.getElementById(count).appendChild(playersCards);
            }
        });
        playersDeck.visibleCardsPlaced = false;
    },
    whoGetsToClickTheCards: function () {
        //forsøk heller å finne ut at du skal starte på null KUN hvis det er første gangen...
        console.log(this.returnCurentPlayer());

        var elements = document.getElementById(deckMechanics.returnCurentPlayer()).querySelectorAll('div');

        elements.forEach(function (eachDiv) {
            eachDiv.addEventListener("click", clickClickRules);
            giveMeExtraCardBtn.addEventListener("click", handMeAnotherCardBuddy);

        });
        function clickClickRules(event) {

            let valuePlayerDeck = deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(this.innerHTML));
            let theCardTableValue = deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(playersDeck.theDeckOnTable[playersDeck.theDeckOnTable.length - 1]));

            console.log(valuePlayerDeck, theCardTableValue);
            if (valuePlayerDeck >= theCardTableValue) {
                let theSelectedCard = playersDeck[deckMechanics.returnCurentPlayer()].findIndex(rank => rank == this.innerHTML);
                //console.log(theSelectedCard, playersDeck[deckMechanics.returnCurentPlayer()][theSelectedCard]);
                playersDeck.theDeckOnTable.push(playersDeck[deckMechanics.returnCurentPlayer()][theSelectedCard]);
                playersDeck[deckMechanics.returnCurentPlayer()].splice(theSelectedCard, 1);
                let playerDeck = document.getElementById("deck").getElementsByTagName("div")[0];
                playerDeck.style = "border:3px solid blue;";
                playerDeck.innerHTML = playersDeck.theDeckOnTable[playersDeck.theDeckOnTable.length - 1];
                thePlayerPlayTheCard.disabled = true;

                this.parentNode.removeChild(this);
                var elements = document.getElementById(deckMechanics.returnCurentPlayer()).querySelectorAll('div');
                elements.forEach(function (eachDiv) {
                    eachDiv.removeEventListener("click", clickClickRules);
                });

                deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());


            } else {
                console.log("NOPE");
            }
        }
        function handMeAnotherCardBuddy(event) {
            let localPlayer = deckMechanics.allPlayers[deckMechanics.countNextPlayer];
            playersDeck[deckMechanics.returnCurentPlayer()].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
            console.log(playersDeck[deckMechanics.returnCurentPlayer()]);
            let giveMeANewCardYouSOnOffAB = document.createElement('div');
            giveMeANewCardYouSOnOffAB.className = 'card';
            giveMeANewCardYouSOnOffAB.innerHTML = playersDeck[deckMechanics.returnCurentPlayer()].slice(-1);
            document.getElementById(deckMechanics.returnCurentPlayer()).appendChild(giveMeANewCardYouSOnOffAB);
            giveMeANewCardYouSOnOffAB.addEventListener("click", clickClickRules);
            event.stopImmediatePropagation();

        }

    },
    giveOutCardsToPlayerHands: function (numberOfCards) {
        this.allPlayers.forEach(function (count) {
            let playerCardsOnHands = document.createElement('div');
            playerCardsOnHands.id = count + 'playerCardsOnHands';
            playerCardsOnHands.className = 'cardsOnHands';
            document.getElementById(count).appendChild(playerCardsOnHands);
            for (let i = 0; i < numberOfCards; i++) {
                let playersCards = document.createElement('div');
                playersCards.className = 'card';
                document.getElementById(count + 'playerCardsOnHands').appendChild(playersCards);
                playersCards.innerHTML = playersDeck[count][i, i + 6];
            }
        });
        playersDeck.visibleCardsPlaced = false;
    },
    drawCardToDeck: function (numberOfCards) {
        let deckname = document.createElement('h2');
        deckname.style = "text-align:center;";
        deckname.innerHTML = "The deck on table";
        document.getElementById('deck').appendChild(deckname);
        let playerCardsOnHands = document.createElement('div');
        playerCardsOnHands.className = 'card';
        document.getElementById('deck').appendChild(playerCardsOnHands);
        playersDeck.theDeckOnTable.push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
        playerCardsOnHands.innerHTML = playersDeck.theDeckOnTable.at(-1);

    },

    playerCounter: function (playerNR) {

        this.allPlayers.forEach(function (value, i) {
            document.getElementById(deckMechanics.allPlayers[i]).classList.remove("activePlayer");
        });
        let thePlayersTitle = document.getElementById(deckMechanics.allPlayers[playerNR]);
        thePlayersTitle.classList.add("activePlayer");
        let playersCardOnHands = document.getElementById(deckMechanics.allPlayers[playerNR]).getElementsByClassName("card");
        deckMechanics.whoGetsToClickTheCards(playerNR);
    },

};


deckMechanics.createTheDeck();

const pickedCards = function (nameOfPlayer) {
    this.nameOfPlayer = nameOfPlayer;
    this.addPlayer = function () {
        deckMechanics.allPlayers.push(this.nameOfPlayer);
    };
};

//Create the new players
const morten = new pickedCards('morten');
const carly = new pickedCards('carly');
const finley = new pickedCards('finley');
morten.addPlayer();
carly.addPlayer();
finley.addPlayer();

const theButton = document.getElementById('button');
const thePlayerPlayTheCard = document.getElementById('playHand');
const giveMeExtraCardBtn = document.getElementById('giveMeExtraCard');
thePlayerPlayTheCard.disabled = true;

deckMechanics.drawCards(9);
deckMechanics.drawCardToDeck(1);
deckMechanics.placeTheVisibleCards(6);
//deckMechanics.giveOutCardsToPlayerHands(3);

//theButton.disabled = true;
deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());




