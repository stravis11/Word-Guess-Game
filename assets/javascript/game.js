
//Set initial left image

document.getElementById('randImage').src = "assets/images/image3.jpg";

//Start a new game

function startGame() {
		
	//Array of words to guess
	wordGuess = ["greedo","admiral+akbar","lando+calrissian","palpatine","tatooine","yoda","chewbacca","wookie","r2-d2","c-3po","han+solo","luke+skywalker","darth+vader","light+saber","jaba+the+hut","boba+fett","obi-wan+kenobi","princess+leia"];
	
	//Pick a random word from the word array
	randomPick = wordGuess[Math.floor(Math.random() * wordGuess.length)];
	console.log(randomPick);

	//Count word guess characters
	var searchDashes = "-"
	var searchAnds = "+"
	for(var i=countDashes=0; i<randomPick.length; countDashes+=+(searchDashes===randomPick[i++]));
	for(var i=countAnds=0; i<randomPick.length; countAnds+=+(searchAnds===randomPick[i++]));
	var answerLength = randomPick.length - countDashes - countAnds;
	console.log(searchDashes);
	console.log(searchAnds);

	//Set reminaing guesses
	var counter = 10;
	var win = 0;

	//Set initial values
	document.getElementById("count").innerHTML = counter;
	document.getElementById("wins").innerHTML = wins;
	document.getElementById('hangmanImage').src = 'assets/images/hangman1.jpg';
	document.getElementById("letters").innerHTML = [];

	//Generate random left column image
	var leftImages = ["assets/images/image1.jpg","assets/images/image2.jpg","assets/images/image4.jpg","assets/images/image5.jpg"];
	var randImages = leftImages[Math.floor(Math.random() * leftImages.length)];
	console.log(randImages);
	document.getElementById('randImage').src = randImages;

	//Replace random word with dashes
	var answerArray = randomPick.split("");

	for (var i = 0; i < randomPick.length; i++) {
		if (answerArray[i] === "+") {
			answerArray[i] = "+";
		} else if (answerArray[i] == "-") {
			answerArray[i] = "-";
		}
		else {
			answerArray[i] = "_";
		}
	}
	document.getElementById("answer").innerHTML = answerArray.join(" ");

	
	var your_array = [];

	document.onkeydown = function (e) {
		var keyPress;
		//Make an array while ignoring duplicate characters
		if (typeof event !== 'undefined') {
		    keyPress = event.keyCode;
		}
		else if (e) {
			keyPress = e.which;
		}

		your_array.push(String.fromCharCode(keyPress));
			var uniq = your_array.reduce(function(a,b){
	    	if (a.indexOf(b) < 0 ) a.push(b);
	    	return a;
	  	},[]);

		//Creating string of guessed words
		var lettersGuessedArrString = uniq.toString().toLowerCase();
		letterAns = uniq.toString().toLowerCase().replace(/,/g,"");
		var lettersGuessedArrEdited = lettersGuessedArrString.replace(/,/g,", ");
		document.getElementById("letters").innerHTML = lettersGuessedArrEdited;



		//Add keyboard listener
		document.onkeyup = function (event) {
			console.log(event.key);
			var keyStroke=event.key;

			//Variable for counting misses
			var test = false;

			//Variable for counting hits
			var hits = 0;


			//If keystroke not used before, variable letter is passed through
			if (uniq.length === your_array.length) {
				var letter = keyStroke;
				console.log(uniq, your_array)
			}
			//If keystroke already used, remove last one used and set letter as empty
			if (uniq.length !== your_array.length) {
				your_array.pop();
				console.log(uniq, your_array);
				var letter = "";
				test = true;
			}

			//Loop checking letter value with random word array
			if (letter.length > 0) {
			console.log(letter)

				for (var j = 0; j < randomPick.length; j++) {
					if (letter === randomPick[j]) {
						answerArray[j] = letter;
						test = true;
						hits += 1;
					}
				}

			}


			var youWon = 0

			//Add how many correct hits were met
			if (win < answerLength) {
					win += hits;
					document.getElementById("answer").innerHTML = answerArray.join(" ");
					console.log("win:" + win)
					console.log(answerLength)
			}
			if (win === answerLength) {
				//Change image to win
				document.getElementById('hangmanImage').src = 'assets/images/youwin.png';
				

				//Change wins
				youWon = 1;
				wins = wins + youWon;
				document.getElementById("answer").innerHTML = answerArray.join(" ");
				
				
			}
			
			//Count wrong guesses and change image for loss
			if (test == false) {
				if (counter <= 10 && counter >= 0) {
					counter--;
					
					document.getElementById("count").innerHTML = counter;

						if (counter === 0) {
						document.getElementById('hangmanImage').src = 'assets/images/youlose.png';
						counter = 0;
						
					};
				};
			};
			
		};

	};

};
