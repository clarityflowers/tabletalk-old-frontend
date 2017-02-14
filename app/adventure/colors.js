import { desaturate, fadeout } from 'utils/color-tools';

// from http://www.colourlovers.com/palette/3352142
let Colors = {
  fireworth: `hsla(21, 88%, 52%, 1)`,
  coldBreath: `hsla(203, 57%, 97%, 1)`,
  rainedFlowersToday: `hsla(201, 98%, 44%, 1)`,
  deep: `hsla(201, 98%, 23%, 1)`,
  necessita: `hsla(201, 100%, 11%, 1)`
}

Colors.shadow = `-2px 2px 2px 1px ${fadeout(Colors.necessita, .5)}`;

const stripes = (fade, reduce, width) => {
  return `
    ${desaturate(fadeout(Colors.fireworth,            fade), reduce)} 0,
    ${desaturate(fadeout(Colors.fireworth,            fade), reduce)} ${width}px,
    ${desaturate(fadeout(Colors.necessita,            fade), reduce)} ${width}px,
    ${desaturate(fadeout(Colors.necessita,            fade), reduce)} ${width * 2}px,
    ${desaturate(fadeout(Colors.rainedFlowersToday,   fade), reduce)} ${width * 2}px,
    ${desaturate(fadeout(Colors.rainedFlowersToday,   fade), reduce)} ${width * 3}px,
    ${desaturate(fadeout(Colors.deep,                 fade), reduce)} ${width * 3}px,
    ${desaturate(fadeout(Colors.deep,                 fade), reduce)} ${width * 4}px
  `
}

Colors.stripesBackground = (fadeFront, fadeBack, reduce, width) => {
  return `
    background-color: ${Colors.coldBreath};
    background-image:
      repeating-linear-gradient(45deg, ${stripes(fadeFront, reduce, width)}),
      repeating-linear-gradient(135deg, ${stripes(fadeBack, reduce, width)});
  `
}

export default Colors;
