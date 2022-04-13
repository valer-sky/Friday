document.addEventListener('DOMContentLoaded', () => {
    //card options

    const cardArray = [
      {
        name: 'fries',
        img: 'images/1.png'
      },
      {
        name: 'cheeseburger',
        img: 'images/2.png'
      },
      {
        name: 'ice-cream',
        img: 'images/3.png'
      },
      {
        name: 'pizza',
        img: 'images/4.png'
      },
      {
        name: 'milkshake',
        img: 'images/5.png'
      },
      {
        name: 'hotdog',
        img: 'images/6.png'
      },
      {
        name: 'fr',
        img: 'images/7.png'
      },
      {
        name: 'fri',
        img: 'images/8.png'
      },
      {
        name: 'frii',
        img: 'images/9.png'
      },
      {
        name: 'friit',
        img: 'images/10.png'
      },
      {
        name: 'fries',
        img: 'images/1.png'
      },
      {
        name: 'cheeseburger',
        img: 'images/2.png'
      },
      {
        name: 'ice-cream',
        img: 'images/3.png'
      },
      {
        name: 'pizza',
        img: 'images/4.png'
      },
      {
        name: 'milkshake',
        img: 'images/5.png'
      },
      {
        name: 'hotdog',
        img: 'images/6.png'
      },
      {
        name: 'fr',
        img: 'images/7.png'
      },
      {
        name: 'fri',
        img: 'images/8.png'
      },
      {
        name: 'frii',
        img: 'images/9.png'
      },
      {
        name: 'friit',
        img: 'images/10.png'
      },
    ];
  
    cardArray.sort(() => 0.5 - Math.random());
  
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    // resultDisplay.style.cssText ='text-color: white;';
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/back.jpg');
        card.setAttribute('data-id', i);
        card.style.cssText = `width: 100px; height: 100px;  position: relative; display: flex; flex-direction: row; 
        flex-wrap: wrap;align-items: center;justify-content: center; border: 3px solid #000; cursor: pointer;
        user-select: none; margin: 3px; padding: 2px;`;
        card.addEventListener('click',flipCard);
        grid.appendChild(card);
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];
      
      if(optionOneId == optionTwoId) {
        
        cards[optionOneId].setAttribute('src', 'images/back.jpg');
        cards[optionTwoId].setAttribute('src', 'images/back.jpg');
        }
      else if (cardsChosen[0] === cardsChosen[1]) {
       
        // cards[optionOneId].setAttribute('src', 'images/white.png')
        // cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        
      } else {
        // toggleTimer();
        cards[optionOneId].setAttribute('src', 'images/back.jpg');
        cards[optionTwoId].setAttribute('src', 'images/back.jpg');
       
      }
      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = cardsWon.length;
      if  (cardsWon.length === cardArray.length/2) {
        //
        // toggleTimer();
        // setTimeout(() => {
        //       setOpenedCardsStatus('closed', 'card_closed');
        //       paused = false;
        //     }, 700);
        resultDisplay.textContent = 'Congratulations! You found them all!';
        restartButton.hidden = false;
      }
    }
  
    //flip your card
    function flipCard() {
      toggleTimer();
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  
    createBoard();

    // function createTimer() {

    // }
    restart.onclick = function() {
      flipCard();
//   stepsCounter.innerHTML = 0;
//   complitedCards = 0;
    restartButton.hidden = true;
    }
    
  });
  ////////////////////////////////////////////////

  // let gameField      = document.getElementById('field');
let restartButton  = document.getElementById('restart');
let stepsCounter   = document.getElementById('steps');
let timerUI        = document.getElementById('timer');
// let cardViewInHTML = '<div class="card card_closed" data-status="closed"></div>';
// let cardsContent   = [1, 2, 3, 4, 5, 6, 7, 8];
// let openedCards    = [];
// let complitedCards = 0;
let paused         = false;

restartButton.hidden = true;
// cardsContent = doubleCards(cardsContent);
// createCardsOnGameField(field);

// gameField.onclick = function(e) {
// 	// wait while two wrong opened cards was closed;
//   if (paused) { 
//   	return; 
//   }
//   if (!timerUI.dataset.started) {
//   	toggleTimer();
//   }
// //   if (e.target.dataset.status === 'opened'
//    || e.target.dataset.status === 'complited') {
//     return;
//   }


  // openCard(e.target);
  // stepsCounter.innerHTML = +stepsCounter.innerHTML + 1;

  // if (openedCards.length !== 2) return;

  // set comlited status for matched cards, or close their with delay if not
  // if (openedCards[0] === openedCards[1]) {
  //   setOpenedCardsStatus('complited', '');
  //   complitedCards += 2;
  // } else {
  //   paused = true;
  //   setTimeout(() => {
  //     setOpenedCardsStatus('closed', 'card_closed');
  //     paused = false;
  //   }, 700);
  // }

  // clear openedCards array for next try
 

// restart.onclick = function()  {
//   gameField.innerHTML = '';
//   cardsContent = mixarr(cardsContent);
//   // create cards in HTML
//   for (let i = 0; i < cardsContent.length; i++) {
//     gameField.insertAdjacentHTML('beforeend', cardViewInHTML);
//     gameField.lastElementChild.innerHTML = cardsContent[i];
//   }
//   toggleTimer();
//   stepsCounter.innerHTML = 0;
//   complitedCards = 0;
//   restartButton.hidden = true;
// }








function timer(elemId) {
  let minutes = '00';
  let seconds = '00';
  let milliseconds = '00';

  let timerId = setInterval(() => {
    elemId.innerHTML = setTime();
    if (cardsChosenId === cardsWon.length) clearTimeout(timerId);
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
  	// timerUI.dataset.started = 'true';
  	timer(timerUI);
  // } else {
  // 	// timerUI.innerHTML = '00:00:00';
  // 	// timerUI.dataset.started = '';
  // }
}
}
