var quiz = document.querySelector(".quiz");
var startBtn = document.getElementById("start");
var timerElement = document.querySelector(".quiz-timer");
var savedResults = document.querySelector(".results");
var questionContainer = document.getElementById("question-container");
var answerContainer = document.getElementById("answer-container");
var quizScore = 0;
var secondsLeft = 60;
var currentQuestionIndex = 0;

// Array of questions that will be asked and the correct answers
var quizQuestions = [
    {
        question: "1. What of the following is NOT a common data type?",
        answers: {
          a: "Boolean",
          b: "Number",
          c: "Justification",
          d: "String"
        },
        correctAnswer: "c"
    },
    {
        question: "2. Arrays can be used to store:",
        answers: {
            a: "Strings and numbers",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "3. How can we define objects?",
        answers: {
            a: "Objects are reusable blocks of code that perform a specific task",
            b: "Objects are a collection of properties",
            c: "Objects iterate over arrays",
            d: "Objects replace variable names and returns new strings"
        },
        correctAnswer: "b"
    },
    {
        question: "4. Console logs:",
        answers: {
            a: "Write data directly to the console",
            b: "Are used to log into and out of a console",
            c: "Store groups of data in a single variable",
            d: "Are a primitive type of data"
        },
        correctAnswer: "a"
    },
    {
        question: "5. Arithmetic operators",
        answers: {
            a: "Combine with string, Booleans and numbers to form an expression that evaluates to true or false",
            b: "Take in two or more expressions and return true or false",
            c: "Combine with numbers to form an expression that returns a single number",
            d: "Compares equality and type (strict equality)"
        },
        correctAnswer: "c"
    },
    {
        question: "6. Comparison operators",
        answers: {
            a: "Combine with numbers to form an expression that returns a single number",
            b: "Combine with strings, booleans and numbers to form an expression that evaluates to true or false",
            c: "Take in two or more expressions and return true or false",
            d: "Are reusable blocks of code that perform a specific task"
        },
        correctAnswer: "b"
    },
    {
        question: "7. What does === mean?",
        answers: {
            a: "Compares equality and type (strict equality)",
            b: "Provides a result three times",
            c: "A way to break up code in the JavaScript to look clean",
            d: "Iterates over arrays"
        },
        correctAnswer: "a"
    },
    {
        question: "8. How do you leave single-line comments in JavaScript files?",
        answers: {
            a: "&",
            b: "**",
            c: "//",
            d: "==="
        },
        correctAnswer: "c"
    },
    {
        question: "9. What is JavaScript sometimes shortened to?",
        answers: {
            a: "Java",
            b: "JVSCRPT",
            c: "Scripty",
            d: "JS"
        },
        correctAnswer: "d"
    },
    {
        question: "10. What symbols are used to show greater than or equal to?",
        answers: {
            a: ">=",
            b: "<=",
            c: "^=",
            d: "+="
        },
        correctAnswer: "a"
    }
];

// the init function is called when the page loads
function init() {
    savedResults.textContent = "Previous score"
    getScore();
}


// Generate quiz function when start button is clicked
function generateQuiz() {
    startTimer();
    startBtn.classList.add("hide");
    displayQuestion();
    console.log("This works!")
};

// When start button is pressed, the timer begins and starts to count down
function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = " ";
            questionContainer.removeChild(questionContainer.firstElementChild);
            answerContainer.removeChild(answerContainer.firstChild);
            answerContainer.removeChild(answerContainer.firstChild);
            answerContainer.removeChild(answerContainer.firstChild);
            answerContainer.removeChild(answerContainer.firstChild);
            finishQuiz();
        }
    }, 1000);
};

function displayQuestion() {
    // Creating a paragraph element in HTML to contain question as per the current question index
    var questionEl = document.createElement("p");
    questionEl.textContent = quizQuestions[currentQuestionIndex].question;
    questionContainer.appendChild(questionEl);
    // Creating elements within a for...in to loop through answers and append them on the page as buttons
    var answerText = "";
    for (var key in quizQuestions[currentQuestionIndex].answers) {
        answerText = quizQuestions[currentQuestionIndex].answers[key];
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "answer-button");
        answerEl.textContent = answerText;
        answerEl.dataset.correct = quizQuestions[currentQuestionIndex].correctAnswer;
        answerEl.dataset.key = key;
        answerEl.dataset.pIndex = currentQuestionIndex;
        answerEl.setAttribute("data-correct", quizQuestions[currentQuestionIndex].correctAnswer);
        answerEl.setAttribute("data-key", key);
        answerEl.setAttribute("data-pIndex", currentQuestionIndex);
        answerContainer.appendChild(answerEl);
    }

    var answerBtns = document.querySelectorAll(".answer-button");
    var dataKey = document.querySelector("data-key");
    var dataCorrect = document.querySelector("data-correct");

    // Function for when buttons are clicked
    function selectAnswer(event) {
        // When button selected is correct, user is alerted that the answer is correct and their quiz score goes up by 10, then the next question appears
        if (event.target.dataset.key === event.target.dataset.correct) {
            var correctAnswerAlert = document.createElement("p");
            correctAnswerAlert.setAttribute("class", "correct-answer-alert");
            correctAnswerAlert.setAttribute("id", "correct-answer");
            correctAnswerAlert.textContent = "Correct!";
            quiz.appendChild(correctAnswerAlert);
            setTimeout(function() {
                var removeCorrectAnswerAlert = document.getElementById("correct-answer");
                removeCorrectAnswerAlert.parentNode.removeChild(removeCorrectAnswerAlert);
            }, 2000);
            quizScore += 10;
            nextQuestion();
        // When data selected is incorrect, user is alerted that the answer is incorrect, they lose 10 seconds to the total time and their quiz score goes down by 5. Then, the next question appears
        } else {
            var incorrectAnswerAlert = document.createElement("p");
            incorrectAnswerAlert.setAttribute("class", "incorrect-answer-alert");
            incorrectAnswerAlert.setAttribute("id", "incorrect-answer");
            incorrectAnswerAlert.textContent = "Incorrect!";
            quiz.appendChild(incorrectAnswerAlert);
            setTimeout(function() {
                var removeIncorrectAnswerAlert = document.getElementById("incorrect-answer");
                removeIncorrectAnswerAlert.parentNode.removeChild(removeIncorrectAnswerAlert);
            }, 2000);
            quizScore -= 5;
            console.log(quizScore);
            secondsLeft -= 10;
            nextQuestion();
        };
    };
    // Including event listeners to all answer buttons
    for (var i = 0; i < answerBtns.length; i++) {
        answerBtns[i].addEventListener("click", selectAnswer);
    }

    function nextQuestion() {
        // Go to the next question by increasing currentQuestionIndex by 1
        currentQuestionIndex++;
        // Remove previous question and answer buttons before displaying the next question and answer buttons
        questionContainer.removeChild(questionContainer.firstElementChild);
        answerContainer.removeChild(answerContainer.firstChild);
        answerContainer.removeChild(answerContainer.firstChild);
        answerContainer.removeChild(answerContainer.firstChild);
        answerContainer.removeChild(answerContainer.firstChild);
        displayQuestion();
    }

    // If user answers all questions before the timer goes down, quiz finishes
    if (currentQuestionIndex === quizQuestions.length - 1) {
        secondsLeft = 0;
    }
};

function setScore() {
    var storedScore = {
        input: input.value.trim(),
        score: quizScore
    };
    // Store each element separately in local storage
    localStorage.setItem("storedInitials", storedScore.input);
    localStorage.setItem("storedScore", storedScore.score);
}

function getScore() {        
    // Get data from storage to show user their score
    var lastInitials = localStorage.getItem("storedInitials");
    var lastScore = localStorage.getItem("storedScore")
    var scoreList = document.createElement("div");
    scoreList.setAttribute("class", "score-list");
    savedResults.appendChild(scoreList);
    var scoreListItems = document.createElement("p");
    scoreListItems.setAttribute("class", "score-list-items");
    scoreListItems.textContent = lastInitials + " " + lastScore;
    scoreList.appendChild(scoreListItems);
}

function finishQuiz() {
    // Shows user their total score
    var showScore = document.createElement("p");
    showScore.setAttribute("class", "show-score");
    showScore.textContent = "Your score: " + quizScore;
    savedResults.appendChild(showScore);

    // Provides input field for user to input their initials
    var labelInput = document.createElement("label");
    labelInput.setAttribute("for", "initials");
    labelInput.setAttribute("id", "label-input")
    labelInput.textContent = "Enter your initials to submit your score";
    savedResults.appendChild(labelInput);
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "input");
    inputEl.setAttribute("name", "input");
    savedResults.appendChild(inputEl);
    // Submit button for input field
    var submitInput = document.createElement("input");
    submitInput.setAttribute("type", "button");
    submitInput.setAttribute("value", "Submit");
    submitInput.setAttribute("id", "submit-btn");
    savedResults.appendChild(submitInput);
    var submitBtn = document.getElementById("submit-btn");
    function submitScore() {
        setScore();
        savedResults.textContent = "Score";
        getScore();
    };

    // Submit button listener when user submits their initials in the input field
    submitBtn.addEventListener("click", submitScore);
}

// Event listener for start button to generate the quiz
startBtn.addEventListener("click", generateQuiz);

// Calls init() so it initiates when the page is opened
init();

