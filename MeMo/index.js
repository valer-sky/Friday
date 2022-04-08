"use strict";
let gameField      = document.getElementById('field');
let restartButton  = document.getElementById('restart');
let stepsCounter   = document.getElementById('steps');
let timerUI        = document.getElementById('timer');
let cardViewInHTML = '<div class="card card_closed" data-status="closed"></div>';
let cardsContent   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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

  if (complitedCards === cardsContent.length) {
    restartButton.hidden = false;
  }
}

restart.onclick = function() {
  gameField.innerHTML = '';
  cardsContent = mixarr(cardsContent);
  // create cards in HTML
  for (let i = 0; i < cardsContent.length; i++) {
    gameField.insertAdjacentHTML('beforeend', cardViewInHTML);
    gameField.lastElementChild.innerHTML = cardsContent[i];
  }
  toggleTimer();
  stepsCounter.innerHTML = 0;
  complitedCards = 0;
  restartButton.hidden = true;
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
    field.lastElementChild.innerHTML = cardsContent[i];
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
   //
//    class Player {
//     constructor() {
//         this.score = 0;
//         this.setPlayer();
//     }

//     setRecords(data) {
//         let table = document.querySelector('.records_table');
//         let trs = table.querySelectorAll('.top_five');

//         for (let i = 0; i < trs.length; i++) {
//             trs[i].firstElementChild.textContent = data[i][0];
//             trs[i].lastElementChild.textContent = data[i][1];
//         }
//     }

//     setPlayer() {
//         let name = localStorage.getItem('name');

//         if (name) {
//             let playerScore = localStorage.getItem('score');
//             let playerNameDiv = document.querySelector('.player_info_name');
//             let playerScoreDiv = document.querySelector('.player_info_score');
//             playerNameDiv.textContent = `Hi, ${name}`;
//             if (playerScore > 0) {
//                 playerScoreDiv.textContent = `Your score: ${playerScore}`;
//             } else {
//                 localStorage.setItem('score', '0');
//                 playerScoreDiv.textContent = 'Your score: 0';
//             }
//         }

//         let currentLevel = localStorage.getItem('level');
//         let levelDiv = document.querySelectorAll('.level_button');

//         for (let i = 1; i < levelDiv.length; i++) {

//             if (currentLevel >= levelDiv[i].value) {
//                 levelDiv[i].removeAttribute('disabled');
//             }
//         }
//     }

//     checkScore(score) {
//         let localStorageScore = localStorage.getItem('score');

//         if (score > localStorageScore) {
//             localStorage.setItem('score', score);
//             this.setPlayer();
//         } else {
//             localStorage.setItem('score', localStorageScore);
//         }
//         this.updateTable('KLUBKOU_ZUMA_RECORDS', [localStorage.getItem('name'), String(this.score)])
//             .then(result => this.setRecords(result));
//     }

//     updateGameScore() {
//         let gameScore = document.querySelector('.game_score');
//         gameScore.textContent = `SCORE : ${this.score}`;
//     }

//     getExtraScore(path, lastBallPathSection, level) {
//         let gameField = document.querySelector('.zuma_field');

//         let canvas = document.getElementById('canvas');
//         let offsetLeft = document.body.offsetLeft - canvas.offsetLeft;
//         let offsetTop = document.body.offsetTop - canvas.offsetTop;

//         let divExtraScore = document.createElement('div');

//         divExtraScore.classList.add('extra_score');
//         gameField.append(divExtraScore);

//         let width = divExtraScore.offsetWidth / 2;
//         let height = divExtraScore.offsetHeight / 2;
//         divExtraScore.style.left = path[lastBallPathSection].x - width - offsetLeft + 'px';
//         divExtraScore.style.top = path[lastBallPathSection].y - height - offsetTop + 'px';

//         let count = 50;
//         for (let i = lastBallPathSection + 36; i < path.length; i += 36) {

//             let x = path[i].x;
//             let y = path[i].y;

//             setTimeout(() => {
//                 divExtraScore.style.left = x - width - offsetLeft + 'px';
//                 divExtraScore.style.top = y - height - offsetTop + 'px';
//                 this.score += 1 * level;
//                 divExtraScore.textContent = `+ ${this.score}`;

//                 if (i + 72 > path.length) {
//                     setTimeout(() => {
//                         divExtraScore.remove();
//                     }, 200);
//                 }
//             }, count += 40);
//         }
//     }

//     checkTop(records, value) {
//         let nameIndex = null;

//         for (let i = 0; i < records.length; i++) {
//             if (records[i][0] === value[0]) {
//                 nameIndex = i;
//                 break;
//             }
//         }

//         if (nameIndex !== null) {
//             if (Number(records[nameIndex][1]) <= Number(value[1])) {
//                 records[nameIndex][1] = value[1];
//                 return records;
//             } else if (Number(records[nameIndex][1]) >= Number(value[1])) {
//                 return records;
//             }
//         } else {
//             for (let j = 0; j < records.length; j++) {
//                 if (Number(value[1]) > Number(records[j][1])) {
//                     records.splice(j, 0, value);
//                     return records;
//                 }
//             }
//         }

//         return records;
//     }

//     async updateTable(name, value) {
//         let password = String(Math.random());

//         let myHeaders = new Headers();
//         myHeaders.append('Content-type', 'application/x-www-form-urlencoded');

//         let urlencodedRecords = new URLSearchParams();
//         urlencodedRecords.append('f', 'LOCKGET');
//         urlencodedRecords.append('n', name);
//         urlencodedRecords.append('p', password);

//         let requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencodedRecords
//         }

//         let records = await fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptions)
//             .then(response => response.json())
//             .then(result => JSON.parse(result.result))
//             .catch(error => console.log('error', error))


//         let newRecords = await this.checkTop(records, value);

//         await newRecords.sort(function (a, b) {
//             return (Number(a[1]) < Number(b[1])) ? 1 : (Number(a[1]) > Number(b[1])) ? -1 : 0;
//         });

//         let myHeadersUpdate = new Headers();
//         myHeadersUpdate.append('Content-type', 'application/x-www-form-urlencoded');

//         let urlencodedRecordsUpdate = new URLSearchParams();
//         urlencodedRecordsUpdate.append('f', 'UPDATE');
//         urlencodedRecordsUpdate.append('n', name);
//         urlencodedRecordsUpdate.append('p', password);
//         urlencodedRecordsUpdate.append('v', JSON.stringify(newRecords));

//         let requestOptionsUpdate = {
//             method: 'POST',
//             headers: myHeadersUpdate,
//             body: urlencodedRecordsUpdate
//         }

//         await fetch('https://fe.it-academy.by/AjaxStringStorage2.php', requestOptionsUpdate)
//             .then(response => response.json())
//             .then(result => result)
//             .catch(error => console.log('error', error));

//         return records;
//     }

//     nextLevel(status,level,totalBalls, score, combo){
//         let continueButton = document.querySelector('.continue');
//         continueButton.addEventListener('click', () => {
//             window.location.reload();
//             location.hash = '#Play';
//         });

//         let canvas = document.getElementById('canvas');
//         let closeDiv = document.querySelector('.close');
//         let summaryDivs = document.querySelectorAll('.summary');

//         closeDiv.style.width = canvas.offsetWidth + 'px';
//         closeDiv.style.height = canvas.offsetHeight + 'px';
//         closeDiv.style.left = canvas.offsetLeft + 'px';

//         if (status === 'win') {
//             summaryDivs[0].textContent = `You WIN`;
//             summaryDivs[1].textContent = `Level: ${level}`;
//             summaryDivs[2].textContent = `Balls: ${totalBalls}`;
//             summaryDivs[3].textContent = `Score: ${score}`;
//             summaryDivs[4].textContent = `Combo: x${combo}`;
//         }
//         if (status === 'lose') {
//             summaryDivs[0].textContent = `You LOSE`;
//         }

//         closeDiv.classList.remove('hidden');
//     }
// }

// export {Player}

// //

// class Spa {
//     constructor() {
//         this.spaState = {};
//         this.readyState = 0;
//         this.checkSound();
//     }

//     switchToStateFromURLHash() {
//         let URLHash = window.location.hash;
//         let state = URLHash.substr(1);

//         if (state !== '') {
//             let parts = state.split("_");
//             this.spaState = {pageName: parts[0]};
//         } else {
//             this.spaState = {pageName: 'Load'};
//         }

//         let name = document.querySelector('.game_name');
//         let player = document.querySelector('.player_name');
//         let loading = document.querySelector('.loading_container');
//         let menu = document.querySelector('.main_menu');
//         let play = document.querySelector('.zuma_play');
//         let game = document.querySelector('.zuma_game');
//         let records = document.querySelector('.zuma_records');
//         let rules = document.querySelector('.zuma_rules');
//         let about = document.querySelector('.zuma_about');
//         let localStorageName = localStorage.getItem('name');

//         switch (this.spaState.pageName) {
//             case 'Menu':
//                 loading.classList.add('hidden');

//                 if (localStorageName) {
//                     player.classList.add('hidden');
//                     play.classList.add('hidden');
//                     game.classList.add('hidden');
//                     records.classList.add('hidden');
//                     rules.classList.add('hidden');
//                     about.classList.add('hidden');
//                     menu.classList.remove('hidden');
//                 } else {
//                     name.classList.remove('hidden');
//                     player.classList.remove('hidden');
//                 }
//                 break;
//             case 'Play':
//                 loading.classList.add('hidden');

//                 if (localStorageName) {
//                     menu.classList.add('hidden');
//                     game.classList.add('hidden');
//                     records.classList.add('hidden');
//                     rules.classList.add('hidden');
//                     about.classList.add('hidden');
//                     name.classList.remove('hidden');
//                     play.classList.remove('hidden');
//                 } else {
//                     name.classList.remove('hidden');
//                     player.classList.remove('hidden');
//                 }
//                 break;
//             case 'Game' :
//                 loading.classList.add('hidden');

//                 if (localStorage) {
//                     menu.classList.add('hidden');
//                     play.classList.add('hidden');
//                     records.classList.add('hidden');
//                     rules.classList.add('hidden');
//                     about.classList.add('hidden');
//                     name.classList.add('hidden');
//                     game.classList.remove('hidden');
//                 } else {
//                     game.classList.add('hidden');
//                     name.classList.remove('hidden');
//                     player.classList.remove('hidden');
//                 }
//                 break;
//             case 'Records':
//                 loading.classList.add('hidden');

//                 if (localStorageName) {
//                     menu.classList.add('hidden');
//                     play.classList.add('hidden');
//                     game.classList.add('hidden');
//                     rules.classList.add('hidden');
//                     about.classList.add('hidden');
//                     name.classList.remove('hidden');
//                     records.classList.remove('hidden');
//                 } else {
//                     name.classList.remove('hidden');
//                     player.classList.remove('hidden');
//                 }
//                 break;
//             case 'Rules':
//                 loading.classList.add('hidden');

//                 if (localStorageName) {
//                     menu.classList.add('hidden');
//                     play.classList.add('hidden');
//                     game.classList.add('hidden');
//                     records.classList.add('hidden');
//                     about.classList.add('hidden');
//                     name.classList.remove('hidden');
//                     rules.classList.remove('hidden');
//                 } else {
//                     name.classList.remove('hidden');
//                     player.classList.remove('hidden');
//                 }
//                 break;
//             case 'About':
//                 loading.classList.add('hidden');

//                 if (localStorageName) {
//                     menu.classList.add('hidden');
//                     play.classList.add('hidden');
//                     game.classList.add('hidden');
//                     records.classList.add('hidden');
//                     rules.classList.add('hidden');
//                     name.classList.remove('hidden');
//                     about.classList.remove('hidden');
//                 } else {
//                     name.classList.remove('hidden');
//                     player.classList.remove('hidden');
//                 }
//                 break;
//             case 'Load':
//                 menu.classList.add('hidden');
//                 play.classList.add('hidden');
//                 game.classList.add('hidden');
//                 records.classList.add('hidden');
//                 rules.classList.add('hidden');
//                 about.classList.add('hidden');
//                 name.classList.remove('hidden');
//                 break;
//         }
//     }

//     switchToState(newState) {
//         location.hash = newState.pageName;
//     }

//     switchToMenuPage() {
//         this.switchToState({pageName: 'Menu'});
//     }

//     switchToPlayPage() {
//         this.switchToState({pageName: 'Play'});
//     }

//     switchToGamePage() {
//         this.switchToState({pageName: 'Game'});
//     }

//     switchToRecordsPage() {
//         this.switchToState({pageName: 'Records'});
//     }

//     switchToRulesPage() {
//         this.switchToState({pageName: 'Rules'});
//     }

//     switchToAboutPage() {
//         this.switchToState({pageName: 'About'});
//     }

//     observer() {
//         window.addEventListener('hashchange', this.switchToStateFromURLHash);
//     }

//     run(run) {
//         let oldHash = window.location.hash;

//         if (this.readyState) {
//             if (oldHash === '#Game') {
//                 location.hash = 'Play';
//             } else if (oldHash && oldHash !== '#Game') {
//                 location.hash = oldHash.substr(1);
//             } else {
//                 location.hash = 'Menu';
//             }
//         }

//         let logo = document.querySelector('.game_name');
//         logo.addEventListener('click', (eo) => {
//             this.switchToMenuPage('Menu');
//         });

//         let buttonPlay = document.querySelector('.play_button');
//         buttonPlay.addEventListener('click', () => {
//             this.switchToPlayPage('Play');
//         });

//         let buttonsLevel = document.querySelectorAll('.level_button');
//         for (let i = 0; i < buttonsLevel.length; i++) {

//             buttonsLevel[i].addEventListener('click', (eo) => {

//                 let zumaOrientation = window.screen.orientation;
//                 let orientationDiv = document.querySelector('.orientation');
//                 let html = document.documentElement;

//                 let div = document.getElementById('canvas');
//                 div.setAttribute('level', buttonsLevel[i].value);

//                 if (/Android|webOS|iPhone|iPad|iPod|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {


//                     if (zumaOrientation.type === 'portrait-primary') {
//                         orientationDiv.classList.remove('hidden');
//                     }

//                     if (zumaOrientation.type === 'landscape-primary') {
//                         orientationDiv.classList.add('hidden');

//                         function fullScreen(element) {
//                             if (element.requestFullscreen) {
//                                 element.requestFullscreen();
//                             }
//                         }

//                         fullScreen(html);
//                         run();
//                         this.switchToGamePage('Game');
//                     }
//                     window.addEventListener('orientationchange', () => {
//                         if (zumaOrientation.type === 'portrait-primary') {
//                             location.hash = '#Play';
//                         }
//                         if (zumaOrientation.type === 'landscape-primary') {
//                             orientationDiv.classList.add('hidden');

//                             function fullScreen(element) {
//                                 if (element.requestFullscreen) {
//                                     element.requestFullscreen();
//                                 }
//                             }

//                             fullScreen(html);
//                         }
//                         run();
//                         this.switchToGamePage('Game');
//                     });
//                 } else if (zumaOrientation.type === 'landscape-primary') {
//                     run();
//                     this.switchToGamePage('Game');
//                 }
//             });
//         }

//         let buttonRecords = document.querySelector('.records_button');
//         buttonRecords.addEventListener('click', () => {
//             this.switchToRecordsPage('Records');
//         });

//         let buttonRules = document.querySelector('.rules_button');
//         buttonRules.addEventListener('click', () => {
//             this.switchToRulesPage('Rules');
//         });

//         let buttonAbout = document.querySelector('.about_button');
//         buttonAbout.addEventListener('click', () => {
//             this.switchToAboutPage('About');
//         });

//         this.observer();
//         this.switchToStateFromURLHash();
//     }

//     checkSound() {
//         let buttonSound = document.querySelector('.social_button_sound');
//         let status = localStorage.getItem('sound');
//         (status === 'on') ?
//             buttonSound.style.backgroundImage = 'url("./storage/social/volume-on.png")' :
//             buttonSound.style.backgroundImage = 'url("./storage/social/volume-off.png")';

//             buttonSound.addEventListener('click', () => {
//                 let sound = localStorage.getItem('sound');
//                 if (sound === 'on') {
//                     buttonSound.style.backgroundImage = 'url("./storage/social/volume-off.png")';
//                     localStorage.setItem('sound', 'off');
//                 } else if (sound === 'off') {
//                     buttonSound.style.backgroundImage = 'url("./storage/social/volume-on.png")';
//                     localStorage.setItem('sound', 'on');
//                 }
//             });
//     }

//     checkPlayer(records, recordsArray) {
//         let form = document.forms['formPlayer'];
//         let errorSpan = document.querySelector('.error_span');

//         form.addEventListener('change', () => {
//             errorSpan.textContent = '';
//             let inputName = document.querySelector('input[name]').value;
//             let re = /^[a-zA-Zа-яА-ЯёЁ]{5,16}$/;
//             let same;

//             for (let i = 0; i < recordsArray.length; i++) {
//                 if (recordsArray[i][0] === inputName) {
//                     errorSpan.textContent = 'player exist';
//                     same = true;
//                 }
//             }

//             if (!re.test(inputName)) {
//                 errorSpan.textContent = 'name must be 5-16 letters';

//             } else if (re.test(inputName) && !same) {
//                 localStorage.setItem('name', inputName);
//                 localStorage.setItem('projready', '1');
//                 localStorage.setItem('sound', 'on');
//                 localStorage.setItem('level', '1');
//                 records.setPlayer();
//                 setTimeout(() => {
//                     this.switchToStateFromURLHash();
//                 }, 500);
//             }
//         });
//     }
// }




// async function ready() {
//     let spa = new Spa();

//     // fetch images
//     let requestOptionsImages = {
//         method: 'GET',
//         redirect: 'follow'
//     };

//     let images = await fetch("https://vitaliyrst.github.io/images.json", requestOptionsImages)
//         .then(response => response.json())
//         .then(result => result)
//         .catch(error => console.log('error', error));


//     let count = 0
//     images.forEach(function (value) {
//         let img = new Image();
//         img.src = value;

//         count++;
//     });

//     new Promise((resolve => {
//         if (count === images.length) {
//             resolve(1);
//         }
//     }));

//     await (images.length === count);

//     //fetch records
//     let myHeadersRecords = new Headers();
//     myHeadersRecords.append("Content-Type", "application/x-www-form-urlencoded");

//     let urlencodedRecords = new URLSearchParams();
//     urlencodedRecords.append("f", "READ");
//     urlencodedRecords.append("n", "KLUBKOU_ZUMA_RECORDS");

//     let requestOptionsRecords = {
//         method: 'POST',
//         headers: myHeadersRecords,
//         body: urlencodedRecords,
//         redirect: 'follow'
//     };

//     let recordsArray = await fetch("https://fe.it-academy.by/AjaxStringStorage2.php", requestOptionsRecords)
//         .then(response => response.json())
//         .then(result => JSON.parse(result.result))
//         .catch(error => console.log('error', error));

//     let player = new Player();
//     player.setRecords(await recordsArray);

//     for (let i = 0; i < recordsArray.length; i++) {
//         let state = localStorage.getItem('projready');
//         if (localStorage.getItem('name') !== recordsArray[i][0] && state !== '1') {
//             localStorage.clear();
//             location.hash = 'Menu';
//         }
//     }

//     await spa.checkPlayer(player, recordsArray);

//     spa.readyState = 1;
//     return spa;
// }

// ready().then(spa => spa.run(run));

// /*let dt = 1000 / 60;
// let timeTarget = 0;
// function run() {
//     let gameController = new GameController();
//     function work() {
//         gameController.draw();
//         if (Date.now() >= timeTarget) {
//             timeTarget += dt;
//         }
//         requestAnimationFrame(work);
//     }
//     requestAnimationFrame(work);
// }*/


// function run() {
//     let now;
//     let delta;
//     let then = Date.now();
//     let interval = 1000 / 62;
//     let gameController = new GameController();

//     function work() {
//         requestAnimationFrame(work);
//         now = Date.now();
//         delta = now - then;

//         if (delta > interval) {

//             then = now - (delta % interval);
//             gameController.draw();
//         }
//     }
//     requestAnimationFrame(work);
// }