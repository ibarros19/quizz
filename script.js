// Variables
// Timer
const timeElement = document.querySelector('#time');
var timeLeft = 60;
var timePassing ;

// Start block
const startBtn = document.querySelector('#start');
const startPrompt = document.querySelector('#start-prompt');

// Question & answers block
const questionContainer = document.querySelector('#question-container');
const questionText = document.querySelector('#question-text');
const answerDiv = document.querySelector('#answers');
const resultDiv = document.querySelector('#result')

// User score block
const scoreContainer = document.querySelector('#score-container');
const scoreDiv = document.querySelector('#score');
const saveScore = document.querySelector('#record-score');
const initialsDiv = document.querySelector('#initials-input');
const userInitials = document.querySelector("#user-initials");

// High score block
const highScoreDiv = document.querySelector('#high-score');
const hScoreContainer = document.querySelector('#hscore-container');
const rePlay = document.querySelector('#play-again');
const clearScore = document.querySelector('#clear');

// Questions Array: Quiz questions and answers
const questions = [
    {
        text: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<javaScript', '<js>', '<body>', '<script>'],
        correctIndex: 3,
    },

    {
        text: 'Where is the correct place to insert a JavaScript?',
        answers: ['Both the head section and the body section are correct', 'The head section', 'The body section', 'None of the above'],
        correctIndex: 0,
    },

    {
        text: 'Is it necessary for the external script file to contain a <script> tag?',
        answers: ['Yes', 'No', 'Depends on the type of include', 'None of the above'],
        correctIndex: 1,
    },

    {
        text: `What will be the output of the following code?
        <script>
        document.write(typeof('1' + 2));
        </script>`,
        answers: ['String', 'Number', 'Boolean', 'All are false'],
        correctIndex: 0,
    },

    {
        text: 'How many ways are there with which we can declare a variable in javascript?',
        answers: ['Only one', 'Two', 'Three', 'Infinitely many'],
        correctIndex: 2,
    },

    {
        text: 'What is the type of variable data declare below const data=[]',
        answers: ['Object', 'String', 'Array', 'All are false'],
        correctIndex: 2,
    },
    
    {
        text: 'Which of the following represents loops in javascript',
        answers: ['For', 'While', 'forEach', 'All are right'],
        correctIndex: 3,
    },
];

var questionIndex = 0;

// Event Listeners
startBtn.addEventListener('click', startBtnClick);
answerDiv.addEventListener('click', handleAnswerClick);
saveScore.addEventListener('click', handleSubmitClick);
rePlay.addEventListener('click', handleReplayClick);
clearScore.addEventListener('click', handleClearClick);


// Functions
function startBtnClick(e) {
    // Hide start prompt
    startPrompt.style.display = 'none';

    // Start counter count down; use setInterval to determine what happens each second
    timePassing = setInterval(timer, 1000);

    // Show questions and answers 
    questionContainer.style.display = 'block';
    
    admQuizz();
};


function timer() {
    // Display timer & start timer
    timeElement.innerHTML = `Time: ${timeLeft}`;
    // Stop quiz
    if (timeLeft < 1) {
        clearTimeout(timePassing);

        // Display score block
        displayScore();
    }
    timeLeft--;
};

function admQuizz() {
    // Create a variable to store the current question
    const currentQuestion = questions[questionIndex];
    
    // Set the text content for the HTML element that displays the question
    questionText.textContent = currentQuestion.text;
    
    // Clear previous answer buttons
    answerDiv.innerHTML='';
    // Clear previous results
    clearResults();

    // button
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        const answer = currentQuestion.answers[i];
        const btn = document.createElement('button');
        btn.setAttribute('class', 'btn');
        btn.textContent = answer;
        answerDiv.appendChild(btn);
    };
};

function handleAnswerClick(e){
    e.preventDefault();
        if (!e.target.matches('button')) return;
        
        // If user chose the right answer, store
        const userAnswer = e.target.textContent;

        // Retrieve current question
        const question = questions[questionIndex];
        
        // Get correct answer
        const correctAnswer = question.answers[question.correctIndex];
        
        // Compare correct answer to user's response
            if (userAnswer === correctAnswer) {
                displayCorrect();
            }
            else {
            // If incorrect, remove 10 seconds from timer
                timeLeft -= 10;
                displayIncorrect();
            }
                questionIndex++

            if (questionIndex === questions.length) {
                clearTimeout(timePassing);
                return displayScore();
            }
          
            setTimeout(admQuizz, 1000);
};

function displayCorrect() {
    // display correct answer div
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Correct!';
};

function displayIncorrect(){
    // set attributes for incorrect answers
    resultDiv.style.display = 'block';
    resultDiv.textContent = 'Incorrect!';
};

function clearResults(){
    resultDiv.style.display = 'none';
}


function displayScore() {    
    // Hide
    questionContainer.style.display = 'none';
    timeElement.style.display = 'none';

    // Show score block
    scoreContainer.style.display = 'block';

    // Grab HTML to display score
    if (timeLeft < 0) {
        scoreDiv.textContent = 'Your score is ZERO'
    }
    else {
    scoreDiv.textContent = `Your score is ${timeLeft}`;
    }
    

};


function handleSubmitClick(e) {
  e.preventDefault();
  // record score option
    var user = {
        userInitials: userInitials.value.trim(),
        score: timeLeft,
    };

    
    var scores = JSON.parse(localStorage.getItem('highscores')) || [];
    scores.push(user);

    // JSON
    localStorage.setItem('highscores', JSON.stringify(scores));

    renderHighScore(user);
  };

function renderHighScore(user) {
  // Hide score block
  scoreContainer.style.display = 'none';

  // Show high score block
  hScoreContainer.style.display = 'block';
  
  // Display user's initial and score
  highScoreDiv.textContent = user.userInitials + ' Score is: ' + user.score;
  
    var highScoreList = localStorage.getItem('highscores');
    highScoreList = JSON.parse(highScoreList);

    };

    function handleReplayClick() {
        // Restart the Quiz
        window.location.reload();
    }

    function handleClearClick() {
        // Clear score
        highScoreDiv.textContent = '';
    }