const low = document.querySelector(".too-low");
const high = document.querySelector(".too-high");
const invalid = document.querySelector(".invalid");
const userGuesses = document.querySelectorAll(".guesses");

const title = document.querySelector(".title");
const congrats = document.querySelector(".congrats");
const gameover = document.querySelector(".gameover");
let showNum = document.querySelector(".shownum");
let result = document.querySelector(".result");

let rangeLow = document.querySelector(".lower-range");
let rangeHigh = document.querySelector(".upper-range");

const submit = document.querySelector("#submit");
const input = document.querySelector("#guess");
const newgame = document.querySelector(".newgame");

low.classList.toggle("too-low");
high.classList.toggle("too-high");
invalid.classList.toggle("invalid");
newgame.classList.toggle("newgame");

let guesses = 5;
let num = randomNum();
console.log(num);

submit.addEventListener("click", (e) => {
    e.preventDefault();
    checkGuess();
});

newgame.addEventListener("click", newGame);

function checkGuess() {
    if (guesses <= 1) {
        submit.disabled = true;
        title.style.visibility = "hidden";
        input.value = "";
        showNum.textContent = `${num}`;
        gameover.style.visibility = "visible";
        document.body.style.backgroundColor = "rgb(80, 0, 0)";
        return newgame.classList.toggle("newgame");
    }
    let guess = parseInt(input.value);
    if (isNaN(parseInt(guess))) {
        reveal(invalid);
    }
    if (guess < num) {
        guesses--;
        userGuesses[0].textContent =
            guesses == 1 ? `${guesses} guess` : `${guesses} guesses`;
        rangeLow.textContent =
            parseInt(rangeLow.textContent) < guess
                ? guess
                : rangeLow.textContent;
        reveal(low);
    } else if (guess > num) {
        guesses--;
        userGuesses[1].textContent =
            guesses == 1 ? `${guesses} guess` : `${guesses} guesses`;
        rangeHigh.textContent =
            parseInt(rangeHigh.textContent) > guess
                ? guess
                : rangeHigh.textContent;
        reveal(high);
    } else if (guess == num) {
        result.textContent =
            guesses < 5
                ? `${6 - guesses} guesses`
                : (result.textContent = `1 guess`);
        document.body.style.backgroundColor = "green";
        submit.disabled = true;
        title.style.visibility = "hidden";
        congrats.style.visibility = "visible";
        newgame.classList.toggle("newgame");
        document.body.style.backgroundColor = "rgb(0, 80, 0)";
    }
}

function reveal(x) {
    setTimeout(() => {
        x.classList.toggle("invalid");
        submit.disabled = false;
    }, 2000);
    x.classList.toggle("invalid");
    submit.disabled = true;
    input.value = "";
}

function randomNum() {
    return Math.ceil(Math.random() * 100);
}

function newGame() {
    document.body.style.backgroundColor = "black";
    newgame.classList.toggle("newgame");
    title.style.visibility = "visible";
    gameover.style.visibility = "hidden";
    congrats.style.visibility = "hidden";
    submit.disabled = false;
    rangeLow.textContent = 1;
    rangeHigh.textContent = 100;
    input.value = "";
    guesses = 5;
    num = randomNum();
}
