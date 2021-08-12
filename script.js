'use strict';

//object for the cardgame
const playersDeck = {
theDeckOnTable:[],
playersSelectedCardOnTable: [],
cardSteps: 0,
};


const deckMechanics = {
allPlayers: [],
myCard: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Knekt", "Dronning", "Kongen", "Ess"],
mySuit: ["hjerte", "diamant", "klover","spar"],
allCards: [],
getValueOfCard: function (str) {
            return str.split(" ")[0];
        },
countNextPlayer: 0,
getLastCardInDeck: function(){
    return playersDeck.theDeckOnTable.length-1;
},
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
placeTheVisibleCards: function(numberOfCards){
    const container = document.getElementById('cards'); 
    this.allPlayers.forEach(function(count){
        let playerMainDiv = document.createElement('div');
        playerMainDiv.id = count;
        playerMainDiv.className = 'playerDeck';
        let playerName = document.createElement('h2');
        playerName.innerHTML = count.charAt(0).toUpperCase() + count.slice(1);
        container.appendChild(playerMainDiv).appendChild(playerName);
        for (let i=0; i < numberOfCards; i++){
            let playersCards = document.createElement('div');
            playersCards.className = 'card';
            playersCards.innerHTML = playersDeck[count][i,i+3]; 
            document.getElementById(count).appendChild(playersCards);  
        }  
    });
    playersDeck.visibleCardsPlaced = false;
},
giveOutCardsToPlayerHands: function(numberOfCards){
    this.allPlayers.forEach(function(count){
        let playerCardsOnHands = document.createElement('div');
        playerCardsOnHands.id = count+'playerCardsOnHands';
        playerCardsOnHands.className = 'cardsOnHands';
        document.getElementById(count).appendChild(playerCardsOnHands);  
        for(let i = 0; i < numberOfCards; i++) {
            let playersCards = document.createElement('div');
            playersCards.className = 'card'; 
            document.getElementById(count+'playerCardsOnHands').appendChild(playersCards);     
            playersCards.innerHTML = playersDeck[count][i,i+6]; 
        } 
    });
    playersDeck.visibleCardsPlaced = false;
},
drawCardToDeck: function(numberOfCards){
    let deckname = document.createElement('h2');
    deckname.style = "text-align:center;";
    deckname.innerHTML = "The deck on table";
    document.getElementById('deck').appendChild(deckname);
    let playerCardsOnHands = document.createElement('div');
    playerCardsOnHands.className = 'card';
    document.getElementById('deck').appendChild(playerCardsOnHands);
    playersDeck.theDeckOnTable.push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
    playerCardsOnHands.innerHTML = playersDeck.theDeckOnTable[this.getLastCardInDeck()];
},
playerCounter: function() {
    for (let i = 0; i < deckMechanics.allPlayers.length; i++){
        let thePlayersTitleRemove = document.getElementById(deckMechanics.allPlayers[i]).getElementsByTagName("H2")[0];
        thePlayersTitleRemove.classList.remove("activePlayer");
    }
   
    let thePlayersTitle = document.getElementById(deckMechanics.allPlayers[this.countNextPlayer]).getElementsByTagName("H2")[0];
    let thePlayerCounter = this.countNextPlayer == deckMechanics.allPlayers.length-1;
    if (thePlayerCounter){
       this.countNextPlayer = 0;
    } else if (!(thePlayerCounter)) {      
        this.countNextPlayer++;
    }
      thePlayersTitle.classList.toggle("activePlayer");

},
theRulesOfTheDeck: function(){
document.getElementById("button").disabled = true;

let thePlayerName = deckMechanics.allPlayers[this.countNextPlayer];
console.log(thePlayerName);
 
let playersDeckCards = document.getElementById(deckMechanics.allPlayers[this.countNextPlayer]+"playerCardsOnHands").getElementsByClassName("card");
 
for (let i=0; i < 3; i++){
playersDeckCards[i].style = "border:3px solid blue; cursor: pointer;";
playersDeckCards[i].addEventListener("click", () => {
    playersDeck.playersSelectedCardOnTable.pop();
        for (let i=0; i < 3; i++){  
            //playersDeckCards[i].playersSelectedCardOnTable.pop();
            playersDeckCards[i].classList.remove("selectedCard");
            playersDeckCards[i].style = "border:3px solid blue; cursor: pointer;";
        }
        
    playersDeck.playersSelectedCardOnTable.push(playersDeckCards[i].innerHTML);
    playersDeckCards[i].classList.add("selectedCard");
    
    playersDeckCards[i].style = "border:3px solid orange; cursor: pointer;";
    document.getElementById("playHand").disabled = false;
    });
}

    const thePlayerPlayTheCard = document.getElementById('playHand');
    thePlayerPlayTheCard.addEventListener("click", () => {
        let valuePlayerDeck = this.myCard.indexOf(deckMechanics.getValueOfCard(playersDeck.playersSelectedCardOnTable[0]));
        let theCardTableValue = this.myCard.indexOf(deckMechanics.getValueOfCard(playersDeck.theDeckOnTable[0][0]));
        console.log(playersDeck.playersSelectedCardOnTable[0], valuePlayerDeck);
        console.log(playersDeck.theDeckOnTable[0][0], theCardTableValue);
        if (valuePlayerDeck >= theCardTableValue){
            console.log("Nice play");
            document.getElementById("button").disabled = false;
            document.getElementById("playHand").disabled = true;
            console.log(playersDeck.theDeckOnTable);
            console.log(this.getLastCardInDeck());
            playersDeck.theDeckOnTable.push(playersDeck.playersSelectedCardOnTable.splice(this.getLastCardInDeck(),1));
            console.log(this.getLastCardInDeck());
            console.log(playersDeck.theDeckOnTable);
            let playerDeck = document.getElementById("deck").getElementsByTagName("div")[0];
            playerDeck.style = "border:3px solid blue;";
            console.log(playersDeck.theDeckOnTable[1]);
            playerDeck.innerHTML = playersDeck.theDeckOnTable[this.getLastCardInDeck()];
            document.getElementById("button").innerHTML = "Next player to draw!";
            //splice(1,playersDeck.playersSelectedCardOnTable[0]);
            //playersDeck.theDeckOnTable.push(splice(playersDeck.playersSelectedCardOnTable[0]));
            //playersDeck[player].push(deckMechanics.allCards.splice(deckMechanics.randoNumber(), 1));
            
        } else {
            console.log("NOPE");
        }

    });

  function verify() {
    document.getElementById("button").disabled = false;
    }

  deckMechanics.playerCounter(); 
},
 
};
document.getElementById("playHand").disabled = true;
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
//Need different states
theButton.addEventListener("click", () => {
    //console.log(playersDeck.cardSteps);
    if(playersDeck.cardSteps === 0){
        document.getElementById("button").innerHTML = "Player one, begin by clicking here";
            deckMechanics.drawCards(9);
            deckMechanics.placeTheVisibleCards(3);
            deckMechanics.giveOutCardsToPlayerHands(3);
            deckMechanics.drawCardToDeck(1);      
            playersDeck.cardSteps++; 
    } else if (playersDeck.cardSteps === 1) {
             deckMechanics.theRulesOfTheDeck();
            
             
        
         
    } else if (playersDeck.cardSteps === 2) {
       
       
    } 
});



