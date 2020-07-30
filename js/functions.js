const engine = {
  colors: ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black'],
  hex: {
    green: '#02EF00',
    purple: '#790093',
    pink: '#F02A7E',
    red: '#E90808',
    yellow: '#E7D703',
    orange: '#F16529',
    grey: '#EBEBEB',
    black: '#141414',
  },
  coins: 0,
};

const randomColor = () => {
  const indexColor = Math.floor(Math.random() * engine.colors.length);
  const colorLegendInTheBox = document.getElementById('color-in-box');
  const nameColor = engine.colors[indexColor];

  colorLegendInTheBox.innerText = nameColor.toUpperCase();

  return engine.hex[nameColor];
};

const applyColorInTheBox = color => {
  const colorBox = document.getElementById('current-color');

  colorBox.style.backgroundColor = color;
  colorBox.style.backgroundImage = "url('/img/caixa-fechada.png')";
  colorBox.style.backgroundSize = '100%';
};
