// Handler for .ready() called
$(function() {

	let wrong = 0;
	let correct = 0;
	// unanswered will be the array size - (wrong + correct);
	let index = -1;
	let showTrivia; // variable for setInterval
	let showAnswer; // variable for new question setInterval
	let timer; // variable for setInterval timer
	let countdown;
	let guess;
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
		question: "The Kingsmen's version of \"Louie Louie\" reached number two on the Billboard Top Ten in January 1964. "+
			"What song kept it from hitting number one?",
		choices: ["Ticket to Ride (The Beatles)", "Moon River (Henry Mancini)", "Wooly Bully (Sam the Sham & the Pharaohs)", "Dominique (The Singing Nun)"],
		answer: "Dominique (The Singing Nun)",
		fact: "The surprise hit featured Sister Luc-Gabrielle singing in French about her Dominican order."
	};

	$("#btnStart").click(loadQuestion);
	$("#btnRestart").click(resetGame);

// 	function startGame() {
// console.log("start game");		
// 		// Change HTML elements
// 		// var contents = "<p>Time remaining: <span id=\"time\"></span> seconds.</p>";
// 		// $("#time").html(contents);
// 		// var contents = "<p>Time remaining: <span id=\"time\"></span> seconds.</p>" +
// 		// 	"<section id=\"question\"></section>" + 
// 		// 	"<section id=\"answers\"></section>";
// 		// $("#main-content").html(contents);
// 		loadQuestion();
// 	//	showTrivia = setInterval(loadQuestion, countdown * 1000);	
// 	}

	// Loads the current question to the DOM
	function loadQuestion() {
console.log("loadQuestion");
		index++;		
		if(index < list.length){
//console.log("index "+index+" < "+list.length+" list.length");
			// Clear values
			clearInterval(showTrivia);
			clearInterval(timer);
			$("#time").empty();
			$("#question").empty();
			$("#answers").empty();

			// Update html elements
			$("#question").html(list[index].question);
			createBtns(list[index].choices);

			// Set intervals
			countdown = 30;
			// showAnswer = setInterval(loadAnswer, countdown * 1000);
			// timer = setInterval(countdownTimer, 1000);
		}
		else {
			endGame();
		}
	}

// on click button from multiple choice
// check if correct. loadAnswer and update $("#question").html("Correct");

	// Update triva game with answer page
	function loadAnswer() {
console.log("loadAnswer");		
		// // Check if answer is correct
		// if(list[index].answer == guess){
		// 	$("#question").html("Correct!");
		// 	correct++;
		// }
		// // increment correct or incorrect variable
		// else {
		// 	$("#question").html("Wrong!");
		// 	wrong++;
		// }

		// Clear values
		clearInterval(showAnswer);
		clearInterval(timer);
		$("#time").empty();
		$("#question").empty();
		$("#answers").empty();

		//Update html elements
		
		$("#answers").html(list[index].answer + " - " + list[index].fact);

		// Set intervals
		countdown = 5;
		// timer = setInterval(countdownTimer, 1000);
		// showTrivia = setInterval(loadQuestion, countdown * 1000);
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
	function checkAnswer() {
console.log("checkAnswer() ");
console.log("button value: "+$(this).text()+" === "+list[index].answer);
		var result;
		// Determine if correct answer
		if($(this).text() === list[index].answer){
			correct++;
			result = "<h2>Correct!</h2>";
		}
		else {
			wrong++;
			result = "<h2>Incorrect!</h2>";
		}
		// Update HTML
		$("#question").html(result);
		// Load the answer page
		loadAnswer();
}

	// use event delegation for dynamic buttons
	$("#answers").on("click", checkAnswer);
	$("#answers").on("click", "button", checkAnswer);

	// Starts the timer for each question based on the time argument input
	function countdownTimer() {
//console.log("countdownTimer");	
		countdown--;	
		$("#time").html("<h2>Time remaining: " + countdown + "</h2>");
		
	}

	// Goes to end game results
	function endGame() {
console.log("endGame");		
		$("#main-content").empty();

	}

	// resets variables to re-play the game
	function resetGame() {
console.log("resetGame");		
		// reset varaibles
		wrong = 0;
		correct = 0;
		index = -1;
		// update html
		$("#main-content").empty();
		startGame();

	}

});