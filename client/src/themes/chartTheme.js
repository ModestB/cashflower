import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';

const FILL_SHADE = 400;
const STROKE_SHADE = 600;

const getColorsOfShade = (shade) => [
  blue[shade],
  pink[shade],
  green[shade],
  purple[shade],
  teal[shade],
  indigo[shade],
  yellow[shade],
  lime[shade],
  orange[shade],
  cyan[shade],
  red[shade],
];

const chartColorGenerator = (amount) => {
  const fillColors = getColorsOfShade(FILL_SHADE);
  const strokeColors = getColorsOfShade(STROKE_SHADE);
  const generatedFillColors = [];
  const generatedStrokeColors = [];
  let colorIndex = 0;

  for (let i = 0; i < amount; i++) {
    if (i >= fillColors.length) colorIndex = 0;

    generatedFillColors.push(fillColors[colorIndex]);
    generatedStrokeColors.push(strokeColors[colorIndex]);
    colorIndex += 1;
  }

  return {
    fill: generatedFillColors,
    stroke: generatedStrokeColors,
    success: {
      fill: green[FILL_SHADE],
      stroke: green[STROKE_SHADE],
    },
  };
};

export default chartColorGenerator;
