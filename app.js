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
    optionsElement.classList.add = ("options-container")
    options.forEach(function (option,index){
        const optionElement = document.createElement ("button")
        optionElement.textContent = index + 1 + ". " + option 
        optionElement.id = index
        optionsElement.appendChild(optionElement)
    }
        )
        questionContainer.appendChild(questionEl) 
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