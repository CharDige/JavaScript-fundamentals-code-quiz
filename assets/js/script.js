var quiz = document.querySelector(".quiz");
var startBtn = document.getElementById("start");
var timerElement = document.querySelector(".quiz-timer");
var savedResults = document.querySelector(".results");
var quizQuestions = document.getElementById("quiz-questions")

var quizScore = 0;
var secondsLeft = 60;

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
    console.log("This works!")
}

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
}



startBtn.addEventListener("click", generateQuiz);