export let bonusString = (bonus) => {
  let result = "";
  if (bonus > 0) {
    result = "+ " + bonus;
  }
  else if (bonus < 0) {
    result = "− "+ (bonus * -1);
  }
  return result;
}
