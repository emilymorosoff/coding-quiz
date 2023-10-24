const questionContainer = document.querySelector(".question-container")
const timeContainer = document.querySelector(".time-container")
const timerEl = document.querySelector(".time")

let questions = []
let currentQuestionIndex = 0
let remainingTime = 60 
let totalScore = 0
let timerId 
let isAnswered = false

function fetchQuestions (){
    fetch ("./data.json")
    .then (function (res) {
       return res.json()
    }
    ) 
    .then (function (data) {
        questions = shuffleArray (data.questions).slice(0, 10)
        renderQuestion()
        timerEl.textContent = remainingTime
        countDown ()
    }
    )
}

fetchQuestions ()
function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex]
    const {question, options} = currentQuestion
    const questionEl = document.createElement("div")
    questionEl.classList.add ("question-element")
    const questionNumberElement = document.createElement("h2")
    questionNumberElement.textContent = "Question: " + (currentQuestionIndex+1)
    const questionTextElement = document.createElement ("p")
    questionTextElement.textContent = question
    questionEl.appendChild (questionNumberElement)
    questionEl.appendChild (questionTextElement)
    const optionsElement = document.createElement("div")
    optionsElement.classList.add ("options-container")
    const optionLetters = ["A", "B", "C", "D"]
    options.forEach(function (option,index){
        const optionElement = document.createElement ("button")
        optionElement.textContent = optionLetters[index] + ". " + option 
        optionElement.id = index
        optionElement.addEventListener("click", checkAnswer)
        optionsElement.appendChild(optionElement)
    }
        )
        questionContainer.appendChild(questionEl) 
        questionContainer.appendChild(optionsElement)
        const nextButton = document.createElement("button")
        nextButton.textContent = "next"
        nextButton.classList.add("next-button")
        questionContainer.appendChild(nextButton)
}

function checkAnswer(event) {
    isAnswered = true
    const id = Number(event.target.getAttribute("id"))
    event.target.style.backgroundColor = "#6142a3"
    event.target.parentElement.replaceWith(event.target.parentElement.cloneNode(true))
    if (id === questions[currentQuestionIndex].correctAnswer) {
        totalScore ++
    }
    else { 
        countDown("sub")
    }
}

function countDown(sub) {
    if (sub && remainingTime - 5 >= 0) {
        remainingTime = remainingTime - 5
    }
    else {
        clearInterval (timerId)
    }
    if (remainingTime > 0) {
        timerId = setInterval(function(){
            remainingTime = remainingTime - 1
            timerEl.textContent = remainingTime
            if (remainingTime <= 0) {
                clearInterval (timerId)
            }
        }, 1000)
    }
}
/* function shuffleArray(arr) {
for (let i = arr.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}
*/

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
    }