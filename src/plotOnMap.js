const fs = require('fs');
const {
  createHtmlTemplate,
  createDiv,
  createImage
} = require('./html.js');

const { html } = require('./htmlCreater/parser.js');

const continent = (continents, continentName) => {
  return continents.find(element => {
    return element.name.match(continentName.toLowerCase());
  });
};

const map = () => {
  const worldMap = [
    'img',
    {
      src: './image/worldMap.png',
      alt: 'world map'
    }
  ];
  const mapBox = [
    'div',
    {
      class: 'map'
    },
    [worldMap]
  ];
  return html(mapBox);
};

const absoluteLocation = ({ x: xCoor, y: yCoor }) => {
  return 'left:' + xCoor + 'px;' + 'top:' + yCoor + 'px;';
};

const plotter = ({ coordinates }) => {

  const pointer = createDiv({
    content: '',
    classes: ['pointer'],
    attrs: [
      { attr: 'style', value: absoluteLocation(coordinates) }
    ]
  });
  return createDiv({
    content: pointer,
    classes: ['plotter']
  });
};

const mapContainer = (continent) => {
  return createDiv({
    content: map() + plotter(continent),
    classes: ['map-container']
  });
};

const mapPage = (continent) => {
  const page = createDiv({
    content: mapContainer(continent),
    classes: ['page']
  });
  const head = {
    title: 'Plot Continents',
    cssLinks: ['./css/styles.css']
  };
  return createHtmlTemplate({ head, body: page });
};

const main = function () {
  const [, , continentName] = process.argv;
  try {
    const coordinates = JSON.parse(fs.readFileSync('./src/coordinates.json'));
    const page = mapPage(continent(coordinates['continents'], continentName));
    fs.writeFileSync('./public/index.html', page, 'utf8');
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
};

console.log(main());
