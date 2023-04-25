const questions = [
    {
        question: "What does HTML stand for?",
        answers:
        [
            { text: "Hypertext Marked Language",correct: false},
            { text: "Hypertext Marking Language",correct: false},
            { text: "Hypertext Markup Language",correct: true},
            { text: "Hypertext Making Language",correct: false},
        ]
    },
    {
        question: "Who is making the Web standards?",
        answers:
        [
            { text: "Mozilla",correct: false},
            { text: "The World Wide Web Consortium",correct: true},
            { text: "Google",correct: false},
            { text: "Microsoft",correct: false},
        ]   
    },
    {
        question: "Choose the correct HTML Tag for the largest heading:",
        answers:
        [
            { text: "head",correct: false},
            { text: "Heading",correct: false},
            { text: "h2",correct: false},
            { text: "h1",correct: true},
        ]   
    },
    {
        question: "What is the correct HTML Tag for inserting a line break?",
        answers:
        [
            { text: "br ",correct: true},
            { text: "break ",correct: false},
            { text: "lb ",correct: false},
            { text: "linebreak",correct: false},
        ]    
    },
    {
        question: "Choose the correct HTML Tag to define emphasized text",
        answers:
        [
            { text: "em",correct: true},
            { text: "i",correct: false},
            { text: "emphasized",correct: false},
            { text: "emp",correct: false},
        ]    
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block"; 
}

function showScore(){
    resetstate();
    questionElement.innerHTML = `Your score is ${score} / ${questions.length}  !!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();