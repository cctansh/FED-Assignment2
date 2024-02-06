// Define API key, API URL, and object ID for REST API interaction
const apiKey = "65b665611aac406df1278a6f";
const apiUrl = 'https://products-aa44.restdb.io/rest/quiz';
const objId = '65bdec96649d301400000044';

// Array of quiz questions with options and correct answers
const questions = [
    // Each object in the array represents a quiz question
    // Q1
    {
        question:  "What is the name of this product?",
        image: "img/ring4.jpeg",
        answers: [
            { text: "Silver Tiara Ring", correct: true},
            { text: "Silver Crown Ring", correct: false},
            { text: "Silver Studded Tiara Ring", correct: false},
            { text: "Silver Studded Crown Ring", correct: false},


        ]
    },
    // Q2
    {
        question:  "What is the price of this bracelet?",
        image: "img/bracelet1.jpeg",
        answers: [
            { text: "$40.99", correct: false},
            { text: "$45.99", correct: false},
            { text: "$44.99", correct: true},
            { text: "$49.99", correct: false},


        ]
    },
    // Q3
    {
        question:  "What is the name of our brand?",
        answers: [
            { text: "Crown Jewelry Inc.", correct: false},
            { text: "Star Jewels Inc.", correct: false},
            { text: "Crown Jewels Inc.", correct: false},
            { text: "Star Jewelry Inc.", correct: true},


        ]
    },
    // Q4
    {
        question:  "What year was our brand founded?",
        answers: [
            { text: "2008", correct: false},
            { text: "2024", correct: true},
            { text: "2013", correct: false},
            { text: "2019", correct: false},


        ]
    },
    // Q5
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

// Selection of DOM elements that will be manipulated
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variables to track current question index and user score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

// Shows the current question and its answers
function showQuestion(){
    resetState(); // Clear any previous question's state
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Check if there's an image for the current question
    if (currentQuestion.image) {
        const imageElement = document.createElement("img");
        imageElement.src = currentQuestion.image;
        imageElement.classList.add("question-image"); 
        questionElement.appendChild(imageElement); // Append image to the question element
    }

    // Create buttons for each answer option
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

// Function to reset quiz state to default Q1
function resetState(){
    nextButton.style.display = "none"; // Hide next button
    while(answerButtons.firstChild){ // Remove previous answers
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle user answer selection
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // Disable all buttons and highlight correct answer
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Display next button
    nextButton.style.display = "block";
}

// Displays the final score and calculates a discount
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
    // Update next button for completion
    nextButton.innerHTML = "DONE";
    nextButton.style.display = "block";
}

// Controls the flow when the next button is clicked
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){ // If questions still remaining
        showQuestion();
    }else{ // End quiz and show score
        showScore();
    }
}

// Acts when clicking next button
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){ // If questions still remaining
        handleNextButton();
    } else {
        // Display animation and patch API when quiz is completed
        page = document.getElementsByTagName('body')[0];
        page.innerHTML = `
        <div class="animation-center">
            <dotlottie-player src="https://lottie.host/00f5781f-7a7c-4254-91c1-5d58abf0f4fe/j0ppqxUpMa.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop autoplay></dotlottie-player>
        </div>
        `
        patchAPI()
        .then(() => {
            // Navigate to index.html only when patch is successful
            window.location.href = 'index.html';
        })
        .catch(error => {
            // Handle errors if failure
            console.error('Failed to patch:', error);
        });
    }
});

// patches discount data to API
async function patchAPI() {
    try {
            const response = await fetch(`${apiUrl}/${objId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "x-apikey": apiKey,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({discount: score})
            });

            const result = await response.json();
            return result;
    } catch (error) {
        console.error('Error patching object:', error);
        throw error;
    }
}

// Start the quiz when the page loads
startQuiz();