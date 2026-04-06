:root {
  --bg-dark: #070312;
  --bg-panel: #12051f;
  --purple-deep: #1b0830;
  --purple-main: #6f1dce;
  --purple-glow: #b14cff;
  --pink-glow: #ff2fb3;
  --green-arcade: #52ff9a;
  --green-soft: #1ed760;
  --text-main: #f4ecff;
  --text-dim: #b9a4d6;
  --danger: #ff4d6d;
  --shadow: rgba(177, 76, 255, 0.35);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Share Tech Mono", monospace;
  background:
    radial-gradient(circle at top, #10244e 0%, #0c0f2a 25%, var(--bg-dark) 60%),
    linear-gradient(180deg, #090313 0%, #05020c 100%);
  color: var(--text-main);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(82, 255, 154, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(82, 255, 154, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

.bg-scanlines {
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.02) 0px,
    rgba(255,255,255,0.02) 2px,
    transparent 2px,
    transparent 4px
  );
  pointer-events: none;
  z-index: 0;
}

.virus-layer {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.virus {
  position: absolute;
  width: 90px;
  height: 90px;
  border: 3px solid rgba(82, 255, 154, 0.15);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(82, 255, 154, 0.08);
}

.virus::before,
.virus::after {
  content: "";
  position: absolute;
  inset: 50%;
  width: 14px;
  height: 14px;
  background: rgba(82, 255, 154, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.virus1 { top: 8%; left: 6%; animation: floaty 8s ease-in-out infinite; }
.virus2 { top: 18%; right: 8%; animation: floaty 10s ease-in-out infinite; }
.virus3 { bottom: 16%; left: 10%; animation: floaty 9s ease-in-out infinite; }
.virus4 { bottom: 12%; right: 12%; animation: floaty 11s ease-in-out infinite; }
.virus5 { top: 50%; right: 22%; animation: floaty 7s ease-in-out infinite; }

@keyframes floaty {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
  50% { transform: translateY(-18px) rotate(8deg); opacity: 0.9; }
}

.game-shell {
  position: relative;
  z-index: 1;
  width: min(920px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.top-bar {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 16px;
}

.score-box,
.timer-box {
  background: rgba(10, 4, 20, 0.85);
  border: 2px solid rgba(82, 255, 154, 0.25);
  box-shadow: 0 0 20px rgba(82, 255, 154, 0.08);
  padding: 12px 14px;
  border-radius: 12px;
  color: var(--green-arcade);
  font-size: 0.85rem;
}

.hero-card,
.game-card,
.result-card {
  background: rgba(18, 5, 31, 0.92);
  border: 2px solid rgba(177, 76, 255, 0.28);
  box-shadow:
    0 0 30px rgba(177, 76, 255, 0.16),
    inset 0 0 30px rgba(82, 255, 154, 0.03);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(4px);
}

.hero-card {
  text-align: center;
  margin-bottom: 18px;
}

.logo {
  width: 160px;
  max-width: 60%;
  display: block;
  margin: 0 auto 18px;
  filter: drop-shadow(0 0 18px rgba(177, 76, 255, 0.35));
}

.arcade-title {
  font-family: "Press Start 2P", cursive;
  font-size: clamp(1rem, 2.2vw, 1.8rem);
  line-height: 1.4;
  color: #ffffff;
  text-shadow:
    0 0 6px var(--purple-glow),
    0 0 16px var(--purple-glow),
    3px 3px 0 #180028;
  margin: 0 0 14px;
}

.subtitle {
  color: var(--green-arcade);
  font-size: 0.95rem;
  margin: 0;
}

.progress-wrap {
  margin-bottom: 24px;
}

.progress-bar {
  width: 100%;
  height: 16px;
  background: #0d0417;
  border: 2px solid rgba(82, 255, 154, 0.2);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--green-soft), var(--purple-glow), var(--pink-glow));
  transition: width 0.3s ease;
  box-shadow: 0 0 16px rgba(82, 255, 154, 0.3);
}

.question-count {
  color: var(--text-dim);
  font-size: 0.9rem;
}

.scenario-tag {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: rgba(82, 255, 154, 0.08);
  border: 1px solid rgba(82, 255, 154, 0.25);
  border-radius: 999px;
  color: var(--green-arcade);
  font-size: 0.85rem;
}

.question-title {
  font-family: "Press Start 2P", cursive;
  font-size: clamp(0.9rem, 1.8vw, 1.2rem);
  line-height: 1.5;
  margin: 0 0 18px;
  color: #fff;
}

.question-text {
  color: var(--text-main);
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0 0 22px;
}

.answers {
  display: grid;
  gap: 12px;
}

.answer-btn,
.next-btn {
  font-family: "Share Tech Mono", monospace;
  font-size: 1rem;
  border: 2px solid rgba(177, 76, 255, 0.25);
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.answer-btn {
  background: linear-gradient(180deg, rgba(28, 7, 45, 0.95), rgba(14, 4, 24, 0.95));
  color: #fff;
  text-align: left;
}

.answer-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(82, 255, 154, 0.45);
  box-shadow: 0 0 20px rgba(82, 255, 154, 0.12);
}

.answer-btn.correct {
  border-color: rgba(82, 255, 154, 0.7);
  box-shadow: 0 0 22px rgba(82, 255, 154, 0.22);
}

.answer-btn.wrong {
  border-color: rgba(255, 77, 109, 0.7);
  box-shadow: 0 0 22px rgba(255, 77, 109, 0.18);
}

.answer-btn.disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.feedback {
  margin-top: 18px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(6, 3, 12, 0.7);
  color: var(--text-main);
  line-height: 1.7;
  display: none;
  border: 1px solid rgba(177, 76, 255, 0.18);
}

.feedback.show {
  display: block;
}

.next-btn {
  margin-top: 20px;
  background: linear-gradient(180deg, rgba(82, 255, 154, 0.16), rgba(111, 29, 206, 0.25));
  color: #fff;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(177, 76, 255, 0.22);
}

.result-card {
  text-align: center;
  margin-top: 18px;
}

.result-logo {
  width: 120px;
}

.final-score {
  font-family: "Press Start 2P", cursive;
  color: var(--green-arcade);
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 18px;
  line-height: 1.6;
}

.result-text {
  color: var(--text-main);
  line-height: 1.8;
  max-width: 640px;
  margin: 0 auto 20px;
}

#confettiCanvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

@media (max-width: 640px) {
  .top-bar {
    flex-direction: column;
  }

  .score-box,
  .timer-box {
    text-align: center;
  }

  .hero-card,
  .game-card,
  .result-card {
    padding: 18px;
  }

  .answer-btn,
  .next-btn {
    font-size: 0.95rem;
  }
}
