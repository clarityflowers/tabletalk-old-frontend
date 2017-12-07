export const kindsById = [
  "TheSprawl",
  "BladesInTheDark",
  "StrangerRoads"
]

export const kindsByName = {};
for (let i=0; i < kindsById.length; i++) {
  const name = kindsById[i];
  kindsByName[name] = i;
}