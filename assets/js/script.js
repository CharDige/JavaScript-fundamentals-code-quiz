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
        question: "What of the following is NOT a common data type?",
        answers: {
          a: "Boolean",
          b: "Number",
          c: "Justification",
          d: "String"  ,
        },
        correctAnswer: "c"
    },
    {
        question: "Arrays can be used to store:",
        answers: {
            a: "Strings and numbers",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "How can we define objects?",
        answers: {
            a: "Objects are reusable blocks of code that perform a specific task",
            b: "Objects are a collection of properties",
            c: "Objects iterate over arrays",
            d: "Objects replace variable names and returns new strings"
        },
    }
];

console.log(quizScore);

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

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            console.log("Times up")
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
    function selectAnswer(event) {
        // When data selected is correct, console logs that it's correct
        if (event.target.dataset.key === event.target.dataset.correct) {
            var correctAnswerAlert = document.createElement("p");
            correctAnswerAlert.setAttribute("class", "correct-answer-alert");
            correctAnswerAlert.textContent = "Correct!";
            answerContainer.appendChild(correctAnswerAlert);
            quizScore += 10;
            console.log(quizScore);
            nextQuestion();
        // When data selected is incorrect, sonsole logs that it's not correct    
        } else {
            var incorrectAnswerAlert = document.createElement("p");
            incorrectAnswerAlert.setAttribute("class", "incorrect-answer-alert");
            incorrectAnswerAlert.textContent = "Incorrect!";
            answerContainer.appendChild(incorrectAnswerAlert);
            quizScore -= 5;
            console.log(quizScore);
            secondsLeft -= 10;
            nextQuestion();
        };
    };
    // Button answers
    for (var i = 0; i < answerBtns.length; i++) {
        answerBtns[i].addEventListener("click", selectAnswer);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        questionContainer.removeChild(questionContainer.firstElementChild);
        answerContainer.removeChild(answerContainer.firstChild);
        answerContainer.removeChild(answerContainer.firstChild);
        answerContainer.removeChild(answerContainer.firstChild);
        answerContainer.removeChild(answerContainer.firstChild);
        displayQuestion();
    }
};




startBtn.addEventListener("click", generateQuiz);