const questionContainer = document.querySelector(".question-container");
const timeContainer = document.querySelector(".time-container");
const timerEl = document.querySelector(".time");
const startButton = document.querySelector(".start-button");
const highScoresEl = document.querySelector(".high-scores");
const highScoresButton = document.querySelector(".high-scores-button");

const startingSound = document.querySelector(".start-sound")
const correctAnswerSound = document.querySelector("#correctAnswerSound")
const incorrectAnswerSound = document.querySelector("#incorrectAnswerSound")
const clickSound = document.querySelector("#clickSound")

let questions = [];
let currentQuestionIndex = 0;
let remainingTime = 60;
let totalScore = 0;
let timerId;
let isAnswered = false;
let timerId2 
let highScores = JSON.parse(localStorage.getItem("scores")) || []
startButton.addEventListener("click", start)
function start() {
    startingSound.play()
if (startButton) {
    startButton.parentElement.remove()
}
highScoresButton.addEventListener("click", displayHighScores);
function fetchQuestions() {
fetch("./data.json")
.then((res) => res.json())
.then((data) => {
questions = shuffleArray(data.questions).slice(0, 10);
renderQuestion();
timerEl.textContent = remainingTime;
countDown();
});
}
fetchQuestions();

function renderQuestion() {
questionContainer.innerHTML = "";
questionContainer.appendChild(highScoresEl);
questionContainer.appendChild(timeContainer);
let currentQuestion = questions[currentQuestionIndex];
const { question, options } = currentQuestion;
const questionElement = document.createElement("div");

questionElement.classList.add("question-element");
const questionNumberElement = document.createElement("h2");
questionNumberElement.textContent = "Question: " + (currentQuestionIndex + 1);
const questionTextElement = document.createElement("p");
questionTextElement.textContent = question;
questionElement.appendChild(questionNumberElement);
questionElement.appendChild(questionTextElement);
const optionsElement = document.createElement("div");
optionsElement.classList.add("options-container");

options.forEach((option, index) => {
const optionElement = document.createElement("button");
optionElement.textContent = index + 1 + ". " + option;
optionElement.id

= index;
optionElement.addEventListener("click", checkAnswer);
optionsElement.appendChild(optionElement);
});
const nextButton = document.createElement("button");
nextButton.textContent = "next";
nextButton.classList.add("next-button");
nextButton.addEventListener("click", nextQuestion);
questionContainer.appendChild(questionElement);
questionContainer.appendChild(optionsElement);
if (currentQuestionIndex <= 8) {
questionContainer.appendChild(nextButton);
}
}

function checkAnswer(event) {
isAnswered = true;
const id = Number(event.target.getAttribute("id"));
const correctAnswerIcon = document.createElement("i")
correctAnswerIcon.classList.add("fa-check")
correctAnswerIcon.classList.add("fa-solid")
const incorrectAnswerIcon = document.createElement("i")
incorrectAnswerIcon.classList.add("fa-solid")
incorrectAnswerIcon.classList.add("fa-xmark")
if (id === questions[currentQuestionIndex].correctAnswer) {
    event.target.appendChild(correctAnswerIcon)
correctAnswerSound.play()
totalScore++;
} else {
    event.target.appendChild(incorrectAnswerIcon)
    incorrectAnswerSound.play()
countDown("sub");
}

event.target.style.backgroundColor = "#6142a3";
event.target.parentElement.replaceWith(
event.target.parentElement.cloneNode(true)
);
if (currentQuestionIndex >= 9) {
gameOver();
}
}

function nextQuestion(event) {
if (isAnswered) {
isAnswered = false;
if (remainingTime > 0) {
currentQuestionIndex++;
renderQuestion();
}
}
}

function countDown(sub) {
clearInterval(timerId);

if (sub && remainingTime - 5 >= 0) {
remainingTime = remainingTime - 5;
}

if (remainingTime > 0) {
timerId = setInterval(() => {
remainingTime = remainingTime - 1;
timerEl.textContent = remainingTime;

if (remainingTime <= 0) {
gameOver();
}
}, 1000);
} else {
gameOver();
}
}

function gameOver() {
setTimeout(() => {
const nextButton = document.querySelector(".next-button");
if (nextButton) {
    nextButton.remove()
}

const resetButton = document.createElement("button");
resetButton.addEventListener("click", reset);
resetButton.classList.add("reset-button");
resetButton.textContent = "reset"
questionContainer.prepend(resetButton);
const currentQuestionElement = document.querySelector(".options-container");
currentQuestionElement.replaceWith(currentQuestionElement.cloneNode(true));
clearInterval(timerId);

const scoreInfoElement = document.createElement("p");
scoreInfoElement.textContent = "your score is: " + totalScore;
scoreInfoElement.classList.add("score-info");
questionContainer.appendChild(scoreInfoElement);
const openFormButton = document.createElement("button");
openFormButton.classList.add("open-form-button");
openFormButton.textContent = "save my score";
openFormButton.addEventListener("click", openForm);
questionContainer.appendChild(openFormButton);
}, 300);
}

function shuffleArray(arr) {
for (let i = arr.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}

function displayHighScores(e) {
    const parentContainer = e.target.parentElement
    const scoresContainer = document.createElement("ul");
    const closeButton = document.createElement("button");
    closeButton.textContent = "close"
    closeButton.addEventListener("click", function(e){
        e.target.parentElement.remove();
    })
    scoresContainer.classList.add("scores-container");
    scoresContainer.appendChild(closeButton);
    highScores.forEach(function(highScore) {
        const scoreElement = document.createElement("li");
        const scoreFirstName = highScore.firstName; 
        const scoreLastName = highScore.lastName;
        const scoreValue = highScore.score;
        scoreElement.textContent = scoreFirstName + " " + scoreLastName + " " + scoreValue;
        scoresContainer.appendChild(scoreElement);
    })

    parentContainer.appendChild(scoresContainer);

}
function openForm() {
    clickSound.play()
    const saveScoreContainer = document.querySelector(".save-score-overlay");
    const saveScoreForm = saveScoreContainer.querySelector("form");
    const closeFormButton = saveScoreContainer.querySelector(".close-form");
    closeFormButton.addEventListener("click", function(e) {
        clickSound.play()
        e.target.parentElement.parentElement.classList.remove("overlay-active")
    })
    saveScoreContainer.classList.add("overlay-active");
    saveScoreContainer.querySelector(".score").textContent = totalScore;
    saveScoreForm.addEventListener("submit",function(e) {
        e.preventDefault()
        clickSound.play()
        const firstNameInput = saveScoreForm.querySelector("input[name='lastName']");
        const lastNameInput = saveScoreContainer.querySelector("input[name='lastName']");
        if (firstNameInput.value && lastNameInput.value) {
            highScores.push( {
                firstName: firstNameInput.value, 
                lastName: lastNameInput.value,
                score: totalScore,
            })
            localStorage.setItem("scores", JSON.stringify(highScores));
            setTimeout(() => {
                saveScoreContainer.classList.remove("overlay-active");
            }, 300);
        }
    })
}
}

function reset() {
    clickSound.play()
    questions = [];
    currentQuestionIndex = 0;
    remainingTime = 60;
    totalScore = 0;
    setTimeout(start, 1000);
}