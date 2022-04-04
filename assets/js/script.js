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
    }
];



// Testing start button functionality
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
    var questionEl = document.createElement("p");
    questionEl.textContent = quizQuestions[currentQuestionIndex].question;
    questionContainer.appendChild(questionEl);
    var answerText = "";
    for (var key in quizQuestions[currentQuestionIndex].answers) {
        answerText = quizQuestions[currentQuestionIndex].answers[key];
        var answerEl = document.createElement("li");
        answerEl.textContent = answerText;
        answerContainer.appendChild(answerEl);
    }
};


function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}


startBtn.addEventListener("click", generateQuiz);