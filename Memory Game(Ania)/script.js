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
        card.addEventListener('click', flipCard);
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
        cards[optionOneId].setAttribute('src', 'images/back.jpg');
        cards[optionTwoId].setAttribute('src', 'images/back.jpg');
        
      }
      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = cardsWon.length;
      if  (cardsWon.length === cardArray.length/2) {
      
      
        resultDisplay.textContent = 'Congratulations! You found them all!';
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  
    createBoard();
    
    
  });
