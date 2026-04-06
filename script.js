const questions = [
  {
    tag: "PHISHING",
    title: "THE URGENT EMAIL",
    text: "You get an urgent email saying your company account will be suspended today unless you log in through a link and verify your details.",
    explanation: "Correct move: do not click the link. Check the sender carefully and contact IT using a number or method you already trust. This is classic phishing using urgency and fear.",
    answers: [
      { text: "Click the link quickly so you do not lose access", correct: false },
      { text: "Ignore the email and hope it goes away", correct: false },
      { text: "Verify through IT using a trusted channel", correct: true },
      { text: "Reply and ask if the email is real", correct: false }
    ]
  },
  {
    tag: "VISHING",
    title: "THE BANK CALL",
    text: "You receive a call from someone claiming to be your bank. They say your account is under attack and ask for your card details and PIN to secure it.",
    explanation: "Correct move: hang up and call your bank back on the official number yourself. Real banks do not ask for your PIN on a call.",
    answers: [
      { text: "Give them the details because it sounds urgent", correct: false },
      { text: "Hang up and call the bank on the official number", correct: true },
      { text: "Give only the card number but not the PIN", correct: false },
      { text: "Ask them to prove it by telling you your address", correct: false }
    ]
  },
  {
    tag: "TAILGATING",
    title: "THE OFFICE DOOR",
    text: "You badge into a secure office and someone behind you asks you to hold the door open because they forgot their badge upstairs.",
    explanation: "Correct move: let the door close and direct them to reception or security. Social engineers exploit politeness in physical spaces too.",
    answers: [
      { text: "Hold the door because they look like staff", correct: false },
      { text: "Hold the door and carry their coffee as well", correct: false },
      { text: "Let the door close and direct them to reception", correct: true },
      { text: "Ask if they know your manager and let them in", correct: false }
    ]
  },
  {
    tag: "BAITING",
    title: "THE USB STICK",
    text: "You find a USB stick in the car park labelled Staff Salaries and it looks important.",
    explanation: "Correct move: never plug in unknown devices. Hand it to IT or security. This is baiting and it relies on curiosity.",
    answers: [
      { text: "Open it on your work laptop", correct: false },
      { text: "Open it on your personal laptop instead", correct: false },
      { text: "Hand it to IT or security without plugging it in", correct: true },
      { text: "Take it home and check it later", correct: false }
    ]
  },
  {
    tag: "PRETEXTING",
    title: "THE NEW COLLEAGUE",
    text: "A friendly LinkedIn message says they have just joined your company and need the office WiFi password and internal portal link.",
    explanation: "Correct move: do not share anything. Tell them to go through proper IT onboarding and flag the message. This is pretexting.",
    answers: [
      { text: "Share the WiFi password only", correct: false },
      { text: "Share the portal link but not the password", correct: false },
      { text: "Refuse and direct them to official IT onboarding", correct: true },
      { text: "Ask what team they are in and then decide", correct: false }
    ]
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let startTime = Date.now();
let timerInterval = null;

const scenarioTag = document.getElementById("scenarioTag");
const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answersWrap = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");
const timerBox = document.getElementById("timerBox");
const progressFill = document.getElementById("progressFill");
const questionCount = document.getElementById("questionCount");
const resultCard = document.getElementById("resultCard");
const finalScore = document.getElementById("finalScore");
const resultText = document.getElementById("resultText");
const gameCard = document.querySelector(".game-card");

function startTimer() {
  timerInterval = setInterval(() => {
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    timerBox.textContent = `TIME: ${mins}:${secs}`;
  }, 1000);
}

function updateTopBar() {
  scoreBox.textContent = `SCORE: ${score} / ${questions.length}`;
  questionCount.textContent = `SCENARIO ${currentQuestion + 1} OF ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

function renderQuestion() {
  answered = false;
  feedback.classList.remove("show");
  feedback.textContent = "";
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];

  scenarioTag.textContent = q.tag;
  questionTitle.textContent = q.title;
  questionText.textContent = q.text;
  answersWrap.innerHTML = "";

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer.text;

    btn.addEventListener("click", () => handleAnswer(btn, answer.correct, q.explanation));
    answersWrap.appendChild(btn);
  });

  updateTopBar();
}

function handleAnswer(button, isCorrect, explanation) {
  if (answered) return;
  answered = true;

  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach((btn) => {
    btn.classList.add("disabled");
  });

  if (isCorrect) {
    score++;
    button.classList.add("correct");
    launchConfetti();
  } else {
    button.classList.add("wrong");
    allButtons.forEach((btn, index) => {
      if (questions[currentQuestion].answers[index].correct) {
        btn.classList.add("correct");
      }
    });
  }

  scoreBox.textContent = `SCORE: ${score} / ${questions.length}`;
  feedback.textContent = explanation;
  feedback.classList.add("show");
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  renderQuestion();
});

function showResults() {
  clearInterval(timerInterval);
  progressFill.style.width = "100%";
  gameCard.style.display = "none";
  resultCard.style.display = "block";

  const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");

  finalScore.innerHTML = `${score} / ${questions.length}<br>TIME ${mins}:${secs}`;

  if (score === 5) {
    resultText.textContent = "Perfect run. Strong instincts. You spotted every social engineering move and handled each one properly.";
  } else if (score >= 4) {
    resultText.textContent = "Good result. You passed. You clearly understand the basics and you are not easy to rush or manipulate.";
  } else if (score >= 2) {
    resultText.textContent = "Not a bad start, but social engineering still caught you a few times. That is exactly why awareness training matters.";
  } else {
    resultText.textContent = "That was rough, but useful. Social engineering works because it targets normal human behaviour. Review it and go again.";
  }
}

renderQuestion();
startTimer();

/* Arcade confetti */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
  const colors = ["#52ff9a", "#b14cff", "#ff2fb3", "#ffffff"];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 3;

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: centerX,
      y: centerY,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -8 - 2,
      gravity: 0.18,
      life: 70
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.life -= 1;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  particles = particles.filter((p) => p.life > 0);
  requestAnimationFrame(animateConfetti);
}
animateConfetti();
