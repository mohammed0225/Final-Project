//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array
//

const quizArray = [ //easy array then make another medArray then hardArray if easyt hen pass the array into funciton
  {
    id: "0",
    question: "Which is not one of the five pillars of Islam?",
    options: ["Hajj(Pilgrimage)", "Salam(Greeting)", "(Saum)Fasting", "Shahadah(Belief)"],
    correct: "Salam(Greeting)",
  },
  {
    id: "1",
    question: "Who is the last prophet?",
    options: ["Noah", "Moses", "Muhammad", "Adam"],
    correct: "Muhammad",
  },
  {
    id: "2",
    question: "What is the literal meaning of the word Islam?",
    options: ["God is One", "Peace", "God is the greatest", "Submission"],
    correct: "Submission",
  },
  {
    id: "3",
    question: "How many times does a Muslim pray?",
    options: ["5", "3", "7", "1"],
    correct: "5",
  },
  {
    id: "4",
    question: "What is the first month of the islamic calendar?",
    options: ["Ramadan", "Zhul Hijjah", "Shaaban", "Muharram"],
    correct: "Muharram",
  },
  {
    id: "5",
    question: "Where is the Kaaba located?",
    options: ["Mecca", "Medinah", "Jerusalem", "Turkey"],
    correct: "Mecca",
  },
  {
    id: "6",
    question: "What are the companions of the Prophet called?",
    options: ["Sahabah", "Friends", "Brothers", "Ummah"],
    correct: "Sahabah",
  },
  {
    id: "7",
    question: "What does Zam zam mean in Zam zam water?",
    options: ["Pure", "Stop", "Run", "Water"],
    correct: "Stop",
  },
  {
    id: "8",
    question: "What is shirk?",
    options: ["Haram", "Associating partners with God (Allah)", "Collecting interest", "Lying"],
    correct: "Associating partners with God (Allah)",
  },
  {
    id: "9",
    question: "How many names/attributes does Allah have?",
    options: ["100", "1", "99", "5"],
    correct: "99",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Exit quiz button


//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});


//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
}; //easy med hard about start. add arays together pass into intiial


//TRYING SOMETHING
// Event listener for the "Go Back" button
document.getElementById("go-back").addEventListener("click", () => {
  // Add the code here to handle the "Go Back" functionality.
  // For example, you can navigate to a previous page or perform other actions.
  console.log("Go Back button clicked!");
});
