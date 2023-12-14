var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "string", correct: false},
            { text: "boolean", correct: true},
            { text: "alerts", correct: false},
            { text: "numbers", correct: false},
        ]
    }, 
    {
        question: "Which symbol represents the modulus?",
        answers: [
            { text: "!", correct: false},
            { text: ">=", correct: false},
            { text: "*", correct: false},
            { text: "%", correct: true},
        ]
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        answers: [
            { text: "slice()", correct: false},
            { text: "remove()", correct: false},
            { text: "pop()", correct: true},
            { text: "delete()", correct: false},
        ]
    },
    {
        question: "Which symbol is used for commenting out single-lines in JavaScript?",
        answers: [
            { text: "//", correct: true},
            { text: "...", correct: false},
            { text: "&&", correct: false},
            { text: "||", correct: false},
        ]
    }
];

var questionEl = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var startButton = document.getElementById("start-button");
var quizBody = document.getElementById("quiz-body");
var submitButton = document.getElementById("submit");
var textArea = document.getElementById("msg");
var personalScore = document.getElementById("personal-score")

let currentQuestionIndex = 0;
let score = 0; 

startButton.addEventListener("click", startQuiz)

function startQuiz() {
    startButton.style.display = "none";
    quizBody.style.display = "block"
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
    setTime();
    loadScore();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    console.log(questions[currentQuestionIndex]);
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        secondsLeft++;
    } else {
        selectedBtn.classList.add("incorrect");
        secondsLeft-=5;
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}



function showScore() {
    resetState();
    questionEl.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.style.display = "none";
    textArea.style.display = "block";
    submitButton.style.display = "block";
}

submitButton.addEventListener("click", storeScore)
function storeScore() {
    timeEl.textContent = " ";
    var scoreInfo = {
        score: score,
        initial: textArea.value,
    }
    if(!textArea.value) {
        alert("Please Type Initials")
    } else {
        localStorage.setItem("scoreData" , JSON.stringify(scoreInfo));
        location.reload(); 
    }
}


personalScore.addEventListener("load", loadScore)

function loadScore() {
    if(localStorage !== null){
        var data = JSON.parse(localStorage.getItem("scoreData"))
        var initial = data["initial"]
        var savedScore = data["score"]
        personalScore.textContent = "Latest score is " + savedScore + " by " + initial;
        console.log(data);
    }

}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        location.reload()
    }
});

// all code below was taken from classwork

var timeEl = document.querySelector(".time");

var mainEl = document.getElementById("time-countdown");

var secondsLeft = 30;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    ;

    if(secondsLeft >= 0) {
      timeEl.textContent = secondsLeft + " seconds left until the quiz is over."
    } else {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
}; 

