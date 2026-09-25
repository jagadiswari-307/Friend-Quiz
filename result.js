const score = Number(sessionStorage.getItem("quizScore")) || 0;
const total = Number(sessionStorage.getItem("quizTotal")) || 20;

const percentageValue = Math.round((score / total) * 100);

const percentageElement =
    document.getElementById("percentage");

const scoreElement =
    document.getElementById("score");

const totalElement =
    document.getElementById("total");

const messageElement =
    document.getElementById("resultMessage");

const playAgainButton =
    document.getElementById("playAgain");

const homeButton =
    document.getElementById("homeBtn");


/* ================= DISPLAY SCORE ================= */

scoreElement.textContent = score;
totalElement.textContent = total;


/* ================= ANIMATE PERCENTAGE ================= */

let currentPercentage = 0;

const percentageAnimation = setInterval(() => {

    currentPercentage++;

    percentageElement.textContent =
        `${currentPercentage}%`;

    if (currentPercentage >= percentageValue) {
        clearInterval(percentageAnimation);
    }

}, 20);


/* ================= RESULT MESSAGE ================= */

function getResultMessage() {

    if (percentageValue === 100) {

        return `
            WHAT?! You got everything right.
            <br>
            At this point, you might know me better than I know myself. 👀
        `;

    }

    if (percentageValue >= 85) {

        return `
            Okay, that's actually impressive.
            <br>
            You clearly pay attention to the important things. ✨
        `;

    }

    if (percentageValue >= 70) {

        return `
            Not bad at all.
            <br>
            I'd say you know me pretty well... for now. 😌
        `;

    }

    if (percentageValue >= 50) {

        return `
            Hmm... we may need to have a friendship meeting.
            <br>
            You knew some things. That's something. 😂
        `;

    }

    if (percentageValue >= 30) {

        return `
            I'm not saying you failed...
            <br>
            but some of those answers were concerning. 😭
        `;

    }

    return `
        We need to talk.
        <br>
        Immediately. 😂
    `;
}


setTimeout(() => {

    messageElement.innerHTML =
        getResultMessage();

}, 700);


/* ================= PLAY AGAIN ================= */

playAgainButton.addEventListener("click", () => {

    sessionStorage.removeItem("quizScore");
    sessionStorage.removeItem("quizTotal");

    window.location.href = "game.html";

});


/* ================= HOME ================= */

homeButton.addEventListener("click", () => {

    sessionStorage.removeItem("quizScore");
    sessionStorage.removeItem("quizTotal");
    sessionStorage.removeItem("quizPerson");

    window.location.href = "index.html";

});