const easterEgg = '#dio';
const engine = {
  colors: ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black',
    'white', 'blue', 'brown'],
  hex: {
    green: '#02EF00',
    purple: '#790093',
    pink: '#F02A7E',
    red: '#E90808',
    yellow: '#E7D703',
    orange: '#F16529',
    grey: '#EBEBEB',
    black: '#141414',
    white: '#FFFFFF',
    blue: '#0000ff',
    brown: '#8B4513',
  },
  coins: 0,
};

const audioCoin = new Audio('audio/moeda.mp3');
const audioError = new Audio('audio/errou.mp3');

const btnStart = document.getElementById('start');
const btnRecorder = document.getElementById('btn-answer');
let audioTranscription = '';
let characterSequence = [];
let timer;

const randomColor = () => {
  const indexColor = Math.floor(Math.random() * engine.colors.length);
  const colorLegendInTheBox = document.getElementById('color-in-box');
  const nameColor = engine.colors[indexColor];

  colorLegendInTheBox.innerText = nameColor.toUpperCase();

  return engine.hex[nameColor];
};

const applyColorInTheBox = color => {
  const body = document.getElementById('body');
  const start = document.getElementById('start');
  const colorBox = document.getElementById('current-color');

  start.classList.add('disable');
  body.classList.remove('disable');

  colorBox.style.backgroundColor = color;
  colorBox.style.backgroundImage = "url('img/caixa-fechada.png')";
  colorBox.style.backgroundSize = '100%';
};

const updateScore = value => {
  if (!value || value === 0) {
    alert('Você tentou manipular o jogo de forma errada?\nTeremos que reiniciar!');
    return window.location.reload(true);
  }

  const score = document.getElementById('current-score');

  engine.coins += value;

  value < 0 ? audioError.play() : audioCoin.play();

  score.innerText = engine.coins;
};

const enableEasterEgg = event => {
  clearTimeout(timer);
  const keyPress = event.key;
  characterSequence.push(keyPress);

  const phrase = characterSequence.join('');

  if (phrase.includes(easterEgg)) {
    const win = document.getElementById('winScreen');
    win.classList.remove('disable');
    win.dataset.status = 'active1';

    console.log('Você achou o Easter Egg #DIO');

    characterSequence = [];
    setTimeout(() => {
      win.dataset.status = 'active';
    }, 1500);
    setTimeout(() => {
      win.dataset.status = 'hidden';
      win.classList.add('disable');
    }, 3000);
  }

  timer = setTimeout(() => characterSequence = [], 1000);
};

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recorder = new SpeechAPI();

  recorder.continuous = false;
  recorder.lang = 'en-US';

  recorder.onstart = function() {
    btnRecorder.innerText = 'Estou te ouvindo';
    btnRecorder.style.backgroundColor = "#DDD";
  }

  recorder.onend = function() {
    btnRecorder.innerText = 'RESPONDER';
    btnRecorder.style.backgroundColor = "transparent";
  }

  recorder.onresult = function(event) {
    const correctResponse = document.getElementById('color-in-box').innerText.toUpperCase();
    audioTranscription = event.results[0][0].transcript.toUpperCase();

    if (audioTranscription === correctResponse) {
      updateScore(1);
    } else {
      updateScore(-1);
    }

    applyColorInTheBox(randomColor());
  }

  recorder.onerror = function (event) {
    alert(`Deu ruim...${event.error}`);
  }

  btnStart.addEventListener('click', () => applyColorInTheBox(randomColor()));
  btnRecorder.addEventListener('click', () => recorder.start());
} else {
  alert('Seu navegador não tem suporte!')
  btnStart.addEventListener("click", () => alert('Você não pode Jogar!'));
}

window.addEventListener('keydown', e => enableEasterEgg(e));
