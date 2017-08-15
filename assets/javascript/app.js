// Handler for .ready() called
$(function() {

	//*** VARIABLES ***\\

	const TRIVIA_TIME = 30;
	const ANSWER_TIME = 7;

	let wrong = 0;
	let correct = 0;
	let index = -1;
	let result = false;
	let countdown;

	// setInterval variables
	let showTrivia;
	let showAnswer;
	let timer;
	
	// Array to store trivia objects
	let list = [];

	// Objects
	list[0] = {
		question: "There are 8 bits in 1 byte.",
		choices: ["True", "False"],
		answer: "True",
		fact: "The 256 unique combinations of 8 on/off bits in one byte are often used to "+
			"encode common letters or symbols in computer software",
	};
	list[1] = {
		question: "Which was not one of the original 13 states?",
		choices: ["Pennsylvania", "New Hampshire", "Georgia", "Vermont"],
		answer: "Vermont",
		fact: "The original 13 states were Deleware, Pennsylvania, New Jersey, Georgia, Connecticut "+
			"Massachusetts, Maryland, South Carolina, New Hampshire, Virginia, New York, North Carolina "+
			"and Rhode Island."			
	};
	list[2] = {
		question: "What is the definition of proscribe?",
		choices: ["prohibit, forbid", "to order", "authorize the use of", "professional calligrapher"],
		answer: "prohibit, forbid",
		fact: "Proscribe is from the Latin proscribere, to post a person's name as an outlaw."
	};
	list[3] = {
		question: "Wall Street got its name from a wall built to keep hogs from running loose on Manhattan.",
		choices: ["True", "False"],
		answer: "False",
		fact: "Despite claims to the contrary by the National Pork Producers Council, the wall was built "+
			"in 1653 by the Dutch to guard against British and Native American attacks.",
	};
	list[4] = {
		question: "<h3>The Kingsmen's version of \"Louie Louie\" reached number two on the Billboard Top Ten in January 1964. "+
			"What song kept it from hitting number one?</h3>",
		choices: ["Ticket to Ride (The Beatles)", "Moon River (Henry Mancini)", "Wooly Bully (Sam the Sham & the Pharaohs)", "Dominique (The Singing Nun)"],
		answer: "Dominique (The Singing Nun)",
		fact: "The surprise hit featured Sister Luc-Gabrielle singing in French about her Dominican order."
	};


	//*** BUTTONS ***\\

	$("#btnStart").click(loadQuestion);

	// Create onclick to handle dynamically added buttons
	$("#main-content").on("click", "button", function(){
		if($(this).text() === "Play Again"){
			resetGame();
		}
		else{
			checkAnswer($(this));
		}
	});


	//*** FUNCTIONS ***\\

	// Function that loads the current question to the DOM
	function loadQuestion() {

		index++;	
		countdown = TRIVIA_TIME;	

		// Only play if there is another question available
		if(index < list.length){
			// Clear values
			clearInterval(showTrivia);
			clearInterval(timer);
			clearContent();

			// Update html elements
			$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
			$("#question").html("<p>" + list[index].question + "</p>");
			createBtns(list[index].choices);

			// Set intervals
			showAnswer = setInterval(loadAnswer, countdown * 1000);
			timer = setInterval(countdownTimer, 1000);
		}
		else {
			endGame();
		}
	}

	// Function updates HTML with the answer
	function loadAnswer() {
		
		countdown = ANSWER_TIME;

		// Set result if user didn't answer and time ran out
		if (result === false){
			result = "No answer chosen."
		}
		// Clear values
		clearInterval(showAnswer);
		clearInterval(timer);
		$("#time").empty();

		//Update html elements
		$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
		$("#question").html("<p>" + result + "</p>");
		$("#answers").html("<b>" + list[index].answer + "</b> - " + list[index].fact);

		// reset result in case timer ran out
		result = false;

		// Set intervals
		timer = setInterval(countdownTimer, 1000);
		showTrivia = setInterval(loadQuestion, countdown * 1000);
	}

	// Function creates and places the buttons for multiple choice onto HTML
	function createBtns(arr) {
		for(var i = 0; i < arr.length; i++) {
			var btn = $("<button>");
			btn.addClass("btn btn-warning");
			btn.addClass("choice");
			btn.attr("type", "button");
			btn.val(i);
			btn.html(list[index].choices[i]);
			$("#answers").append(btn);
		}
	}

	// Function determines if user guessed correct answer	
	function checkAnswer(obj) {
		
		// Determine if correct answer
		if(obj.text() === list[index].answer){
			correct++;
			result = "Correct!";
		}
		else {
			wrong++;
			result = "Incorrect!";
		}
		loadAnswer();
}

	// Function that shows the timer
	function countdownTimer() {
		countdown--;	
		$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
	}

	// Function to view end game results
	function endGame() {

		// Stop intervals
		clearInterval(showTrivia);
		clearInterval(showAnswer);
		clearInterval(timer);	
		
		// Set variables
		let unanswered = list.length - (correct + wrong);
		let stats = "<p>Correct: " + correct + "</p>" +
					"<p>Incorrect: " + wrong + "</p>" +
					"<p>Unanswered: " + unanswered + "</p>"
		;
		let btn = "<button class='btn btn-danger' type='button' id='btnRestart'>Play Again</button>"

		// Update HTML
		clearContent();
		$("#time").html("<u><h3>Final Score</h3></u>");
		$("#question").html(stats);
		$("#answers").html(btn);
	}

	// Function that resets variables for game replay
	function resetGame() {
		
		// reset varaibles
		wrong = 0;
		correct = 0;
		index = -1;
		
		// Update HTML
		clearContent();

		// Restart game
		loadQuestion();
	}

	// Function that clears the main-content id of HTML
	function clearContent() {
		$("#time").empty();
		$("#question").empty();
		$("#answers").empty();
	}
});