var word;
var puzzle = "";
var guessesRemaining = 15;
var usedLetters;
var wordBank = ["ridley", "laura", "adam", "archer", "woodhouse"];



function Game() {

	this.newWord = function() {
		word = wordBank[Math.floor(Math.random() * wordBank.length)];
		console.log("Word selected: " + word);
	},

	this.makePuzzle = function() {
		for (var i = 0; i < word.length; i++){
			puzzle += "_ ";
		}
		console.log(puzzle);
	},

	this.play = function() {
		console.log("Play started");

	}


}

function Round(word, guessesRemaining) {
	this.guessesRemaining = guessesRemaining;
	this.word = word;
	var guessedLetters = "";

	

}  

function hasLetter(word, guess){
	this.atIndexes = [];
	this.word = word.toLowerCase();
	var containedGuess = false;

	for (var index in this.word){
		if (this.word[index] === guess){
			containedGuess = true;
			atIndexes.push(parseInt(index));
		}
	}

	if (containedGuess){
		return this.atIndexes;
	} else {
		return false;
	}

}

