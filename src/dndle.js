import Reef from '../externals/reef.11.0.1.es.min.js';
import Beastiary from './beastiary.js';
import Shuffle from './shuffle.js';

const Epoch = new Date("2022-02-15T19:00:00.000+00:00");
const DayNumber = Math.ceil((new Date() - Epoch) / 86400000);
const Target = Beastiary[Shuffle[DayNumber % Shuffle.length]];
const HighestStat = Math.max(...Beastiary.map(b=>Math.max(...b.slice(0,6))));
const Characteristics = [
  [ 'STR', 'Strength' ],
  [ 'DEX', 'Dexterity' ],
  [ 'CON', 'Constitution' ],
  [ 'INT', 'Intelligence' ],
  [ 'WIS', 'Wisdom' ],
  [ 'CHA', 'Charisma' ],
];
const MaxGuesses = 8;
const GameLaunched = DayNumber > 0;
let firstRun = true;
let toastHider;
let SortedBeastiary = [...Beastiary];
SortedBeastiary.sort((a,b)=>a[6]>b[6]);
console.log(SortedBeastiary);

// Set up state storage
const State = new Reef.Store({
  data: {
    dayNumber: -1,
    hardMode: false,
    stats: {
      playedDays: [],
      winDays: [],
      streak: 0,
      maxStreak: 0,
      guesses: new Array(MaxGuesses).fill(0),
    },
  }
});
const loadedStorage = localStorage.getItem('dndle');
if(loadedStorage){
  State.data = JSON.parse(loadedStorage);
  firstRun = false;
}

// Save State to localStorage
function saveState(){
  localStorage.setItem('dndle', JSON.stringify(State.dataCopy));
}

// If it's a new day, reset board
if(State.data.dayNumber < DayNumber){
  State.data.dayNumber = DayNumber;
  State.data.guess = [];
  State.data.guessQuality = [];
  State.data.keyQuality = [];
  State.data.guessesMade = 0;
  State.data.entryColumn = 0;
  State.data.lastAction = '';
  State.data.gameOver = false;
  State.data.gameWon = false;
  saveState();
}

const board = new Reef('#board', {
  store: State,
  template: props=>{
    let boardRows = [];
    for(let i = 0; i < MaxGuesses; i++){
      let rowTiles = [];
      let monster = '';
      if(i < State.data.guessesMade) monster = ((Beastiary.find(b=>b.slice(0,6).join(',') == props.guess[i].join(','))) || [])[6] || '';
      for(let j = 0; j < Characteristics.length; j++) {
        const tileValue = (props.guess[i] ?? [])[j] ?? '';
        const tileState = (tileValue == '') ? 'tile-empty' : 'tile-filled';
        let tileAnim = '';
        if ((props.lastAction == 'key-number') && (i == props.guessesMade) && j == (props.entryColumn - 1)) tileAnim = 'anim-blip';
        if ((props.lastAction == 'key-enter') && (i == props.guessesMade - 1) && (props.entryColumn == 0)) tileAnim = 'anim-flip';

        const guessQualityIndicator = (props.guessQuality[i] ?? [])[j] ?? 'untested';
        rowTiles.push(`<div class="tile ${tileAnim} ${tileState} guess-${guessQualityIndicator}">${tileValue}</div>`);
      }
      boardRows.push(`
        ${rowTiles.join('')}
        <div class="monster"><p>${monster}</p></div>
      `);
    }
    return `
      ${Characteristics.map(c=>`<abbr title="${c[1]}" class="char">${c[0]}</abbr>`).join('')}
      <div><!-- monster --></div>
      ${boardRows.join('')}
    `
  }
});

const keyboard = new Reef('#keyboard', {
  store: State,
  template: props=>{
    if(State.data.hardMode) return '';
    let keys = [];
    for(let i = 1; i <= HighestStat; i++) {
      const keyQualityIndicator = props.keyQuality[i] ?? 'untested';
      keys.push(`<button data-key="${i}" class="key key-${keyQualityIndicator}">${i}</button>`);
    }
    return `
      ${keys.join('')}
      <button class="key key-special" data-key="backspace" aria-label="Backspace">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      </button>
      <button class="key key-special" data-key="enter" aria-label="Enter">
        Enter
      </button>
    `;
  }
});

const monsterChooser = new Reef('#monster-chooser', {
  template: props=>{
    const monsterOptions = SortedBeastiary.map(b=>`<option value="${b.slice(0,6).join(',')}">${b[6]} (CR ${b[7]})</option>`);
    return `<select id="monster"><option value="">&hellip;or select a monster&hellip;</option>${monsterOptions.join('')}</select>`;
  }
});

const countdownTimer = new Reef('#monster-countdown-timer', {
  data: { timeToNext: '23:59:59' },
  template: props=>`
    ${props.timeToNext}
  `
});
// Update countdown timer now and every second
function updateCountdownTimer(){
  const nextMonsterAt = new Date(Epoch.valueOf());
  nextMonsterAt.setDate(nextMonsterAt.getDate() + DayNumber);
  const timeToNext = (nextMonsterAt - new Date()) / 1000;
  if(timeToNext < 0){
    countdownTimer.data.timeToNext = '<strong class="anim-vibrate">On the way!</strong>'
    State.data.gameOver = true;
    app.data.dialogStats = true;
    app.data.toast = '<strong style="font-size: 200%">A new monster is coming!</strong>';
    setTimeout(()=>window.location.reload(), 4000);
    return;
  }
  const hours = Math.floor(timeToNext / 3600);
  const mins = Math.floor((timeToNext - (hours * 3600)) / 60);
  const secs = Math.floor(timeToNext % 60);
  countdownTimer.data.timeToNext = `${("0" + hours).substr(-2, 2)}:${("0" + mins).substr(-2, 2)}:${("0" + secs).substr(-2, 2)}`;
}
updateCountdownTimer();
setInterval(updateCountdownTimer, 1000);

const app = new Reef('main', {
  data: {
    dialogHelp: false,
    dialogStats: false,
    dialogSettings: false,
    toast: null,
  },
  store: State,
  template: props=>{
    if(!GameLaunched) return('<p>Coming soon...</p>');
    const solutionState = State.data.gameWon ? `won in ${State.data.guessesMade}/${MaxGuesses} guesses` : 'lost';
    return `
      <div id="board">${board.html()}</div>
      <div id="keyboard">${keyboard.html()}</div>
      <div id="monster-chooser">${monsterChooser.html()}</div>
      <div id="solution" class="${props.gameOver ? 'shown' : 'hidden'}">
        <p id="solution-score">DNDle ${DayNumber} (${solutionState})</p>
        <p id="solution-name">${Target[6]} (CR ${Target[7]})</p>
        <div class="example">
          ${Characteristics.map(c=>`<abbr title="${c[1]}" class="char">${c[0]}</abbr>`).join('')}
          <div class="tile tile-filled">${Target[0]}</div>
          <div class="tile tile-filled">${Target[1]}</div>
          <div class="tile tile-filled">${Target[2]}</div>
          <div class="tile tile-filled">${Target[3]}</div>
          <div class="tile tile-filled">${Target[4]}</div>
          <div class="tile tile-filled">${Target[5]}</div>
        </div>
      </div>
      <div id="overlay" class="${props.dialogHelp || props.dialogStats || props.dialogSettings ? 'shown' : 'hidden'}">
        <div role="dialog" class="dialog ${props.dialogHelp ? 'shown' : 'hidden'}" data-dialog="Help">
          <button class="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#000000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </button>
          <h2>Help</h2>
          <p>Guess the D&amp;D (5e) monster in ${MaxGuesses} tries.</p>
          <p>
            Either enter a set of attributes
            (${Characteristics.map(c=>`<abbr title="${c[1]}">${c[0]}</abbr>`).join(', ')})
            <em>or</em> select a monster from the drop-down.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how close your guess was to the monster's characteristics.
          </p>
          <div class="examples">
            <h3>Example</h3>
            <div class="example">
              ${Characteristics.map(c=>`<abbr title="${c[1]}" class="char">${c[0]}</abbr>`).join('')}
              <div class="tile guess-correct">15</div>
              <div class="tile guess-absent">10</div>
              <div class="tile guess-present">12</div>
              <div class="tile guess-absent">12</div>
              <div class="tile guess-absent">14</div>
              <div class="tile guess-absent">15</div>
            </div>
            <ul>
              <li>This monster <abbr title="Strength">STR</abbr> <strong>15</strong>.</li>
              <li>This monster has a <strong>12</strong> but it's <em>not</em> <abbr title="Constitution">CON</abbr> nor <abbr title="Intelligence">INT</abbr>.</li>
              <li>This monster has no <strong>10</strong>, <strong>14</strong>, nor <strong>15</strong>.</li>
            </ul>
          </div>
          <p>
            <strong>A new monster will be available each day!</strong>
          </p>
        </div>

        <div role="dialog" class="dialog ${(props.dialogStats && !props.dialogHelp) ? 'shown' : 'hidden'}" data-dialog="Stats">
          <button class="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#000000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </button>
          <h2>Statistics</h2>
          <div id="stats-content">
            <dl>
              <dt>Played</dt>
              <dd>${props.stats.playedDays.length}</dd>
              <dt>Win %</dt>
              <dd>${Math.round((props.stats.winDays.length / props.stats.playedDays.length || 0) * 100)}</dd>
              <dt>Current Streak</dt>
              <dd>${props.stats.streak}</dd>
              <dt>Max Streak</dt>
              <dd>${props.stats.maxStreak}</dd>
            </dl>
            <div id="monster-countdown">
              <h2>Next Monster</h2>
              <p id="monster-countdown-timer">
                ${countdownTimer.html()}
              </p>
            </div>
            <div id="share-wrapper" class="${props.gameOver ? 'shown' : 'hidden'}">
              <button id="share">
                Share
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#ffffff" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div role="dialog" class="dialog ${(props.dialogSettings && !props.dialogStats && !props.dialogHelp) ? 'shown' : 'hidden'}" data-dialog="Settings">
          <button class="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#000000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </button>
          <h2>Settings</h2>
          <div class="setting">
            <div class="setting-description">
              <label for="setting-hard-mode">Hard mode</label>
              <p>No keyboard: you have to select a monster!</p>
            </div>
            <input type="checkbox" id="setting-hard-mode" data-setting="hardMode" @checked="${props.hardMode}">
          </div>
        </div>
      </div>
      <div id="toast" class="${props.toast ? 'shown' : 'hidden'}">${props.toast}</div>
    `
  }
});

document.getElementById('no-js-warning').remove();
app.render();

function handleGuess(currentState){
  const currentGuess = currentState.guess[currentState.guessesMade].map(i=>parseInt(i));
  const targetGuess = Target.slice(0, 6);
  let guessQuality = Array(Characteristics.length).fill('absent');
  // determine quality of guess - multi-pass to prevent e.g. marking something as "present" when it's also (later) "correct"
  // get "correct" answers
  for(let i = 0; i < Characteristics.length; i++){
    if(currentGuess[i] != targetGuess[i]) continue;
    guessQuality[i] = 'correct';
    currentState.keyQuality[currentGuess[i]] = 'correct';
    targetGuess[i] = null; // prevent it from showing up as a subsequent "present"
  }
  // get "present" answers
  for(let i = 0; i < Characteristics.length; i++){
    if(guessQuality[i] == 'correct') continue;
    const answerFoundAtPosition = targetGuess.indexOf(currentGuess[i]);
    if(answerFoundAtPosition == -1) continue;
    targetGuess[answerFoundAtPosition] = null; // prevent it from showing up as a subsequent "present"
    guessQuality[i] = 'present';
    if(currentState.keyQuality[currentGuess[i]] != 'correct') currentState.keyQuality[currentGuess[i]] = 'present';
  }
  // everything else is absent - mark the keyboard!
  for(let i = 0; i < Characteristics.length; i++){
    if(guessQuality[i] != 'absent') continue;
    if(!currentState.keyQuality[currentGuess[i]]) currentState.keyQuality[currentGuess[i]] = 'absent';
  }

  // update guess quality indicator
  currentState.guessQuality[currentState.guessesMade] = guessQuality;

  // count today as a "played" day
  if(!currentState.stats.playedDays.includes(DayNumber)) currentState.stats.playedDays.push(DayNumber);

  // if we've guessed correctly (or run out of guesses), update state and stats
  const guessedCorrectly = !(guessQuality.find(tile=>tile!='correct'))
  const outOfGuesses = (currentState.guessesMade + 1) >= MaxGuesses;
  if(guessedCorrectly || outOfGuesses) {
    currentState.gameOver = true;
    if(guessedCorrectly) {
      currentState.gameWon = true;
      currentState.stats.winDays.push(DayNumber);
      currentState.stats.streak += 1;
      currentState.stats.maxStreak = currentState.stats.streak;
    } else {
      currentState.stats.streak = 0;
    }
    setTimeout(()=>app.data.dialogStats=true, 800);
  }

  // move to next guess
  currentState.guessesMade += 1;
  currentState.entryColumn = 0;
}

function keyPressed(key){
  const currentState = State.dataCopy;
  if(currentState.guessesMade >= MaxGuesses) return;
  if(key == 'enter'){
    if(currentState.entryColumn < Characteristics.length) return;
    currentState.lastAction = 'key-enter';
    handleGuess(currentState);
  } else if(key == 'backspace') {
    if(currentState.entryColumn <= 0) return;
    currentState.lastAction = 'key-backspace';
    currentState.entryColumn -= 1;
    currentState.guess[currentState.guessesMade][currentState.entryColumn] = undefined;
  } else if(currentState.entryColumn < Characteristics.length) {
    currentState.lastAction = 'key-number';
    currentState.guess[currentState.guessesMade] ??= [];
    currentState.guess[currentState.guessesMade][currentState.entryColumn] = key;
    currentState.entryColumn += 1;
  }
  State.data = currentState;

  // save state
  saveState();
}

// Event handling:
// "key" pressed
document.getElementById('keyboard').addEventListener('click', e=>{
  if(State.data.gameOver) return;
  const button = e.target.closest('[data-key]');
  if(!button) return;
  const key = button.dataset.key;
  if(key) keyPressed(key);
}, { capture: true })

// Monster selected
document.getElementById('monster').addEventListener('change', e=>{
  const value = e.target.value.split(',')
  e.target.value = '';
  if(State.data.gameOver || (value == '')) return;
  State.data.guess[State.data.guessesMade] = value;
  State.data.entryColumn = Characteristics.length;
  // force-submit at this point to reduce the risk of somebody enumerating permutations
  keyPressed('enter');
});

// Header dialog button clicked
document.querySelector('header').addEventListener('click', e=>{
  const dialogButton = e.target.closest('[data-dialog]');
  if(!dialogButton) return;
  e.preventDefault();
  const dialogName = dialogButton.dataset.dialog;
  app.data[`dialog${dialogName}`] = true;
}, { capture: true });

// Dialogs and their buttons
document.querySelector('#overlay').addEventListener('click', e=>{
  // we have to hit a .close button or the overlay backdrop to close the dialog(s)
  const closeButton = e.target.closest('.close');
  if((e.target.id != 'overlay') && !closeButton) return;
  e.preventDefault();
  app.data.dialogHelp = app.data.dialogStats = app.data.dialogSettings = false;
  saveState();
}, { capture: true });

// Settings
document.querySelector('#overlay [data-dialog="Settings"]').addEventListener('click', e=>{
  if(!e.target.dataset.setting) return;
  e.preventDefault();
  State.data[e.target.dataset.setting] = !State.data[e.target.dataset.setting];
  saveState();
});

// Share button
document.querySelector('#share').addEventListener('click', e=>{
  const solutionState = State.data.gameWon ? `✨ ${State.data.guessesMade}/${MaxGuesses}` : '💀';
  const shareTitle = `DNDle ${DayNumber} ${solutionState}`;
  let shareBody = ''
  for(let i = 0; i < State.data.guessesMade; i++){
    shareBody += "\n";
    for(let j = 0; j < Characteristics.length; j++){
      if(State.data.guessQuality[i][j] == 'correct') {
        shareBody += "🟩";
      } else if(State.data.guessQuality[i][j] == 'present') {
        shareBody += "🟨";
      } else {
        shareBody += "⬜";
      }
    }
  }
  const shareFull = `${shareTitle}\n${shareBody}`;
  navigator.clipboard.writeText(shareFull);
  app.data.toast = 'Copied results to clipboard';
  clearTimeout(toastHider);
  toastHider = setTimeout(()=>app.data.toast=null, 3000);
});

// If today's over, show statistics
if(State.data.gameOver) setTimeout(()=>app.data.dialogStats=true, 800);

// If this is the first time visiting the site, show the help
if(firstRun) app.data.dialogHelp = true;

// DEBUG:
// Reef.debug(true);
// window.DNDle = {
//   State: State,
//   Reef: Reef,
//   DayNumber: DayNumber,
//   Target: Target,
//   Beastiary: Beastiary,
//   Shuffle: Shuffle,
// };
