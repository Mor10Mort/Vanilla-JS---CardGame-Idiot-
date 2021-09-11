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
    noMoClicks: false,
    allPlayers: [],
    myCard: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Knekt", "Dronning", "Kongen", "Ess"],
    mySuit: ["hjerte", "diamant", "klover", "spar"],
    allCards: [],
    stepThroughEachPlayer: function () {
        let thePlayerCounter = this.countNextPlayer == deckMechanics.allPlayers.length - 1;
        if (thePlayerCounter) {
            this.countNextPlayer = 0;
        } else {
            this.countNextPlayer++;
        }
        return this.countNextPlayer;

    },
    getValueOfCard: function (str) {
        return str.split(" ")[0];
    },
    countNextPlayer: 0,
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
        this.allPlayers.forEach(function (count) {
            let playerMainDiv = document.createElement('div');
            playerMainDiv.id = count;
            playerMainDiv.className = 'playerDeck';
            let playerName = document.createElement('h2');
            playerName.innerHTML = count.charAt(0).toUpperCase() + count.slice(1);
            container.appendChild(playerMainDiv).appendChild(playerName);
            //forEachRemove: function (theArray, theClass) {

            for (let i = 0; i < numberOfCards; i++) {
                let playersCards = document.createElement('div');
                playersCards.className = 'card';
                playersCards.innerHTML = playersDeck[count][i, i + 3];
                document.getElementById(count).appendChild(playersCards);
                if (i > 2) {
                    playersCards.addEventListener("click", clickClickRules);



                    function clickClickRules(event) {

                        let valuePlayerDeck = deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(this.innerHTML));
                        let theCardTableValue = deckMechanics.myCard.indexOf(deckMechanics.getValueOfCard(playersDeck.theDeckOnTable[0][0]));
                        console.log(valuePlayerDeck + " vs " + theCardTableValue);
                        console.log(this.innerHTML + " vs " + playersDeck.theDeckOnTable[0][0]);
                        if (valuePlayerDeck >= theCardTableValue) {
                            console.log("Nice play");
                            let theSelectedCard = playersDeck[count].findIndex(rank => rank == this.innerHTML);
                            console.log("before: ", playersDeck[count])
                            playersDeck.theDeckOnTable.push(playersDeck[count][theSelectedCard]);
                            playersDeck[count].splice(theSelectedCard, 1);
                            console.log("after: ", playersDeck[count])

                            console.log("the Deck after pushed in new card: ", playersDeck.theDeckOnTable);

                            let playerDeck = document.getElementById("deck").getElementsByTagName("div")[0];
                            playerDeck.style = "border:3px solid blue;";
                            playerDeck.innerHTML = playersDeck.theDeckOnTable[playersDeck.theDeckOnTable.length - 1];
                            thePlayerPlayTheCard.disabled = true;
                            //deckMechanics.playerCounter(deckMechanics.stepThroughEachPlayer());
                            this.parentNode.removeChild(this);
                            //event.stopImmediatePropagation();



                        } else {
                            console.log("NOPE");

                            //playersDeck.playersSelectedCardOnTable.pop();
                            //event.stopImmediatePropagation();
                        }


                        //event.stopImmediatePropagation();

                    }

                }
            }
            //            deckMechanics.forEachRemove(playersCards, "selectedCard");
        });
        playersDeck.visibleCardsPlaced = false;
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

        giveMeExtraCardBtn.disabled = false;
        this.allPlayers.forEach(function (value, i) {
            document.getElementById(deckMechanics.allPlayers[i]).classList.remove("activePlayer");
        });
        let thePlayersTitle = document.getElementById(deckMechanics.allPlayers[playerNR]);
        thePlayersTitle.classList.add("activePlayer");
        //let thePlayersCardsOnHand = document.getElementById(deckMechanics.allPlayers[playerNR] + "playerCardsOnHands").querySelectorAll('div');
        //playersDeck.thePlayersCardsOnHand.push(document.getElementById(deckMechanics.allPlayers[playerNR] + "playerCardsOnHands").querySelectorAll('div'));

        let playersCardOnHands = document.getElementById(deckMechanics.allPlayers[playerNR]).getElementsByClassName("card");


        giveMeExtraCardBtn.addEventListener("click", function () {
            console.log(playerNR);
            if (deckMechanics.allCards.length === 0) {
                giveMeExtraCardBtn.disabled = true;
            }

            playersDeck[deckMechanics.allPlayers[playerNR]].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));


            let giveMeANewCardYouSOnOffAB = document.createElement('div');
            giveMeANewCardYouSOnOffAB.className = 'card';
            giveMeANewCardYouSOnOffAB.innerHTML = playersDeck[deckMechanics.allPlayers[playerNR]].pop();
            document.getElementById(deckMechanics.allPlayers[playerNR] + "playerCardsOnHands").appendChild(giveMeANewCardYouSOnOffAB);

        });
        deckMechanics.theRulesOfTheDeck();
    },
    theRulesOfTheDeck: function (thePlayerPlacingCards) {
        thePlayerPlayTheCard.addEventListener("click", function () {


        });


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
giveMeExtraCardBtn.disabled = true;

deckMechanics.drawCards(9);
deckMechanics.drawCardToDeck(1);
deckMechanics.placeTheVisibleCards(6);
//deckMechanics.giveOutCardsToPlayerHands(3);

//theButton.disabled = true;
deckMechanics.playerCounter(0);




