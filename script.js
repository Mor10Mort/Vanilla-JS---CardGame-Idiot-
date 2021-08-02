'use strict';
//object for the cardgame
const playersDeck = {

};

const deckMechanics = {
amountOfPlayer: 2,
allPlayers: [],
firstThreeCardsPlaced: false,
myCard: [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "Knekt", "Dronning", "Kongen", "Ess"],
mySuit: ["hjerte", "diamant", "klover","spar"],
allCards: [], 
createTheDeck: function getCard (){
    for (let rep = 0; rep < this.myCard.length; rep++) {
        const card = this.myCard[rep];
        for (let suity = 0; suity < this.mySuit.length; suity++) {
            const cardWithSuit = this.mySuit[suity];
            this.allCards.push(card+" "+cardWithSuit);
            }  
        }
    },
randoNumber: function() {
    return Math.floor(Math.random() * this.allCards.length);
    },
};

deckMechanics.createTheDeck();
 
const pickedCards = function (nameOfPlayer) {
    this.nameOfPlayer = nameOfPlayer;
    this.pickedPlayerCards = [];
    this.allPlayers = [];
    this.activePlayer = false;
};

pickedCards.prototype.addPlayer = function () {
    deckMechanics.allPlayers.push(this.nameOfPlayer);
};

pickedCards.prototype.placeTheHiddenCards = function(){
    for (let i = 0; i < 3; i++){
        document.getElementById('deck1').getElementsByClassName("card")[i].innerHTML = "FLIPPED";
        document.getElementById('deck2').getElementsByClassName('card')[i].innerHTML = "FLIPPED";
    }
 };   

//Create the new players
const morten = new pickedCards('morten');
const carly = new pickedCards('carly');
morten.addPlayer();
carly.addPlayer();

function drawFromPile (amountCards) {
    for (let i = 0; i < amountCards; i++) {
        //HERE I WOULD LIKE TO CREATE AN ARRA BASED ON all players inside 'deckMechanics.allPlayers'. The array for the player should have inserted "amountCards" into its array.
        
        //playersDeck.player1.push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
        //playersDeck.player2.push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
    }
    //deckMechanics.firstThreeCardsPlaced = true;
};

const theButton = document.getElementById('button');
theButton.addEventListener("click", () => {
        if(deckMechanics.firstThreeCardsPlaced === false){
        //First click, only to push out three cards (place down on table)
            drawFromPile(3);
                     
            /*
            morten.drawFromPile(3); 
            carly.drawFromPile(3);
            morten.amountOfCardspicked();
            morten.placeTheHiddenCards();
            carly.placeTheHiddenCards();
            */
        
    } else if (deckMechanics.firstThreeCardsPlaced === true) {
        //Second click, to push out three new cards (place up on table)
       
       // myDeck.placeTheToppCards();
        //myDeck.synligeTreKort = true;
    } else if (myDeck.passOutThreeCardsOnHand === false) {
       // myDeck.pickRandomCard(3);
        //myDeck.passThreeCardsOnHand();
        //myDeck.passOutThreeCardsOnHand = true;
    } else if (myDeck.tableSet === false) {
       //myDeck.pickRandomCard(1);
        //myDeck.drawFromDeck();
    }
});