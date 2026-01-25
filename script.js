//DOM elements
const startScreen = document.getElementById("start-scrn");
const quizScreen = document.getElementById("quiz-scrn");
const resultScreen = document.getElementById("result-scrn");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("Q-text");
const answersContainer = document.getElementById("ans-container");
const currentQuestionSpan = document.getElementById("curr-question");
const totalQuestionsSpan = document.getElementById("tot-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("maximum-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("prog");

const quizQuestions=[
    {
        question: "What was the Capital of India?",
        answers: [
            {text: "Mumbai",correct:false},
            {text: "Kolkata",correct:false},
            {text: "Delhi",correct:true},
            {text: "Jharkhand",correct:false},
        ],
    },
    {
        question: "What Country Borders India?",
        answers: [
            {text: "Lithunia",correct:false},
            {text: "Albania",correct:false},
            {text: "Honduras",correct:false},
            {text: "Nepal",correct:true},
        ],
    },
    {
        question: "Which Country is Nearest to India Amongst Below?",
        answers: [
            {text: "Thailand",correct:false},
            {text: "Singapore",correct:false},
            {text: "Oman",correct:true},
            {text: "Russia",correct:false},
        ],
    },
    {
        question: "Which among these is not African Country?",
        answers: [
            {text: "Algeria",correct:false},
            {text: "Libya",correct:false},
            {text: "Albania",correct:true},
            {text: "Tanzania",correct:false},
        ],
    },
    {
        question: "Which is country is Landlocked in South America?",
        answers: [
            {text: "Peru",correct:false},
            {text: "Venezuela",correct:false},
            {text: "Colombia",correct:false},
            {text: "Bolivia",correct:true},
        ],
    }
];

let currQuestionInd=0;
let score=0;
let answersDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener("click",startQuiz)
restartButton.addEventListener("click",restartQuiz)

function startQuiz() {
    console.log("Quiz started");
    currQuestionInd=0;
    score=0;
    scoreSpan.textContent=score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    answersDisabled=false;
    const currentQuestion=quizQuestions[currQuestionInd]

    currentQuestionSpan.textContent=currQuestionInd+1

    const progressPercent=(currQuestionInd/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";

    questionText.textContent=currentQuestion.question;

    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer=> {
        const button=document.createElement("button")
        button.textContent=answer.text
        button.classList.add("answer-btn")

        button.dataset.value=answer.correct

        button.addEventListener("click",selectAnswer)

        answersContainer.appendChild(button);
    })
}

function selectAnswer(event) {
    if(answersDisabled) return;
    answersDisabled=true;
    const selectButton=event.target;
    const isCorrect=selectButton.dataset.value==="true"

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.value==="true") {
            button.classList.add("correct");
        } else if(button==selectButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent=score;
    }

    setTimeout(()=> {
        currQuestionInd++;
        if(currQuestionInd<quizQuestions.length) {
            showQuestion();
        } else showResults();
    },1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent=score;

    const percentage=(score/quizQuestions.length)*100;
    if(percentage===100) {
        resultMessage.textContent="Abosolutely Perfect!";
    } else if(percentage>=80) {
        resultMessage.textContent="Good Job!";
    } else if(percentage>=60) {
        resultMessage.textContent="Nice try! keep studying";
    } else if(percentage>=40) {
        resultMessage.textContent="Ok, But have to do better than that";
    } else {
        resultMessage.textContent="keep learning!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}