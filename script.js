const questions = [
  {
    tag: "PHISHING",
    question: "An email says your Microsoft account will be closed today unless you click a link and log in.",
    answers: [
      { text: "Click the link", correct: false },
      { text: "Ignore it", correct: false },
      { text: "Check with IT through an official channel", correct: true }
    ]
  },
  {
    tag: "VISHING",
    question: "Someone calls claiming to be your bank asking for your card details.",
    answers: [
      { text: "Give the details", correct: false },
      { text: "Hang up and call the bank directly", correct: true },
      { text: "Give partial details", correct: false }
    ]
  },
  {
    tag: "TAILGATING",
    question: "Someone asks you to hold the secure office door open.",
    answers: [
      { text: "Let them in", correct: false },
      { text: "Send them to reception", correct: true },
      { text: "Ask their department", correct: false }
    ]
  },
  {
    tag: "USB BAITING",
    question: "You find a USB stick labelled payroll in the car park.",
    answers: [
      { text: "Plug it in", correct: false },
      { text: "Give it to IT", correct: true },
      { text: "Take it home", correct: false }
    ]
  },
  {
    tag: "PRETEXTING",
    question: "Someone on LinkedIn asks for the company WiFi password.",
    answers: [
      { text: "Share it", correct: false },
      { text: "Refuse and report it", correct: true },
      { text: "Share partial info", correct: false }
    ]
  }
];

let index = 0;
let score = 0;
let answered = false;
let startTime = Date.now();
let timerInterval = null;

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const tag = document.getElementById("tag");
const resultHeading = document.getElementById("resultHeading");
const resultMessage = document.getElementById("resultMessage");
const questionBox = document.getElementById("questionBox");
const timerEl = document.getElementById("timer");
const leaderboardEntry = document.getElementById("leaderboardEntry");
const playerNameInput = document.getElementById("playerName");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const leaderboardList = document.getElementById("leaderboardList");

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timerEl.innerText = "Time: " + formatTime(elapsedSeconds);
  }, 1000);
}

function getElapsedSeconds() {
  return Math.floor((Date.now() - startTime) / 1000);
}

function showQuestion() {
  answered = false;

  const q = questions[index];

  tag.innerText = q.tag;
  question.innerText = q.question;
  feedback.style.display = "none";
  feedback.innerText = "";
  nextBtn.style.display = "none";

  answers.innerHTML = "";

  q.answers.forEach((a) => {
    const btn = document.createElement("button");
    btn.innerText = a.text;
    btn.onclick = () => selectAnswer(a.correct);
    answers.appendChild(btn);
  });
}

function selectAnswer(correct) {
  if (answered) return;
  answered = true;

  feedback.style.display = "block";

  if (correct) {
    score++;
    feedback.innerText = "Correct. Good instinct.";
    launchConfetti();
  } else {
    feedback.innerText = "Wrong. Social engineers rely on pressure, trust and urgency.";
  }

  scoreText.innerText = "Score: " + score + " / 5";
  nextBtn.style.display = "block";

  const buttons = answers.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.style.cursor = "default";
  });
}

nextBtn.onclick = () => {
  index++;

  if (index >= questions.length) {
    showResult();
    return;
  }

  showQuestion();
};

function showResult() {
  clearInterval(timerInterval);

  const elapsedSeconds = getElapsedSeconds();

  questionBox.style.display = "none";
  result.style.display = "block";

  finalScore.innerText = "Final Score: " + score + " / 5  |  Time: " + formatTime(elapsedSeconds);

  if (score >= 4) {
    resultHeading.innerText = "MISSION COMPLETE";
    resultHeading.style.color = "#52ff9a";
    resultHeading.style.textShadow = "0 0 12px #52ff9a";
    finalScore.style.color = "#52ff9a";
    resultMessage.innerText = "You passed. Strong awareness. You handled most of the attacks properly.";
    leaderboardEntry.style.display = "block";
  } else {
    resultHeading.innerText = "MISSION INCOMPLETE";
    resultHeading.style.color = "#ff3b6b";
    resultHeading.style.textShadow = "0 0 12px #ff3b6b";
    finalScore.style.color = "#ff3b6b";
    resultMessage.innerText = "You did not pass this time. Social engineering works because it targets normal human behaviour. Go again.";
    leaderboardEntry.style.display = "none";
  }

  renderLeaderboard();
}

function getLeaderboard() {
  const saved = localStorage.getItem("sccyberLeaderboard");
  return saved ? JSON.parse(saved) : [];
}

function saveLeaderboard(entries) {
  localStorage.setItem("sccyberLeaderboard", JSON.stringify(entries));
}

function renderLeaderboard() {
  const leaderboard = getLeaderboard();
  leaderboardList.innerHTML = "";

  if (leaderboard.length === 0) {
    const li = document.createElement("li");
    li.innerText = "No scores yet";
    leaderboardList.appendChild(li);
    return;
  }

  leaderboard.forEach((entry) => {
    const li = document.createElement("li");
    li.innerText = `${entry.name} - ${formatTime(entry.time)}`;
    leaderboardList.appendChild(li);
  });
}

saveScoreBtn.onclick = () => {
  let name = playerNameInput.value.trim().toUpperCase();

  name = name.replace(/[^A-Z0-9]/g, "").slice(0, 7);

  if (!name) {
    alert("Enter a name up to 7 characters");
    return;
  }

  const elapsedSeconds = getElapsedSeconds();
  const leaderboard = getLeaderboard();

  leaderboard.push({
    name: name,
    time: elapsedSeconds
  });

  leaderboard.sort((a, b) => a.time - b.time);

  const top10 = leaderboard.slice(0, 10);
  saveLeaderboard(top10);

  playerNameInput.value = "";
  leaderboardEntry.style.display = "none";
  renderLeaderboard();
};

showQuestion();
renderLeaderboard();
startTimer();

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -8 - 2,
      size: Math.random() * 8 + 4,
      color: ["#52ff9a", "#b14cff", "#ff3b6b", "#ffffff"][Math.floor(Math.random() * 4)],
      life: 80
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2;
    p.life -= 1;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  particles = particles.filter((p) => p.life > 0);
  requestAnimationFrame(animateConfetti);
}

animateConfetti();
