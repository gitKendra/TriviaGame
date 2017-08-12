// Handler for .ready() called
$(function() {

	let wrong = 0;
	let correct = 0;
	// unanswered will be the array size - (wrong + correct);
	let index = 0;
	let showTrivia; // variable for setInterval
	let showAnswer; // variable for timer


	// // Array to store trivia objects
	// let list = [];

	// // Objects
	// list[0] = {
	// 	question: "Will this work?",
	// 	answers: ["yes", "no"],
	// 	answer: "no",
	// };
	var trivia = {
		"q1": {
			question: ,
			answers: ,
			answer: ,
		},
		"q2": {
			question: ,
			answers: ,
			answer: ,			
		}
	}

	$("#btnStart").click(startGame);

	function startGame() {
		// Change HTML elements
		var contents = "<h2>Time remaining: <span id=\"time\"></span>" +
			"<section id=\"question\"></section>" + 
			"<section id=\"answers\"></section>";
		$("#main-content").html(contents);
		loadQuestion();
		showTrivia = setInterval(loadQuestion, 30 * 1000);		
	}

	// Loads the current question to the DOM
	function loadQuestion() {
		//TODO: load question to html
		$("#question").html(list[index].question);
		//TODO: Create and load answer buttons to html
		var multipleChoice = createBtns(list[index].answers);
		

		index++;
	}

	// Creates and returns the buttons for multiple choice
	function createBtns(arr) {
		for(var i = 0; i < arr.length; i++) {

		}
	}
});