var wordBank = ["archer", "woodhouse", "malory", "lana", "phrasing", "barry", "tinnitus", ];
var numOfGuesses;
var puzzle;
var failedLetters;
var usedLetters;
var wins = 0;
var losses = 0;
var word;




function reset(){
	numOfGuesses = 9;
	usedLetters = [];
	failedLetters = [];
	puzzle = "";
	word = newWord();
	makePuzzle(word);
}

var Game = {
	init: function(){
		reset();
		updateBrowser();
		document.onkeyup = function(event){
			var letter = String.fromCharCode(event.keyCode).toLowerCase();
			if (isAlphabetical(letter)){
				play(letter);
				updateBrowser();
			}
		}
	}
}

function play(letter){
	if (letterUnused(letter)){
		if (hasLetter(word, letter)){
			updatePuzzle(letter, word);
			usedLetters.push(letter);
		} else {
			failedLetters.push(letter);
			numOfGuesses--;
			if (numOfGuesses === 0){
				losses++;
				reset();
			}
		}
		if(puzzle === word){
			wins++;
			reset();
		}
	}
}

function newWord(){
	var word = wordBank[Math.floor(Math.random() * wordBank.length)];
	console.log("Word selected: " + word);
	return word;
}

function makePuzzle(word){	
	for (var i = 0; i < word.length; i++){
		puzzle += "_";	
	}
}

function hasLetter(word, guess){
	word = word.toLowerCase();
	if (word.indexOf(guess) > -1){
		return true;
	} else {
		return false;
	}
}

function updatePuzzle(letter, word){
	var updatedPuzzle = "";
	for (var i = 0; i < word.length; i++){
		if (word[i] === puzzle[i]){
			updatedPuzzle = updatedPuzzle + puzzle[i];
		} else if(word[i] === letter){
			updatedPuzzle = updatedPuzzle + letter;
		} else {
			updatedPuzzle = updatedPuzzle + "_";
		}
	}
	puzzle = updatedPuzzle;
}

function displayPuzzle(){
	var display = "";
	for (var c in puzzle){
		display = display + puzzle[c] + " ";
	}
	return display;

}

function letterUnused(letter){
	if (usedLetters.includes(letter) || failedLetters.includes(letter)){
		return false;
	} else {
		return true;
	}
}

function failedLettersString(){
	var str = "";
	for (var c in failedLetters){
		str = str + failedLetters[c];
	}
	return str;
}

function updateBrowser(){
	document.querySelector("#puzzle").innerHTML = displayPuzzle();
	document.querySelector("#guesses-remaining").innerHTML = numOfGuesses + " guesses left";
	document.querySelector("#failed-guesses").innerHTML = failedLettersString();
	document.querySelector("#wins").innerHTML = "Wins: " + wins;
	document.querySelector("#losses").innerHTML = "Losses: " + losses;
}

function isAlphabetical(str){
	if (str.match(/[a-z]/i)) {
    	return true;
	}
	return false;
}



 


