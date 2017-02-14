const TAU = Math.PI * 2;

const rotate = (point, amount) => {
  const theta = -(TAU / 8) * amount;
  return [
    point[0] *  Math.cos(theta) + point[1] * Math.sin(theta),
    point[0] * -Math.sin(theta) + point[1] * Math.cos(theta)
  ]
}

export default rotate;
