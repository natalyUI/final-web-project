document.addEventListener("DOMContentLoaded", () => {
  initQuiz();
});

/* =========================
   QUIZ
========================= */
function initQuiz() {
  const quizPage = document.body.dataset.page === "quiz";
  if (!quizPage) return;

  const screens = document.querySelectorAll(".screen");
  const resultText = document.getElementById("resultText");

  if (!screens.length || !resultText) return;

  let currentScreen = 0;
  let quizAnswers = new Array(10).fill(null);

  function updateSelectedButtons() {
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn) => {
      const q = Number(btn.dataset.question);
      const value = btn.dataset.value;

      btn.classList.remove("selected");

      if (quizAnswers[q] === value) {
        btn.classList.add("selected");
      }
    });
  }

  function calculateResult() {
    let dreamyScore = 0;
    let emotionalScore = 0;
    let chaoticScore = 0;

    quizAnswers.forEach((answer) => {
      if (answer === "dreamy") dreamyScore++;
      if (answer === "emotional") emotionalScore++;
      if (answer === "chaotic") chaoticScore++;
    });

    if (dreamyScore > emotionalScore && dreamyScore > chaoticScore) {
      resultText.textContent =
        "את יוצרת חולמנית־חזותית. את נמשכת לאווירה, לדימוי, לצבע ולרגעים שקטים שנשארים בראש. יש ביצירה שלך רכות, מבט, ועולם פנימי עשיר.";
    } else if (emotionalScore > dreamyScore && emotionalScore > chaoticScore) {
      resultText.textContent =
        "את יוצרת רגשית־עמוקה. מה שמוביל אותך הוא המשמעות שמתחת לפני השטח. את מחפשת מגע אמיתי, מתח רגשי, ורגע שבו מישהו מרגיש שהוא באמת ראה אותך.";
    } else if (chaoticScore > dreamyScore && chaoticScore > emotionalScore) {
      resultText.textContent =
        "את יוצרת כאוטית־חיה. את אוהבת תנועה, שינוי, טוויסטים ומשחק. יש בעבודות שלך ניצוץ, אנרגיה, ורצון למשוך את הקהל פנימה עד שהוא לא יכול להפסיק להסתכל.";
    } else if (dreamyScore === emotionalScore && dreamyScore > chaoticScore) {
      resultText.textContent =
        "את שילוב של חלום ורגש. את יוצרת מתוך אווירה עדינה ועולם פנימי, אבל גם מתוך עומק רגשי שנשאר הרבה אחרי שהעבודה נגמרת.";
    } else if (dreamyScore === chaoticScore && dreamyScore > emotionalScore) {
      resultText.textContent =
        "את שילוב של פיוט ותנועה. יש אצלך גם אסתטיקה ואווירה וגם דחף למשחק, שינוי והפתעה.";
    } else if (emotionalScore === chaoticScore && emotionalScore > dreamyScore) {
      resultText.textContent =
        "את שילוב של רגש וכאוס. יש ביצירה שלך גם עוצמה פנימית וגם אנרגיה חיה, בלתי צפויה, שדוחפת את הקהל קדימה.";
    } else {
      resultText.textContent =
        "את יוצרת רב־שכבתית. יש בך חלום, רגש, כאוס, יופי ותנועה — והעבודה שלך חיה בדיוק בגלל שהיא לא נכנסת בקלות לקטגוריה אחת.";
    }
  }

  function showScreen(index) {
    if (index < 0) index = 0;
    if (index >= screens.length) index = screens.length - 1;

    screens.forEach((screen) => screen.classList.remove("active"));
    screens[index].classList.add("active");
    currentScreen = index;

    updateSelectedButtons();

    if (index === 10) {
      calculateResult();
    }
  }

  function nextScreen() {
    showScreen(currentScreen + 1);
  }

  function prevScreen() {
    showScreen(currentScreen - 1);
  }

  function answerQuestion(questionIndex, answerValue) {
    quizAnswers[questionIndex] = answerValue;
    updateSelectedButtons();
  }

  function showResult() {
    calculateResult();
    showScreen(10);
  }

  window.showScreen = showScreen;
  window.nextScreen = nextScreen;
  window.prevScreen = prevScreen;
  window.answerQuestion = answerQuestion;
  window.showResult = showResult;

  showScreen(0);
}