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
        console.log (data)
    }
    )
}

fetchQuestions ()