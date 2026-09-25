const personKey = sessionStorage.getItem("quizPerson");

if (!personKey || !people[personKey]) {
    window.location.href = "quiz.html";
}

const person = people[personKey];

const gamePage = document.querySelector(".game-page");

if (gamePage) {
    gamePage.classList.add(`theme-${person.theme}`);
}

const allQuestions = [];

person.questions.forEach(round => {
    round.questions.forEach(question => {
        allQuestions.push({
            ...question,
            round: round.round,
            roundTitle: round.title,
            roundSubtitle: round.subtitle
        });
    });
});

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = false;
let streak = 0;
let currentRound = 1;

const roundIntro = document.getElementById("roundIntro");
const questionCard = document.getElementById("questionCard");
const roundNumber = document.getElementById("roundNumber");
const roundTitle = document.getElementById("roundTitle");
const roundSubtitle = document.getElementById("roundSubtitle");
const questionText = document.getElementById("questionText");
const currentQuestion = document.getElementById("currentQuestion");
const questionCount = document.getElementById("questionCount");
const answersContainer = document.getElementById("answers");
const scoreDisplay = document.getElementById("score");
const progressFill = document.getElementById("progressFill");
const percentage = document.getElementById("percentage");
const continueBtn = document.getElementById("continueBtn");
const nextBtn = document.getElementById("nextBtn");
const answerReaction = document.getElementById("answerReaction");
const reactionIcon = document.getElementById("reactionIcon");
const reactionText = document.getElementById("reactionText");


function showRoundIntro(roundNumberValue) {

    const round = person.questions.find(
        item => item.round === roundNumberValue
    );

    if (!round) {
        finishQuiz();
        return;
    }

    currentRound = roundNumberValue;

    roundIntro.style.display = "flex";
    questionCard.style.display = "none";
    nextBtn.style.display = "none";

    roundNumber.textContent =
        `ROUND ${round.round} / ${person.questions.length}`;

    roundTitle.textContent =
        round.title;

    roundSubtitle.textContent =
        round.subtitle;

    continueBtn.textContent =
        "LET'S GO →";
}


continueBtn.addEventListener("click", () => {

    roundIntro.style.display = "none";
    questionCard.style.display = "block";

    loadQuestion();
});


function loadQuestion() {

    const question =
        allQuestions[currentQuestionIndex];

    if (!question) {
        finishQuiz();
        return;
    }

    selectedAnswer = false;

    currentQuestion.textContent =
        (currentQuestionIndex % 4) + 1;

    questionCount.textContent =
        `QUESTION ${currentQuestionIndex + 1} / ${allQuestions.length}`;

    const progress =
        (currentQuestionIndex / allQuestions.length) * 100;

    progressFill.style.width =
        `${progress}%`;

    percentage.textContent =
        `${Math.round(progress)}%`;

    roundNumber.textContent =
        `ROUND ${question.round} / ${person.questions.length}`;

    questionText.textContent =
        question.question;

    scoreDisplay.textContent =
        score;

    answerReaction.classList.remove("show");

    reactionIcon.textContent =
        "✨";

    reactionText.textContent =
        "Choose wisely...";

    nextBtn.style.display =
        "none";

    createAnswers(question);

    questionCard.classList.remove(
        "question-change"
    );

    void questionCard.offsetWidth;

    questionCard.classList.add(
        "question-change"
    );
}


function createAnswers(question) {

    answersContainer.innerHTML = "";

    const letters = [
        "A",
        "B",
        "C",
        "D"
    ];

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.innerHTML = `
                <span class="answer-letter">
                    ${letters[index]}
                </span>

                <span class="answer-text">
                    ${option}
                </span>
            `;

            button.addEventListener(
                "click",
                () => {
                    chooseAnswer(
                        button,
                        index,
                        question.answer
                    );
                }
            );

            answersContainer.appendChild(
                button
            );
        }
    );
}


function chooseAnswer(
    button,
    selectedIndex,
    correctIndex
) {

    if (selectedAnswer) {
        return;
    }

    selectedAnswer = true;

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach(btn => {
        btn.classList.add("disabled");
    });


    if (selectedIndex === correctIndex) {

        score++;
        streak++;

        button.classList.add(
            "correct"
        );

        scoreDisplay.textContent =
            score;

        showReaction(
            "✓",
            getCorrectReaction()
        );

        createConfetti();

        showStreak();

    } else {

        const previousStreak =
            streak;

        streak = 0;

        button.classList.add(
            "wrong"
        );

        buttons[correctIndex].classList.add(
            "correct"
        );

        showReaction(
            "✦",
            getWrongReaction()
        );

        if (previousStreak > 0) {
            showStreakBroken();
        }
    }

    nextBtn.style.display =
        "flex";
}


function showStreak() {

    if (streak < 2) {
        return;
    }

    const streakMessage =
        document.createElement("div");

    streakMessage.className =
        "streak-popup";

    if (streak === 2) {

        streakMessage.innerHTML =
            "🔥 2 IN A ROW!";

    } else if (streak === 3) {

        streakMessage.innerHTML =
            "🔥🔥 3 IN A ROW!";

    } else if (streak === 4) {

        streakMessage.innerHTML =
            "🔥🔥🔥 4 IN A ROW!";

    } else {

        streakMessage.innerHTML =
            `🔥🔥🔥 ${streak} IN A ROW!`;
    }

    document.body.appendChild(
        streakMessage
    );

    setTimeout(() => {
        streakMessage.remove();
    }, 1300);
}


function showStreakBroken() {

    const brokenMessage =
        document.createElement("div");

    brokenMessage.className =
        "streak-broken";

    brokenMessage.textContent =
        "💀 STREAK BROKEN";

    document.body.appendChild(
        brokenMessage
    );

    setTimeout(() => {
        brokenMessage.remove();
    }, 1200);
}


function showReaction(
    icon,
    message
) {

    reactionIcon.textContent =
        icon;

    reactionText.textContent =
        message;

    answerReaction.classList.add(
        "show"
    );
}


function getCorrectReaction() {

    const reactions = [

        "Okayyy, you actually know me.",

        "Wait... you got that right?",

        "Not bad 👀",

        "That's suspiciously accurate.",

        "Someone has been paying attention.",

        "I might actually give you friendship points for that."

    ];

    return reactions[
        Math.floor(
            Math.random() *
            reactions.length
        )
    ];
}


function getWrongReaction() {

    const reactions = [

        "Interesting answer... very interesting.",

        "We need to talk about this.",

        "How could you betray me like this?",

        "I'm choosing to pretend I didn't see that.",

        "That answer was certainly... a choice.",

        "Your friendship score is taking emotional damage."

    ];

    return reactions[
        Math.floor(
            Math.random() *
            reactions.length
        )
    ];
}


nextBtn.addEventListener(
    "click",
    () => {

        currentQuestionIndex++;

        const nextQuestion =
            allQuestions[
                currentQuestionIndex
            ];


        if (!nextQuestion) {

            finishQuiz();

            return;
        }


        if (
            nextQuestion.round !==
            currentRound
        ) {

            showRoundIntro(
                nextQuestion.round
            );

            return;
        }


        loadQuestion();
    }
);


function finishQuiz() {

    progressFill.style.width =
        "100%";

    percentage.textContent =
        "100%";

    sessionStorage.setItem(
        "quizScore",
        score
    );

    sessionStorage.setItem(
        "quizTotal",
        allQuestions.length
    );

    window.location.href =
        "result.html";
}


function createConfetti() {

    const pieces = 18;

    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const confetti =
            document.createElement("div");

        confetti.className =
            "confetti-piece";

        confetti.textContent =
            [
                "✦",
                "✧",
                "•",
                "◆"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];

        confetti.style.left =
            `${Math.random() * 100}%`;

        confetti.style.top =
            "45%";

        confetti.style.animationDelay =
            `${Math.random() * 0.3}s`;

        document.body.appendChild(
            confetti
        );

        setTimeout(() => {
            confetti.remove();
        }, 1200);
    }
}


showRoundIntro(1);