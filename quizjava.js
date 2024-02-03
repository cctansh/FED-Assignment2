const questions = [
    {
        question:  "What is the name of this product?",
        image: "img/cardigan.png",
        answers: [
            { text: "Knitted short jacket", correct: true},
            { text: "Rib-knit cardigan", correct: false},
            { text: "Striped cardigan with jewel button", correct: false},
            { text: "Buttoned knit cardigan", correct: false},


        ]
    },
    {
        question:  "Guess the price of this necklace",
        image: "img/necklace.png",
        answers: [
            { text: "$14.90", correct: false},
            { text: "$17.50", correct: false},
            { text: "$20.90", correct: true},
            { text: "$9.90", correct: false},


        ]
    },
    {
        question:  "Where is our Flagship store located?",
        answers: [
            { text: "10 Marine Parade Rd, #01-53", correct: false},
            { text: "2 Bayfront Avenue The Shoppes at Marina Bay Sands, #L3-28", correct: false},
            { text: "53 Clemenceau Ave, #01-18 UE Square", correct: false},
            { text: "10 Raffles Boulevard 01-79, Millenia Walk", correct: true},


        ]
    },
    {
        question:  "What year was our brand founded?",
        answers: [
            { text: "2001", correct: false},
            { text: "1995", correct: true},
            { text: "2010", correct: false},
            { text: "1989", correct: false},


        ]
    },
    {
        question:  "What is our return policy for online purchases?",
        answers: [
            { text: "No returns accepted", correct: false},
            { text: "Returns within 30 days with receipt", correct: true},
            { text: "Exchange only policy", correct: false},
            { text: "Returns within 15 days, no receipt needed", correct: false},


        ]
    },

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
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Check if there's an image for the current question
    if (currentQuestion.image) {
        const imageElement = document.createElement("img");
        imageElement.src = currentQuestion.image;
        imageElement.classList.add("question-image"); // You might want to style this
        questionElement.appendChild(imageElement); // Append image to the question element or another preferred location
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    let discount = score; // Assuming 1 point = 1% discount
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    // Check if the score is within an acceptable range for a discount
    if (discount > 0 && discount <= questions.length) {
        questionElement.innerHTML += `<p>Your score has earned you a ${discount}% discount!</p>`;
    } else {
        questionElement.innerHTML += `<p>Thanks for playing! Try again for a discount.</p>`;
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
    
});
startQuiz();

