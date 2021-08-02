'use strict';
//object for the cardgame
const playersDeck = {
hiddenCardsPlaced: false,
visibleCardsPlaced: false,
};

const deckMechanics = {
allPlayers: [],
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
drawCards : function(amountCards) {
    for (let i = 0; i < amountCards; i++) {
         for(let i = 0; i < this.allPlayers.length; i++) {
           let player = this.allPlayers[i];
            if(playersDeck[player] === undefined) { 
             playersDeck[player] = [];
            }
        playersDeck[player].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
        };
    }
    
},
placeTheHiddenCards: function(numberOfCards){
    const container = document.getElementById('cards'); 
    this.allPlayers.forEach(function(count){
        let playerMainDiv = document.createElement('div');
        playerMainDiv.id = count;
        playerMainDiv.className = 'playerDeck';
        container.appendChild(playerMainDiv)
        const playerContainer = document.getElementById(count);
        for (let i=0; i < numberOfCards; i++){
            let playersCards = document.createElement('div');
            playersCards.className = 'card';
            playersCards.innerHTML = "BACK OF CARDS";
            playerContainer.appendChild(playersCards);  
        }
    });
    playersDeck.hiddenCardsPlaced = true;
},
placeTheVisibleCards: function(numberOfCards){
    this.allPlayers.forEach(function(count){
        const playerContainer = document.getElementById(count);
        for(let i = 0; i < numberOfCards; i++) {
            let player = deckMechanics.allPlayers[i];
            playerContainer.getElementsByClassName("card")[i].innerHTML = playersDeck[count][i,i+3]; 
        } 
    });
    playersDeck.visibleCardsPlaced = false;
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
 
morten.addPlayer();
carly.addPlayer();
 
const theButton = document.getElementById('button');
//Need different states
theButton.addEventListener("click", () => {
    if(playersDeck.hiddenCardsPlaced === false){
            deckMechanics.drawCards(3);
            deckMechanics.placeTheHiddenCards(3);
            console.log(playersDeck);    
    } else if (playersDeck.hiddenCardsPlaced === true) {   
        deckMechanics.drawCards(3);
        deckMechanics.placeTheVisibleCards(3);
        console.log(playersDeck); 
       // myDeck.placeTheToppCards();
        //myDeck.synligeTreKort = true;
    } else if (playersDeck.hiddenCardsPlaced === true && playersDeck.visibleCardsPlaced === true) {
        console.log("TOILET"); 
        console.log(playersDeck); 
       // myDeck.pickRandomCard(3);
        //myDeck.passThreeCardsOnHand();
        //myDeck.passOutThreeCardsOnHand = true;
    } else if (myDeck.tableSet === false) {
       //myDeck.pickRandomCard(1);
        //myDeck.drawFromDeck();
    }
});