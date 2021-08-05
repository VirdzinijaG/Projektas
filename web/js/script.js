
let rezultatas = 0;

const minusDOM = document.querySelector(".minus");
const plusDOM = document.querySelector(".plus");
const numberDOM = document.querySelector(".number");
const resetDOM = document.querySelector(".reset");
const h1DOM = document.querySelector('h1');

function minusClick() {
    numberDOM.innerText = --rezultatas;
    h1DOM.innerText = "Žaidimas progrese";
}

function plusCick() {
    numberDOM.innerText = ++rezultatas;
    h1DOM.innerText = "Žaidimas progrese";
}

function resetClick() {
    rezultatas = 0;
    numberDOM.innerText = rezultatas;
    h1DOM.innerText = "Show must go on!";
}

minusDOM.addEventListener('click', minusClick);
plusDOM.addEventListener('click', plusCick);
resetDOM.addEventListener('click', resetClick);