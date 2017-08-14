// Handler for .ready() called
$(function() {
	const TRIVIA_TIME = 30;
	const ANSWER_TIME = 7;
	let wrong = 0;
	let correct = 0;
	// unanswered will be the array size - (wrong + correct);
	let index = -1;
	let showTrivia; // variable for setInterval
	let showAnswer; // variable for new question setInterval
	let timer; // variable for setInterval timer
	let countdown;
	let guess;
	let result = false;
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

	$("#btnStart").click(loadQuestion);
	$("#btnRestart").click(resetGame);

	// Loads the current question to the DOM
	function loadQuestion() {
console.log("loadQuestion");

		index++;	
		countdown = TRIVIA_TIME;	

		if(index < list.length){
			// Clear values
			clearInterval(showTrivia);
			clearInterval(timer);
			clearContent();

			// Update html elements
			$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
			$("#question").html("<h3>" + list[index].question + "</h3>");
			createBtns(list[index].choices);

			// Set intervals
			showAnswer = setInterval(loadAnswer, countdown * 1000);
			timer = setInterval(countdownTimer, 1000);
		}
		else {
			endGame();
		}
	}

	// Update triva game with answer page
	function loadAnswer() {
console.log("loadAnswer");		
		
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
		$("#question").html("<h3>" + result + "</h3>");
		$("#answers").html("<b>" + list[index].answer + "</b> - " + list[index].fact);

		// reset result in case user time's out
		result = false;

		// Set intervals
		timer = setInterval(countdownTimer, 1000);
		showTrivia = setInterval(loadQuestion, countdown * 1000);
	}

	// Creates and returns the buttons for multiple choice
	function createBtns(arr) {
		// creat list for button.
console.log("createBtns");		
		for(var i = 0; i < arr.length; i++) {
			var btn = $("<button>");
			btn.addClass("btn button-default");
			btn.addClass("choice");
			btn.attr("type", "button");
			btn.val(i);
			btn.html(list[index].choices[i]);
			$("#answers").append(btn);
		}
	}

	// Sets the result variable based on user guess	
	function checkAnswer() {
console.log("checkAnswer() ");
console.log("button text: "+$(this).text()+" === "+list[index].answer);
		
		// Determine if correct answer
		if($(this).text() === list[index].answer){
			correct++;
			result = "Correct!";
		}
		else {
			wrong++;
			result = "Incorrect!";
		}

		// Load the answer page
		loadAnswer();
}

	// use event delegation for dynamic buttons
//	$("#answers").on("click", checkAnswer);
	$("#answers").on("click", "button", checkAnswer);

	// Starts the timer for each question based on the time argument input
	function countdownTimer() {
		countdown--;	
		$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
	}

	// Goes to end game results
	function endGame() {
console.log("endGame");	
		clearInterval(showAnswer);
		clearInterval(timer);	
		clearContent();

		let unanswered = list.length - (correct + wrong);
		// update html with game stats
		let stats = "<p>Correct: " + correct + "</p>" +
					"<p>Incorrect: " + wrong + "</p>" +
					"<p>Unanswered: " + unanswered + "</p>"
		;
		let btn = "<button type='button' id='btnRestart'>Play Again</button>"
		$("#time").html("<u><h3>Final Score</h3></u>");
		$("#question").html(stats);
		$("#answers").html(btn);
		// Play again button
	}

	// Resets variables to re-play the game
	function resetGame() {
console.log("resetGame");		
		// reset varaibles
		wrong = 0;
		correct = 0;
		index = -1;
		// update html
		clearContent();

		// start game
		loadQuestion();
	}

	// Clears the content inside the main-content id
	function clearContent() {
		$("#time").empty();
		$("#question").empty();
		$("#answers").empty();
	}
});