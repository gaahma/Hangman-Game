/*
	Takes the guess from the user, and plays the guess.
	Only alphabet letters are accepted into play
*/
document.onkeyup = function(event){
	var letter = String.fromCharCode(event.keyCode).toLowerCase();
	if(isAlphabet(letter) && game.gameOver === false){
		game.play(letter);
	}
}

/*
	This function checks whether a character is a letter
	of the alphabet.  Put this into a function for readability
*/
function isAlphabet(letter){
	return (letter.match(/[a-z]/i));
}

var game = {
	wordBank: ["archer", "woodhouse", "lana kane", "phrasing", "tinnitus", "duchess", "malory archer", 
			   "cyril figgis", "ray gillette", "dr krieger", "pam poovey", "cheryl tunt",
			   "sterling", "barry dylan", "ron cadillac", "burt reynolds", "katya kazanova", 
			   "nikolai jakov", "trinette", "rip riley", "len trexler", "brett bunsen", "danger zone", 
			   "chet manley", "lacrosse", "conway stern"],
	numOfGuesses: 7,
	puzzle: "",
	failedLetters: [],
	usedLetters: [],
	wins: 0,
	losses: 0,
	word: "",
	gameOver: false,

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
		var sound;
		if (this.letterUnused(letter)){			//if letter hasn't been guessed already
			if (this.hasLetter(letter)){			//and if the word contains the letter...
				this.updatePuzzle(letter);				//update the game puzzle
				this.usedLetters.push(letter);			//add the letter to the usedLetters array
				sound = "bwoop";
			} else {								//otherwise
				this.failedLetters.push(letter);		//add the letter to failedLetters array
				this.numOfGuesses--;					//decrement the number of guesses remaining
				sound = "noop";							
				if (this.numOfGuesses === 0){				//if the guesses is now 0, the round is over..
					this.losses++;								//increase the loss counter
					if (this.gameIsOver()){						//check whether or not the game has ended
						this.endGame();
						return;
					} else {
						this.reset();							//reset the game with a new word
						sound = "no";
					}
				}
			}
			if(this.puzzle === this.word){		//if the puzzle = word, it has been solved...
				this.wins++;						//increment the win counter
				this.addToWinList(this.word);		//add the word to the list of wins on the side of page
				sound = "winner";
				if (this.gameIsOver()){				//if the game has ended
					this.endGame();						//run endGame to display game over screen	
					return;
				} else {
					this.reset();						//reset the game with a new word
				}	
			}
			this.updateBrowser();	//updateBrowser and playSound get called last, and only if a
			this.playSound(sound);	//new letter was put into play (letterUsed())
		}									
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
	guesses.  It also preserves spaces
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
		document.querySelector("#losses").innerHTML = "Losses: " + this.losses;
	},
/*
	Converts the array of incorrect guesses into
	an easy to read string. 
*/
	failedLettersString: function(){
		var str = "";
		for (var c in this.failedLetters){
			str = str + this.failedLetters[c] + " ";
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
	Checks whether or not the user's guess in actually in the word.
	Returns true or false
*/
	hasLetter: function(guess){
		return (this.word.includes(guess));
	},
/*
	Resets all the game variables (except wins and losses)
	so that another word can be played.
*/
	reset: function(){
		this.numOfGuesses = 7;
		this.usedLetters = [];
		this.failedLetters = [];
		this.puzzle = "";  //Needs to be an emptry string for makePuzzle() to do it's work
		this.removeFromWordBank(this.word);
		this.newWord();
		this.makePuzzle();
	},
/*
	If a puzzle is solved, add the word to beginning of
	the win-list div
*/
	addToWinList: function(word){
		var currentList = document.getElementById("win-list");
		var newWin = document.createElement("p");
		newWin.innerHTML = word;
		currentList.insertBefore(newWin, currentList.firstChild);
	},
/*
	The name says it all... removes a word from the word bank 
	so the user doesn't get any duplicate words in the same game
*/
	removeFromWordBank: function(word){
		var index = this.wordBank.indexOf(word);
		if (index > -1){
			this.wordBank.splice(index, 1);
		}
	},
/*
	Determines if the game has reached the end of wordBank
*/
	gameIsOver: function(){
		if(this.wordBank.length === 1){	//if 1, then the game is currently playing the last word
			this.gameOver = true;		//end the game
			return true;
		} else {
			return false;
		}
	},
/*
	Displays final game info to user.  I decided to recycle
	the ids rather than generating new html for this.  
*/
	endGame: function(){
		var totalWords = this.wins + this.losses;
		var score = "Score: " + this.wins + " / " + totalWords;
		document.querySelector("#wins").innerHTML = "Wins: " + this.wins;
		document.querySelector("#puzzle").innerHTML = "game over";
		document.querySelector("#guesses-remaining").innerHTML = score;
		document.querySelector("#failed-guesses").innerHTML = "refresh page to play again";
		document.querySelector("#losses").innerHTML = "";
		this.playSound("game over");

	},
/*
	Plays the appropriate sound, depending on what string is passed
*/
	playSound(sound){
		console.log("reached");
		switch(sound){
			case "bwoop":
				new Audio("assets/sounds/bwoop.mp3").play();
				break;
			case "noop":
				new Audio("assets/sounds/noop.mp3").play();	
				break;
			case "game over":
				new Audio("assets/sounds/game-over.mp3").play();
				break;	
			case "winner":
				new Audio("assets/sounds/winner.mp3").play();
				break;
			case "no":
				new Audio("assets/sounds/no.mp3").play();
				break;
		}
	}
}




