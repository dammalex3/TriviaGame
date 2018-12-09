var questions = [
    "Where was Bob Dylan born?",
    "What is Bob Dylan's real name?",
    "Which album had the earliest release date?",
    "Which of these songs is NOT a Bob Dylan song?",
    "The song 'Blowin' In The Wind' is on which album?"
];

var answerOptions = [
    ["Duluth, MN", "London, GB", "New York, NY", "Detroit, MI"],
    ["David Thompson", "Steve Bax", "Robert Zimmerman", "Michael Dylanoski"],
    ["Highway 61 Revisted", "The Freewheelin' Bob Dylan", "Blood on the Tracks", "Bringing It All Back Home"],
    ["Like a Rolling Stone", "Mr. Tambourine Man", "Thunder Road", "Tangled Up in Blue"],
    ["Desire", "Bringing It All Back Home", "The Freewheelin' Bob Dylan", "Blowing in the Wind"]
];

var correctAnswers = [
    "Duluth, MN", 
    "Robert Zimmerman",
    "The Freewheelin' Bob Dylan",
    "Thunder Road",
    "The Freewheelin' Bob Dylan"
];

//global variables
var count = 0;
var answeredCorrectly = 0;
var answeredWrong = 0;
var questionTimeout;
var resultTimeout;
var timeToAnswer = 5;

function timer() {
    $("#timer-display").text("Time Remaining: " + timeToAnswer);
    timeToAnswer--;
}

//function to display the question and answers
function displayQuestion() {

    //clear the results of the last question
    $("#question-result").empty();

    //clear the answers array
    $("#answers").empty();

    //set the interval to call the countdown timer function every second
    timeToAnswer = 10;
    timer();
    intervalId = setInterval(timer, 1000);

    $("#question-display").text(questions[count]);

    for (var i=0; i < answerOptions[count].length; i++) {
        var answer = $("<div>");
        answer.addClass("answer");
        answer.text(answerOptions[count][i]);
        $("#answers").append(answer);
    }

    //call a function called timesUp which calls nextQuestion
    questionTimeout = setTimeout(timesUp, 10000);

    //on click function for when an answer is clicked
    $(".answer").on("click", function() {

        //store the answer in a variable and call the checkAnswer function to see if it is right
        var selectedAnswer = ($(this).text());
        checkAnswer(selectedAnswer);

    })
}

function timesUp() {
    clearTimeout(questionTimeout);
    clearInterval(intervalId);
    checkAnswer();
}

function nextQuestion() {

    clearTimeout(questionTimeout);
    clearInterval(intervalId);

    //increase count which is used to access the question, answer options, and answer
    count++;

    //stop the game when all of the questions have been displayed
    if (count === questions.length) {
        console.log("stopping the game");
        stopGame();
        
    }

    else {
        //call displayQuestion to display the next question
        displayQuestion();
    }
}

//function to check if the answer is correct
function checkAnswer(selectedAnswer) {
    clearTimeout(questionTimeout);
    clearInterval(intervalId);

    if (selectedAnswer === correctAnswers[count]) {
        answeredCorrectly++;
        answerAction("Correct");

    }
    else {
        answeredWrong++;
        answerAction("Wrong");
    }
}

function answerAction (string) {
    var answerResult = string;
    $("#answers").empty();
    $("#timer-display").empty();
    $("#question-display").empty();
    $("#question-result").text(answerResult);
    var answerIs = $("<p>");
    answerIs.text("The answer is: " + correctAnswers[count]);
    $("#question-result").append(answerIs);

    resultTimeout = setTimeout(nextQuestion, 2000);

    if (count === questions.length) {
        console.log("stopping the game");
        stopGame();
    }
}

//function to run when all questions have been displayed
function stopGame() {
    displayResults();
    $("#question-display").empty();
    $("#answers").empty();
    $("#timer-display").empty();
    $("#question-result").empty();
    $("#start-button").show();
}

function displayResults() {
    $("#final-results-display").append("<div> Correct Answers: " + answeredCorrectly + "</div>");
    $("#final-results-display").append("<div> Wrong Answers: " + answeredWrong + "</div>");
}

//on click event to start the game
$("#start-button").on("click", function() {
    count = 0;
    answeredCorrectly= 0;
    answeredWrong = 0;
    $("#start-button").hide();
    $("#final-results-display").empty();
    $(".container").css('background-image','none');
    displayQuestion();
})
