var memoji = ['🐞','🐞','🦀','🦀','🐙','🐙','🐵','🐵','🐸','🐸','🐰','🐰'];
var box = document.querySelector('.grid-box');
var elemList = Array.from(document.querySelectorAll("div.front"));
var cards = Array.from(document.querySelectorAll(".card"));
var timer = document.querySelector('.timer');
var modal = document.querySelector('.modal');
var gameResult = document.querySelector('.game-result');
var button = document.querySelector('button');
var openedCards;
var numberOfopened;
var time;
var timerId;
var isTimerStarted;
var front;
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}
function matchCards() {
    front = openedCards.map(getFront);
    if (front[0].innerHTML == front[1].innerHTML) {
        front.forEach(function(fronti) {
            fronti.classList.add('matched');
        })
        numberOfopened += 2;
        openedCards = [];
        if (numberOfopened == 12) {
            popUp('Win', 'Play again');
        }
    } else {
        front.forEach(toggleNotMatched); 
    }
}
function getFront(card) {
    return card.querySelector('.front');
}
function toggleNotMatched (item) {
    item.classList.toggle('not-matched');
}
function rotate(card) {
    card.classList.toggle('non-clickable');
    card.classList.toggle('card-rotated');
}
function openCard(card) {
    if (!isTimerStarted) {
        isTimerStarted = true;
        timerId = setInterval(timerHandler, 1000);
    }
    if (openedCards.length == 2) {
        front = openedCards.map(getFront);
        front.forEach(toggleNotMatched);
        openedCards.forEach(rotate);
        openedCards = [];
    }
    if (openedCards.length == 0) {
        rotate(card);
        openedCards.push(card);
    } else {
        rotate(card);
        openedCards.push(card);
        matchCards();
    }
}
function timerHandler() {
    if (--time > 9) {
        timer.innerHTML = '00:' + time;
    } else {
        timer.innerHTML = '00:0' + time;
    }
    if (time == 0) {
        popUp('Lose', 'Try again');
    }
}
function popUp(result, buttonMessage) {
    clearInterval(timerId);
    modal.classList.add('visible');
    gameResult.innerHTML = '';
    fillResult(result);
    button.innerHTML = buttonMessage;
}
function fillResult(result) {
    for (var i = 0; i < result.length; i++) {
		var newLetter = document.createElement('span');
		newLetter.innerText = result[i];
		gameResult.appendChild(newLetter);
    }
}
function restart() {
    cards.forEach(function(elem, index) {
        elem.classList.remove("card-rotated", "non-clickable");
    })
    cards.map(getFront).forEach(function(elem, index) {
        elem.classList.remove("matched", "not-matched");
    })
    shuffle(memoji);
    setTimeout(function() {
        elemList.forEach(function(elem, index) {
            elem.innerHTML = memoji[index];
        })
    }, 250);
    timer.innerHTML = '01:00';
    time = 60;
    isTimerStarted = false;
    openedCards = [];
    numberOfopened = 0;
}
box.addEventListener('click', function(event) {
    if (event.target.parentNode.classList.contains('card')) { 
        openCard(event.target.parentNode);
    }
}, true)
button.addEventListener('mousedown', function(event) {
    event.target.classList.add('clicked');
});
button.addEventListener('mouseup', function(event) {
    event.target.classList.remove('clicked');
    modal.classList.remove('visible');
    restart();
});
window.onload = restart();