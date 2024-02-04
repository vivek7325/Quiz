
const start = document.querySelector(".submit-btn");
const next = document.querySelector(".next-btn");
const form = document.querySelector(".quiz-form");
const QuesSet = document.querySelector('.Quiz-Ques');
let timer_left = document.querySelector('.timer_sec');
const result = document.querySelector('.result_box');

let score = 0;
start.addEventListener('click',startquiz);

next.addEventListener('click',nextQuestion);
function startquiz(){
    form.style.display = 'none';
    QuesSet.style.display = 'block';

    const numQuestionsSelected = document.getElementById('amount');
    const difficultySelected = document.getElementById('difficulty');

    const numQuestions = parseInt(numQuestionsSelected.value);
    const difficulty = difficultySelected.value;


    const filteredQuestions = filterQuestions(numQuestions, difficulty);

    questions = filteredQuestions;
    updateScore();
    showQuestions();
    startTimer();
}

let currentQuestionIndex = 0;
let userAnswers = [];


function filterQuestions(numQuestions,difficulty){
  return questions.filter(question => {
    return  question.difficulty === difficulty && question.numb <= numQuestions;
  });
}

function showQuestions(){
    const currentQuestion = questions[currentQuestionIndex];
    const showQuestion = document.getElementById('question-container');
    const showOptions = document.getElementById('options-container');

    showQuestion.textContent = currentQuestion.question;
    showOptions.innerHTML = "";

   currentQuestion.options.forEach((option,index) =>{
        const button = document.createElement('button');
        button.textContent = option;
        button.style.backgroundColor = "#e0e0e0";
        button.style.color = "#000080";
        button.addEventListener('click',() => selectOption(option));
        showOptions.appendChild(button);
   });

}

function selectOption(selectedOption){
  userAnswers[currentQuestionIndex] = selectedOption;
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll('.options-container button');
  options.forEach((option) => option.removeEventListener('click', () => selectOption(option)));

  options.forEach(option => {
    if (option.textContent === currentQuestion.answer) {
        option.style.backgroundColor = "#2ecc71"; 
        option.style.color = "#ffffff"; 
    } else if (option.textContent === selectedOption) {
        option.style.backgroundColor = "#e74c3c"; 
        option.style.color = "#ffffff"; 
    } else {
        option.style.backgroundColor = "#e0e0e0"; 
        option.style.color = "#000080"; 
    }
});
  
  if(selectedOption === currentQuestion.answer){
    console.log("correct !");
    score++;
    updateScore();
  } else {
    console.log("Wrong answer.");
  }
  clearInterval(timerInterval);
  startTimer();// restart timer for next question 
  setTimeout(nextQuestion, 1000); // to show button color before next
}

function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
        startTimer();
    }
    else{
        showResult(); // show result after quiz completed
        console.log("Quiz Completed");
    }
}

function updateScore(){
  const scoreShow = document.getElementById("Score");
  scoreShow.textContent = score;
}

let timer;
let timerInterval;

function updateTimer(){
  timer_left.textContent = timer;
}

function startTimer(){
  clearInterval(timerInterval);
  const currentQuestion = questions[currentQuestionIndex];
    const difficultyTimes = {
        easy: 7,
        medium: 10,
        hard: 15
    };

    const duration = difficultyTimes[currentQuestion.difficulty];
    timer = duration;
    updateTimer();

    timerInterval = setInterval(function(){
      timer--;

      if(timer == 0){
        clearInterval(timerInterval);
        nextQuestion();
        console.log("Time's up!");

      }
      updateTimer();
    },1000);
}
result.style.style = 'none';

function showResult(){
  QuesSet.style.display = 'none';
  const score_Text = result.querySelector('.score_text');
  const complete_text = result.querySelector('.complete_text');
  complete_text.textContent = "Quiz Completed";
  score_Text.textContent = `Your Score ${score}`;
  result.style.style = 'block';
}