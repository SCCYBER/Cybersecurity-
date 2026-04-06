const baseQuestions = [
  {
    tag: "PHISHING",
    question: "An email says your Microsoft account will be closed today unless you click a link and log in.",
    answers: [
      { text: "Click the link now", correct: false },
      { text: "Check with IT through an official channel", correct: true },
      { text: "Reply to ask if it is genuine", correct: false }
    ],
    success: "Correct. Verify through a trusted route.",
    fail: "Wrong. Phishing relies on urgency and panic."
  },
  {
    tag: "SMISHING",
    question: "You get a text saying your parcel cannot be delivered unless you pay a small redelivery fee.",
    answers: [
      { text: "Tap the link and pay the fee", correct: false },
      { text: "Ignore the text and check the delivery through the official courier website", correct: true },
      { text: "Forward the text to a friend to ask what they think", correct: false }
    ],
    success: "Correct. Smishing attacks use texts to rush you.",
    fail: "Wrong. Delivery scams are one of the most common smishing tactics."
  },
  {
    tag: "VISHING",
    question: "Someone calls claiming to be your bank asking for card details to stop fraud.",
    answers: [
      { text: "Give them the details", correct: false },
      { text: "Hang up and call the bank on the official number", correct: true },
      { text: "Give partial details only", correct: false }
    ],
    success: "Correct. Always call back on an official number.",
    fail: "Wrong. Real banks do not ask like this."
  },
  {
    tag: "TAILGATING",
    question: "Someone asks you to hold the secure office door open because they forgot their badge.",
    answers: [
      { text: "Let them in because they look like staff", correct: false },
      { text: "Send them to reception or security", correct: true },
      { text: "Ask their team name and let them in", correct: false }
    ],
    success: "Correct. Politeness is often exploited in physical security attacks.",
    fail: "Wrong. Tailgating works because people want to be helpful."
  },
  {
    tag: "USB BAITING",
    question: "You find a USB stick labelled payroll in the car park.",
    answers: [
      { text: "Plug it into your work laptop", correct: false },
      { text: "Hand it to IT or security", correct: true },
      { text: "Take it home and check it later", correct: false }
    ],
    success: "Correct. Unknown USB devices should never be plugged in.",
    fail: "Wrong. This is classic baiting."
  },
  {
    tag: "PRETEXTING",
    question: "Someone on LinkedIn asks for the company WiFi password and says they are a new starter.",
    answers: [
      { text: "Share the WiFi password", correct: false },
      { text: "Refuse and direct them to official IT onboarding", correct: true },
      { text: "Share the internal portal link only", correct: false }
    ],
    success: "Correct. New starters should go through IT, not LinkedIn messages.",
    fail: "Wrong. Name dropping and friendliness are part of the trick."
  },
  {
    tag: "RANSOMWARE",
    question: "A colleague says their screen suddenly locked and a message demands payment in cryptocurrency.",
    answers: [
      { text: "Tell them to pay quickly to get files back", correct: false },
      { text: "Disconnect the device and report it to IT or security immediately", correct: true },
      { text: "Restart the computer and keep working", correct: false }
    ],
    success: "Correct. Isolate first and escalate fast.",
    fail: "Wrong. Paying or ignoring can make the incident worse."
  },
  {
    tag: "SUPPLY CHAIN",
    question: "A trusted supplier emails saying they have changed bank details and future invoices must be paid to a new account.",
    answers: [
      { text: "Update the bank details from the email", correct: false },
      { text: "Verify the change with a known contact using a trusted number", correct: true },
      { text: "Wait until the next invoice and see if it still appears", correct: false }
    ],
    success: "Correct. Supplier compromise and invoice fraud are common supply chain attacks.",
    fail: "Wrong. Never trust bank detail changes by email alone."
  },
  {
    tag: "PHISHING",
    question: "Your manager sends a file share link and asks you to review it urgently, but the login page looks slightly different from normal.",
    answers: [
      { text: "Log in anyway because it came from your manager", correct: false },
      { text: "Verify the request with your manager before entering credentials", correct: true },
      { text: "Enter only your email first and see what happens", correct: false }
    ],
    success: "Correct. Even a manager account can be compromised.",
    fail: "Wrong. Familiar names do not make a link safe."
  },
  {
    tag: "SMISHING",
    question: "A text says there has been suspicious activity on your business account and tells you to call a number immediately.",
    answers: [
      { text: "Call the number in the text", correct: false },
      { text: "Use your official banking app or known contact number to check", correct: true },
      { text: "Reply STOP to see if it is a real alert", correct: false }
    ],
    success: "Correct. Use channels you already trust.",
    fail: "Wrong. Attackers want you to use their number, not the bank's."
  }
];

const PASS_MARK = 8;
let questions = [];
let index = 0;
let score = 0;
let answered = false;
let startTime = Date.now();
let timerInterval = null;
let fxMode = "none";

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
const questionCounter = document.getElementById("questionCounter");
const leaderboardEntry = document.getElementById("leaderboardEntry");
const playerNameInput = document.getElementById("playerName");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const leaderboardList = document.getElementById("leaderboardList");

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepareQuestions() {
  questions = shuffleArray(baseQuestions).map((q) => {
    return {
      ...q,
      answers: shuffleArray(q.answers)
    };
  });
}

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

function updateCounter() {
  questionCounter.innerText = "Question " + (index + 1) + " / " + questions.length;
}

function showQuestion() {
  answered = false;

  const q = questions[index];

  tag.innerText = q.tag;
  question.innerText = q.question;
  feedback.style.display = "none";
  feedback.innerText = "";
  nextBtn.style.display = "none";
  updateCounter();

  answers.innerHTML = "";

  q.answers.forEach((a) => {
    const btn = document.createElement("button");
    btn.innerText = a.text;
    btn.onclick = () => selectAnswer(a.correct, q.success, q.fail);
    answers.appendChild(btn);
  });
}

function selectAnswer(correct, successText, failText) {
  if (answered) return;
  answered = true;

  feedback.style.display = "block";

  if (correct) {
    score++;
    feedback.innerText = successText;
  } else {
    feedback.innerText = failText;
  }

  scoreText.innerText = "Score: " + score + " / " + questions.length;
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
  questionCounter.style.display = "none";
  result.style.display = "block";

  finalScore.innerText = "Final Score: " + score + " / " + questions.length + "  |  Time: " + formatTime(elapsedSeconds);

  if (score >= PASS_MARK) {
    resultHeading.innerText = "MISSION COMPLETE";
    resultHeading.style.color = "#52ff9a";
    resultHeading.style.textShadow = "0 0 12px #52ff9a";
    finalScore.style.color = "#52ff9a";
    resultMessage.innerText = "You passed. Strong awareness. Pass mark achieved at " + PASS_MARK + "/10.";
    leaderboardEntry.style.display = "block";
    runPassAnimation();
  } else {
    resultHeading.innerText = "MISSION INCOMPLETE";
    resultHeading.style.color = "#ff3b6b";
    resultHeading.style.textShadow = "0 0 12px #ff3b6b";
    finalScore.style.color = "#ff3b6b";
    resultMessage.innerText = "You did not pass. Pass mark is " + PASS_MARK + "/10. Go again.";
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

/* FX */
const canvas = document.getElementById("fxCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let skullPixels = [];
let skullExploded = false;
let fireworksStarted = false;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function addParticle(x, y, vx, vy, size, color, life) {
  particles.push({ x, y, vx, vy, size, color, life });
}

function createFireworksBurst(x, y) {
  const colors = ["#52ff9a", "#b14cff", "#ff3b6b", "#ffffff", "#ffd447"];
  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI * 2 * i) / 60;
    const speed = Math.random() * 4 + 2;
    addParticle(
      x,
      y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      Math.random() * 5 + 2,
      colors[Math.floor(Math.random() * colors.length)],
      70
    );
  }
}

function launchFireworks() {
  createFireworksBurst(canvas.width * 0.25, canvas.height * 0.3);
  createFireworksBurst(canvas.width * 0.5, canvas.height * 0.2);
  createFireworksBurst(canvas.width * 0.75, canvas.height * 0.3);

  for (let i = 0; i < 100; i++) {
    addParticle(
      canvas.width / 2,
      canvas.height / 3,
      (Math.random() - 0.5) * 12,
      Math.random() * -10 - 2,
      Math.random() * 8 + 3,
      ["#52ff9a", "#b14cff", "#ff3b6b", "#ffffff"][Math.floor(Math.random() * 4)],
      90
    );
  }
}

function setupSkull() {
  const pattern = [
    "00111100",
    "01111110",
    "11111111",
    "11011011",
    "11111111",
    "00111100",
    "01100110",
    "11000011"
  ];

  skullPixels = [];
  const pixelSize = 14;
  const startX = canvas.width / 2 - (pattern[0].length * pixelSize) / 2;
  const startY = canvas.height / 2 - 140;

  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (pattern[row][col] === "1") {
        skullPixels.push({
          x: startX + col * pixelSize,
          y: startY + row * pixelSize,
          size: pixelSize,
          color: "#ff3b6b",
          vx: 0,
          vy: 0,
          active: true
        });
      }
    }
  }
}

function explodeSkull() {
  skullPixels.forEach((p) => {
    p.vx = (Math.random() - 0.5) * 10;
    p.vy = (Math.random() - 0.5) * 10;
  });
  skullExploded = true;
}

function runPassAnimation() {
  fxMode = "skull";
  setupSkull();

  setTimeout(() => {
    explodeSkull();
  }, 700);

  setTimeout(() => {
    fireworksStarted = true;
    launchFireworks();
    launchFireworks();
  }, 1200);
}

function animateFx() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fxMode === "skull") {
    skullPixels.forEach((p) => {
      if (!p.active) return;

      if (skullExploded) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
      }

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
  }

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.12;
    p.life -= 1;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  particles = particles.filter((p) => p.life > 0);

  requestAnimationFrame(animateFx);
}

prepareQuestions();
showQuestion();
renderLeaderboard();
startTimer();
animateFx();
