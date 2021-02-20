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

const SHADE = 400;

const COLORS = [
  blue[SHADE],
  pink[SHADE],
  green[SHADE],
  purple[SHADE],
  teal[SHADE],
  indigo[SHADE],
  yellow[SHADE],
  lime[SHADE],
  orange[SHADE],
  cyan[SHADE],
  red[SHADE],
];

const randomChartColorGenerator = (amount) => {
  const generatedColors = [];
  let colorIndex = 0;

  for (let i = 0; i < amount; i++) {
    if (i >= COLORS.length) colorIndex = 0;

    generatedColors.push(COLORS[colorIndex]);
    colorIndex += 1;
  }

  return {
    general: generatedColors,
    success: green[SHADE],
  };
};

export default randomChartColorGenerator;
