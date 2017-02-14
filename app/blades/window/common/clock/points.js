const pointToString = (point) =>
{
  return `${point[0]},${point[1]} `;
}

const pointsToString = (points) =>
{
  let result = "";
  for (let i=0; i<points.length; i++) {
    const point = points[i];
    result += pointToString(point);
  }
  return result;
}

export default pointsToString;
