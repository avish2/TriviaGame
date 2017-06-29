// $.fn.game = function () {
	var wrong = new Audio("audio/dbbs.wav");
	var right = new Audio("audio/right.wav");
	var linger = new Audio("audio/linger.mp3");
	var userAnswers = {
			correct: 0, 
			incorrect: 0
	};							//number of correct or incorrect answers
	var quizOver = false;
	var question; 			// chosen question string
	var questionNum;       // array index of chosen question
	var number = 20;
	var t = this // allow to pull in variables

	var questions = [{
		question: "In the Pilot episode, after Walt crashes the RV in the desert believing the Police are chasing him, he leaves his wallet and what other item on the ground to be given to his family?",
		choices: ["Wedding ring", "Camcorder", "Bag of money", "Cell phone"],
		correct: '1'
	}, {
		question: "After if turns out to be fire engines and not police, Walt and Jesse leave the desert taking the RV with them, but they fail to clean up their crime scene properly, what item did they leave behind which the DEA later find?",
		choices: ["Gasmask", "Walt's Clothes", "Equipment marked J.P. Wynne High", "Camcorder"],
		correct: '0'
	}, {
		question: "In episode 2, Walt and Jesse have captured Krazy-8 and locked him up in the basement of Jesse's house, but how did they restrain him?",
		choices: ["Rope", "Cable / Zip ties", "Bicycle lock", "Chains"],
		correct: '2'
	}, {
		question: "In episode 2, 'Cat's In The Bag...', what item falls through the floor of Jesse's home?",
		choices: ["Bathtub", "Walt", "Water heater", "Part of the roof"],
		correct: '0'
	}, {
		question: "In episode 3, Walt makes Krazy-8 a sandwich, while delivering it he collapses on the basement floor breaking the plate, but what color was the plate?",
		choices: ["Green", "White", "Yellow", "Blue"],
		correct: '2'
	}, {
		question: "Who is the first person in which Walt shares the secret that he has cancer?",
		choices: ["Jesse", "Skyler", "Krazy-8", "Hank"],
		correct: '2'
	}, {
		question: "While Walt and Krazy-8 talk in the basement, it turns out that Walt knew Krazy-8's father because of a store he used to run. What type of store was it?",
		choices: ["Furniture", "Hardware", "Grocery", "Sports"],
		correct: '0'
	}, {
		question: "Where does Walter hide his money in his home?",
		choices: ["Cereal box", "Clothes hamper", "Broken washing machine", "Heating duct"],
		correct: '3'
	}, {
		question: "In episode 4, a rude and obnoxious guy steals a parking space from Walt, later Walt places a wet sponge on the guys car battery causing the car to explode. What was the license plate on the guys car?",
		choices: ["Mo Money", "Ken Wins", "Scrw U", "Dream On"],
		correct: '1'
	}, {
		question: "In episode 4, Jesse returns home to see his family and while going through his old things, he finds a chemistry exam Walt had graded and given an F, what had Walt written at the bottom?",
		choices: ["Stupid, Try next time", "Pay attention in class", "You're better than this", "Ridiculous! Apply yourself"],
		correct: '3'
	}, {
		question: "In episode 5, who was Walt's old business partner who offered to pay the cost of Walt's treatment?",
		choices: ["Elliott Schwartz", "Ernesto Ramierez", "Vince Gilligan", "Betsy Brandt"],
		correct: '0'
	}, {
		question: "When Walt attended the birthday party for his former business partner, what gift did he give him?",
		choices: ["Guitar", "Restaurant voucher", "Ramen noodles", "Potato chips"],
		correct: '2'
	}, {
		question: "After the demise of Krazy 8, who became the new 'distributor' in town ?",
		choices: ["Trance", "Tuco", "Tracer", "Tutti"],
		correct: '1'
	}];

	// function pickQuestion (questions) {
		var questionNum = Math.floor(Math.random()*questions.length);
		var question = questions[questionNum].question;
		var correctIndx = questions[questionNum].correct
		console.log(question);
		console.log(questionNum);
		console.log(questions[questionNum].choices);
		console.log(userAnswers);
		console.log(questions[questionNum].correct);
		// displayQuestion();
	// }
	function timesUp () {
		$("#textbox").replaceWith("<h2>Sorry, time's up.</h2>");
		linger.play();  //plays audio when time's up
	}
	function timer() {
		timerNum = setInterval(countdown, 1000);
	}
	function countdown() {
		number--;
		// $("#timer").html("<h3> Time Remaining: " + number + "</h3>");
		if (number === 0) {
			stop();
		}
	}
	function stop() {
		clearInterval(timerNum);
	}

	function displayQuestion () {
		if ((userAnswers.correct + userAnswers.incorrect) <= 10) {
			$("#timer").html("<h3> Time Remaining: " + number + "</h3>");
			// clearTimeout();
			// var number = 21;

			$("#question").append("<h4>" + question + "</h4>");
			var choicesArr = questions[questionNum].choices;
			// var buttonsArr = [];

			for (var i = 0; i < choicesArr.length; i++) {
				$("#answer").append("<div class='button' data-attr=" + i + ">" + choicesArr[i] + "</div><br>");
			}
			setTimeout(timesUp, 1000 * 20);
			timer();
		} else {
			quizOver = true;
			// $("#textbox").append($("<div>", {
			// 	text: "correct: " + t.userAnswers.correct ;
			// 	text: "incorrect: " + t.userAnswers.incorrect ;
			// 	class: "result"
			// }, "</div>"));

			$("#start").text("Restart").appendTo("body").show();
		}
	};

	$(document).on("click", ".button", function() {
		console.log(correctIndx);
		var i = $(this).attr("data-attr");
		console.log(i);
		// var right = questions[questionNum].correct;
		if (i == correctIndx) {
			userAnswers.correct++;
			rightAnswer(questionNum);
		} else {
			userAnswers.incorrect++;
			wrongAnswer(questionNum);
			// alert("WRONG");
			//displayQuestion(questions);
		}
	});

	function wrongAnswer() {
		var choicesArr = questions[questionNum].choices;
		var right = questions[questionNum].correct;
		$("#textbox").replaceWith('<h2>Wrong Answer</h2><br><h4>The correct answer was "' + choicesArr[right] + '"</h4>');
		wrong.play();
		setTimeout(displayQuestion(),3000);
	}

	function rightAnswer() {
		$("#textbox").replaceWith("<h2>Correct!<h2>");
		right.play();	
	}

	$("#start").click(function() {
		$(this).hide();
		$(".result").remove();
		$(".space").html("");
		// pickQuestion(questions);
		displayQuestion(questions);
	});
// }