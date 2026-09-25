const codeInput = document.getElementById("secretCode");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");

let currentPerson = null;
let questionShown = false;

function findPerson(code) {
    const enteredCode = code.trim().toLowerCase();

    for (const key in people) {
        if (people[key].code.toLowerCase() === enteredCode) {
            return key;
        }
    }

    return null;
}

function showUnlockQuestion(personKey) {
    const person = people[personKey];

    const title = document.querySelector(".access-title");
    const text = document.querySelector(".access-text");
    const label = document.querySelector(".access-label");
    const lock = document.querySelector(".lock-icon");

    currentPerson = personKey;
    questionShown = true;

    label.textContent = "ONE LAST CHECK";
    lock.textContent = "🔑";

    title.textContent = person.unlockQuestion;

    text.textContent =
        `Okay ${person.name}... prove that you actually know me.`;

    codeInput.value = "";
    codeInput.placeholder = "YOUR ANSWER";

    unlockBtn.innerHTML = `
        CHECK ANSWER
        <span>→</span>
    `;

    errorMessage.textContent = "";
}

function checkUnlockAnswer() {
    const answer =
        codeInput.value.trim().toLowerCase();

    if (!answer) {
        errorMessage.textContent =
            "You can't leave that blank 👀";

        shakeCard();
        return;
    }

    const correctAnswer =
        people[currentPerson].unlockAnswer
            .trim()
            .toLowerCase();

    if (answer === correctAnswer) {

        errorMessage.textContent = "";

        unlockBtn.innerHTML =
            "UNLOCKED ✓";

        document.querySelector(".lock-icon").textContent =
            "🔓";

        sessionStorage.setItem(
            "quizPerson",
            currentPerson
        );

        setTimeout(() => {
            window.location.href = "game.html";
        }, 700);

    } else {

        errorMessage.textContent =
            "Hmm... that's not it. Try again 👀";

        shakeCard();

        codeInput.value = "";
        codeInput.focus();
    }
}

function shakeCard() {
    const card =
        document.querySelector(".access-card");

    card.classList.remove("wrong");

    void card.offsetWidth;

    card.classList.add("wrong");
}

unlockBtn.addEventListener("click", () => {

    if (!questionShown) {

        const personKey =
            findPerson(codeInput.value);

        if (!personKey) {

            errorMessage.textContent =
                "That code doesn't look right... 🤨";

            shakeCard();

            codeInput.value = "";
            codeInput.focus();

            return;
        }

        showUnlockQuestion(personKey);

    } else {

        checkUnlockAnswer();
    }
});

codeInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        unlockBtn.click();
    }

});