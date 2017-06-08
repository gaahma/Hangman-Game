var word;
var puzzle;
var guessesRemaining;
var usedLetters;
var wordBank = ["ridley", "laura", "adam"];



var game = {

	newWord: function() {
		word = wordBank[Math.floor(Math.random() * wordBank.length)];
		console.log("Word selected: " + word);
	},

	makePuzzle: function() {
		for (var i = 0; i != word.length + 1; i++){
			puzzle += "_ ";
		}
		console.log(puzzle);
	},

	play: function() {
		console.log("Play started");
	}
}  