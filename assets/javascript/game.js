/*
	Takes the guess from the user, and plays the guess.
	Only alphabet letters are accepted into play
*/
document.onkeyup = function(event){
	var letter = String.fromCharCode(event.keyCode).toUpperCase();
	if(isAlphabet(letter)){
		game.play(letter);
	}
}

var game = {
	wordBank: ["ARCHER", "WOODHOUSE", "LANA KANE", "PHRASING", "TINNITUS", "DUCHESS", "MALORY ARCHER", 
			   "CYRIL FIGGIS", "RAY GILLETTE", "DOCTOR KRIEGER", "PAM POOVEY", "CHERYL TUNT",
			   "STERLING ARCHER", "BARRY DYLAN", "RON CADILLAC", "BURT REYNOLDS", "KATYA KAZANOVA", 
			   "NIKOLAI JAKOV", "TRINETTE", "RIP RILEY", "LEN TREXLER", "BRETT BUNSEN"],
	winBank: [],
	numOfGuesses: 9,
	puzzle: "",
	failedLetters: [],
	usedLetters: [],
	wins: 0,
	losses: 0,
	word: "",

/*
	Initializes the game with a word, creates a puzzle,
	and sends the game to the browser
*/
	init: function(){
		this.newWord();
		this.makePuzzle();
		this.updateBrowser();

	},
/*
	Takes a user guess, and puts it into play
*/	
	play: function(letter){
		if (this.letterUnused(letter)){			//if letter hasn't been guessed already
			if (this.hasLetter(letter)){			//and if the word contains the letter...
				this.updatePuzzle(letter);				//update the game puzzle
				this.usedLetters.push(letter);			//add the letter to the usedLetters array
			} else {								//otherwise
				this.failedLetters.push(letter);		//add the letter to failedLetters array
				this.numOfGuesses--;					//decrement the number of guesses remaining
				if (this.numOfGuesses === 0){				//if the guesses is now 0, the round is over..
					this.losses++;								//increase the loss counter
					this.reset();								//reset the game with a new word
				}
			}
			if(this.puzzle === this.word){		//if the puzzle = word, it has been solved...
				this.wins++;						//increment the win counter
				this.reset();						//reset the game with a new word
			}
			this.updateBrowser();				//updateBrowswer() only gets called if the letter had
		}										//not been previously used
	},

/*
	Selects a random word from the wordBank 
*/
	newWord: function(){
		var index = Math.floor(Math.random() * this.wordBank.length);
		var newWord = this.wordBank[index];
		this.word = newWord;
		console.log("Word selected: " + this.word);
	},
/*
	Creates a string of underscores the same length as 
	the word in play.
*/
	makePuzzle: function(){	
		var newPuzzle = "";
		for (var i = 0; i < this.word.length; i++){
			if (this.word[i] === " "){ 		//if a character is a space..
				newPuzzle += " "; 			//keep it in place
			} else {
				newPuzzle += "_";			//otherwise substitute "_"
			}
		}
		console.log(newPuzzle);
		this.puzzle = newPuzzle;
	},

/*
	Although displayed to the user with spaces between each character,
	the puzzle variable isn't actually stored that way.  
	This function adds white space for readability. 
*/
	displayPuzzle: function(){
		var display = "";
		for (var c in this.puzzle){
			if (this.puzzle[c] === " "){
				display = display + "&nbsp;" + "&nbsp;" + "&nbsp;"  //would have thought display + "  " would work
			} else {												//but it doesn't.. ¯\_(ツ)_/¯
				display = display + this.puzzle[c] + " ";
			}
		}
		return display;
	},
/*
	When a correct guess has been made, this function adds the
	letter to the puzzle, while retaining any previous correct
	guesses.
*/
	updatePuzzle(letter){
		var updatedPuzzle = "";
		for (var i = 0; i < this.word.length; i++){
			if (this.word[i] === this.puzzle[i]){  				//if a letter is already placed in the puzzle...
				updatedPuzzle = updatedPuzzle + this.puzzle[i];		//keep it in place	
			} else if(this.word[i] === letter){					//else if the guess belongs at a certain index...
				updatedPuzzle = updatedPuzzle + letter;				//place it at that index
			} else {
				updatedPuzzle = updatedPuzzle + "_";			//otherwise, use "_" as a placeholder 
			}
		}
		this.puzzle = updatedPuzzle;							//update the puzzle variable
	},
/*
	The name says it all... update the browser!
*/
	updateBrowser: function(){
		document.querySelector("#puzzle").innerHTML = this.displayPuzzle();
		document.querySelector("#guesses-remaining").innerHTML = "Guesses remaining: " + this.numOfGuesses;
		document.querySelector("#failed-guesses").innerHTML = this.failedLettersString();
		document.querySelector("#wins").innerHTML = "Wins: " + this.wins;
		//document.querySelector("#losses").innerHTML = "Losses: " + this.losses;
	},
/*
	Converts the array of incorrect guesses into
	an easy to read string.  toUpperCase() for
	readability
*/
	failedLettersString: function(){
		var str = "";
		for (var c in this.failedLetters){
			str = str + this.failedLetters[c].toUpperCase() + " ";
		}
		return str;
	},
/*
	Verifies that the guessed letter has not been played yet 
*/
	letterUnused: function(letter){
		if (this.usedLetters.includes(letter) || this.failedLetters.includes(letter)){
			return false;
		} else {
			return true;
		}
	},
/*
	Checks whether or not the user's guess in actually in the word
*/
	hasLetter: function(guess){
		if (this.word.includes(guess)){
			return true;
		} else {
			return false;
		}
	},
/*
	Resets all the game variables (except wins and losses)
	so that another word can be played.
*/
	reset: function(){
		this.numOfGuesses = 9;
		this.usedLetters = [];
		this.failedLetters = [];
		this.puzzle = "";  //Needs to be an emptry string for makePuzzle() to do it's work
		this.newWord();
		this.makePuzzle();
	}
}

/*
	This function checks whether a character is a letter
	of the alphabet
*/
function isAlphabet(letter){
	if (letter.match(/[A-Z]/i)) {
    	return true;
	} else {
		return false;
	}
}


