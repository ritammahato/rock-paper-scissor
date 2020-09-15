const buttons = document.querySelectorAll('.pick');
const scoreEl = document.getElementById('score');
const main = document.getElementById('main');
const selection = document.getElementById('selection');
const reset = document.getElementById('reset');
const user_select = document.getElementById('user_select');
const computer_select = document.getElementById('computer_select');
const winner = document.getElementById('winner');


//model buttons & stuff

const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');

const choices = ['paper','rock','scissors'];

let score = 0;
let userChoice = undefined;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        userChoice = button.getAttribute('data-choices');

        
        checkWinner();
    });
});

reset.addEventListener('click', () => {
    //show the selection | hide main
    main.style.display = 'flex';
    selection.style.display = 'none';
});

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

function checkWinner() {
    const computerChoice = pickRandomChoice();

    //update the viewer
    updateSelection(user_select, userChoice);
    updateSelection(computer_select, computerChoice);

    if(userChoice === computerChoice) {
        //draw
        winner.innerText = 'draw';
    } else if(
        (userChoice === 'paper' && computerChoice === 'rock') || 
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper'))
        {
        //user won
        updateScore(1);
        winner.innerText = 'win';
    } else {
        //user lost
        updateScore(-1);
        winner.innerText = 'lost';
    }

    //show the selection | hide main
        main.style.display = 'none';
        selection.style.display = 'flex';
}


function updateScore(value) {
    score += value;

    scoreEl.innerText = score;
}

functions pickRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateSelection(selectionEl, choice) {
    //class reset
    selectionEl.classList.removed('btn-paper');
    selectionEl.classList.removed('btn-rock');
    selectionEl.classList.removed('btn-scissors');

    //update the images
    const img = selectionEl.querySelector('img');
    selectionEl.classList.add('btn-${choice}');
    img.src ='./images/icon-${choice}.svg';
    img.alt = choice;
}