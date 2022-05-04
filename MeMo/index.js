"use strict";
let toggleButton = document.querySelector('.toggle-menu');
let navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', function () {
	navBar.classList.toggle('toggle');
});

let gameField      = document.getElementById('field');
let restartButton  = document.getElementById('restart');
let stepsCounter   = document.getElementById('steps');
let timerUI        = document.getElementById('timer');
let cardViewInHTML = '<div class="card card_closed" data-status="closed"></div>';
let cardsContent  = [1,2,3,4,5,6,7,8,9,10,11,12];
    cardsContent = cardsContent.map((card) => {
     let img = new Image();
     img.src = `img/${card}.png`;
      return img;
    });

let openedCards    = [];
let complitedCards = 0;
let paused         = false;

restartButton.hidden = true;
cardsContent = doubleCards(cardsContent);
createCardsOnGameField(field);

gameField.onclick = function(e) {
	// wait while two wrong opened cards was closed;
  if (paused) { 
  	return; 
  }
  if (!timerUI.dataset.started) {
  	toggleTimer();
  }
  if (e.target.dataset.status === 'opened'
   || e.target.dataset.status === 'complited') {
    return;
  }

  openCard(e.target);
  stepsCounter.innerHTML = +stepsCounter.innerHTML + 1;

  if (openedCards.length !== 2) return;

  // set comlited status for matched cards, or close their with delay if not
  if (openedCards[0] === openedCards[1]) {
    setOpenedCardsStatus('complited', '');
    complitedCards += 2;
  } else {
    paused = true;
    setTimeout(() => {
      setOpenedCardsStatus('closed', 'card_closed');
      paused = false;
    }, 700);
  }

  // clear openedCards array for next try
  openedCards = [];
  let resultDisplay = document.querySelector('.result');
  

  if (complitedCards === cardsContent.length) {
    resultDisplay.textContent = `Congratulations! You found them all! Your time: ${timerUI.innerHTML} and your steps: ${stepsCounter.innerHTML}`;
    restartButton.hidden = false;
  }
}

restart.onclick = function() {
  gameField.innerHTML = '';
  cardsContent = mixarr(cardsContent);
  // create cards in HTML
  for (let i = 0; i < cardsContent.length; i++) {
    gameField.insertAdjacentHTML('beforeend', cardViewInHTML);
    gameField.lastElementChild.innerHTML =  '<img class="card-image" src="' + cardsContent[i].getAttribute('src') + '">';
  }
  toggleTimer();
  stepsCounter.innerHTML = 0;
  complitedCards = 0;
  restartButton.hidden = true;
  resultDisplay.textContent = 'hidden';
}

function openCard(target) {
  target.dataset.status = 'opened';
  target.classList.remove('card_closed');
  openedCards.push(target.innerHTML);
}

function setOpenedCardsStatus(status, className) {
  for (let i = 0; i < gameField.children.length; i++) {
    if (gameField.children[i].dataset.status === 'opened') {
      gameField.children[i].dataset.status = status;
      if (!className) continue;
      gameField.children[i].classList.add(className);
    }
  }
}

function mixarr(arr) {
  return arr.map(i => [Math.random(), i]).sort().map(i => i[1])
}

function doubleCards(cardsContent) {
	cardsContent.push(...cardsContent);
	cardsContent = mixarr(cardsContent);
  return cardsContent;
}

function createCardsOnGameField(field) {
  for (let i = 0; i < cardsContent.length; i++) {
    field.insertAdjacentHTML('beforeend', cardViewInHTML);
    gameField.lastElementChild.innerHTML =  '<img class="card-image" src="' + cardsContent[i].getAttribute('src') + '">';
  }
}

function timer(elemId) {
  let minutes = '00';
  let seconds = '00';
  let milliseconds = '00';

  let timerId = setInterval(() => {
    elemId.innerHTML = setTime();
    if (complitedCards === cardsContent.length) clearTimeout(timerId);
  }, 10);

  function doubleNumber(number) {
    if (number < 10) return '0' + number;
    return number;
  }

  function setTime() {
    if (milliseconds === 99) {
      milliseconds = '00';
      seconds++;
      seconds = doubleNumber(seconds);
    }
    if (seconds === 60) {
      seconds = '00';
      minutes++;
      minutes = doubleNumber(minutes);
    }

    milliseconds++;
    milliseconds = doubleNumber(milliseconds);

    return `${minutes}:${seconds}:${milliseconds}`;
  }
}

function toggleTimer() {
	if (!timerUI.dataset.started) {
  	timerUI.dataset.started = 'true';
  	timer(timerUI);
  } else {
  	timerUI.innerHTML = '00:00:00';
  	timerUI.dataset.started = '';
  }
}


window.onhashchange = renderNewState;
function renderNewState() {
    const hash = window.location.hash;
    let state = decodeURIComponent(hash.substr(1));

    if (state === '') {
        state = {page: 'first'};
    } else {
        state = JSON.parse(state);
    }

    let page = '';

    switch(state.page) {
        case 'first':
            page += 'rrrr';
            break;
        case 'second':
            page += `<ol>
                                            <li>Ищи совпадающие по цвету элементы по горизонтали, вертикали или диагонали (3 и более)</li><br>
                                            <li>Элементами можно управлять при помощи мыши на ПК и пальцем на тачскрине</li><br>
                                            <li>Нажми на элемент и проведи в сторону второго элемента, с которым необходимо поменяться местами</li><br>
                                            <li>Одинаковые группы исчезнут и поле перестоится, а ты получишь очки</li><br>
                                            <li>Набери максимальное количество очков за 30 ходов</li>
                                        </ol>`;
            break;
        case 'third':
            page += '<h1>Таблица рекордов</h1>';
            break;
    }

    document.getElementById('page').innerHTML = page;
}

function switchToState(state) {
    location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToFirst() {
    switchToState({page: 'first'});
}
function switchToSecond() {
    switchToState({page: 'second'});
}
function switchToThird() {
    switchToState({page: 'third'});
}

renderNewState();