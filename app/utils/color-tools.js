'use strict';

const parse = (string) => {
  const re = /hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d*\.?\d*)\)/g;
  const array = re.exec(string);
  return {
    h: parseInt(array[1]),
    s: parseInt(array[2]) / 100,
    l: parseInt(array[3]) / 100,
    a: parseFloat(array[4])
  }
}

const unparse = ({h, s, l, a}) => {
  return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a})`;
}

export const darken = (string, amount) => {
  let { h,s,l,a } = parse(string);
  l = Math.max(l - amount, 0);
  return unparse({h,s,l,a});
}

export const lighten = (string, amount) => {
  let { h,s,l,a } = parse(string);
  l = Math.min(l + amount, 1);
  return unparse({h,s,l,a});
}

export const desaturate = (string, amount) => {
  let { h,s,l,a } = parse(string);
  s = Math.max(s - amount, 0);
  return unparse({h,s,l,a});
}

export const fadeout = (string, amount) => {
  let { h,s,l,a } = parse(string);
  a = Math.max(a - amount, 0);
  return unparse({h,s,l,a});
}

export const fadein = (string, amount) => {
  let { h,s,l,a } = parse(string);
  a = Math.max(a + amount, 1);
  return unparse({h,s,l,a});
}

const blend = (value1, value2, amount, wrap) => {
  let diff = value2 - value1;
  if (wrap) {
    if (diff > wrap / 2) {
      diff = diff - wrap;
    }
    if (diff < -wrap / 2 ) {
      diff = diff + wrap;
    }
  }
  let change = diff * amount;
  let result = value1 + change;
  if (wrap) {
    while (result < 0) {
      result += wrap;
    }
    while (result > wrap) {
      result -= wrap;
    }
  }
  return (result);
}

export const mix = (color1, color2, amount) => {
  let one = parse(color1);
  let two = parse(color2);
  let result = {
    h: blend(one.h, two.h, amount, 360),
    s: blend(one.s, two.s, amount),
    l: blend(one.l, two.l, amount),
    a: blend(one.a, two.a, amount)
  }
  return unparse(result);
}
